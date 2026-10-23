import React, { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const orderTabs = [
  { id: "en_attente", label: "En attente" },
  { id: "validee", label: "Validées" },
  { id: "livree", label: "Livrées" },
];

const initialProductForm = { nom: "", categorie: "", prix: "", unite: "", en_stock: true };

function formatPrice(price) {
  return `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

export default function FournisseurDashboard({ onClose }) {
  const [tab, setTab] = useState("accueil");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState("en_attente");

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/produits').then(r => r.json()),
      fetch('http://localhost:5000/api/fournisseur/commandes').then(r => r.json())
    ]).then(([resProducts, resOrders]) => {
      if (resProducts.status === 'success') {
        // Ajoute en_stock manquant de la DB pour l'affichage
        setProducts(resProducts.data.map(p => ({ ...p, en_stock: true }))); 
      }
      if (resOrders.status === 'success') setOrders(resOrders.data);
      setLoading(false);
    }).catch(err => console.error(err));
  }, []);

  const pendingCount = useMemo(() => orders.filter(o => o.statut === "en_attente").length, [orders]);
  const visibleOrders = orders.filter(o => o.statut === orderFilter);

  async function markOrderReady(order) {
    try {
      const res = await fetch(`http://localhost:5000/api/commandes/${order.id}/statut`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut: "validee" })
      });
      const result = await res.json();
      if (result.status === 'success') {
        setOrders(current => current.map(item => item.id === order.id ? { ...item, statut: result.statut } : item));
        setSelectedOrder(current => current?.id === order.id ? { ...current, statut: result.statut } : current);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto flex flex-col font-sans">
      <div className="bg-blue-900 text-white px-4 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold">Espace Fournisseur</h1>
        <button onClick={onClose} className="text-sm bg-blue-800 px-3 py-1 rounded-md border border-blue-700 active:bg-blue-700">Quitter</button>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement...</div>
        ) : (
          <>
            {tab === "accueil" && <Overview pendingCount={pendingCount} onOpenOrders={() => { setTab("commandes"); setOrderFilter("en_attente"); }} />}
            {tab === "catalogue" && <Catalogue products={products} setProducts={setProducts} />}
            {tab === "commandes" && (
              <Orders orders={visibleOrders} allOrders={orders} filter={orderFilter} onFilter={setOrderFilter} onSelect={setSelectedOrder} />
            )}
          </>
        )}
      </div>

      {selectedOrder && (
        <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} onMarkReady={() => markOrderReady(selectedOrder)} />
      )}

      {/* BOTTOM NAV FOURNISSEUR */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around pb-safe z-40">
        <button onClick={() => setTab('accueil')} className={`flex-1 py-3 text-xs font-bold flex flex-col items-center ${tab === 'accueil' ? 'text-blue-700' : 'text-gray-400'}`}>
          <span className="text-xl leading-none mb-1">⌂</span><span>Accueil</span>
        </button>
        <button onClick={() => setTab('catalogue')} className={`flex-1 py-3 text-xs font-bold flex flex-col items-center border-l border-gray-100 ${tab === 'catalogue' ? 'text-blue-700' : 'text-gray-400'}`}>
          <span className="text-xl leading-none mb-1">▦</span><span>Catalogue</span>
        </button>
        <button onClick={() => setTab('commandes')} className={`flex-1 py-3 text-xs font-bold flex flex-col items-center border-l border-gray-100 relative ${tab === 'commandes' ? 'text-blue-700' : 'text-gray-400'}`}>
          {pendingCount > 0 && <span className="absolute top-1 right-8 w-2.5 h-2.5 bg-red-500 rounded-full"></span>}
          <span className="text-xl leading-none mb-1">▤</span><span>Commandes</span>
        </button>
      </nav>
    </div>
  );
}

function Overview({ pendingCount, onOpenOrders }) {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 24);
  const expiryLabel = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(expiry);
  const referralUrl = `https://artipro.site/inscription?parrain=QUINCAILLERIE-042`;

  return (
    <div className="p-4">
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-6">
        <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Accès actif jusqu'au</p>
        <p className="text-lg font-black text-green-900">{expiryLabel}</p>
      </div>

      <div onClick={onOpenOrders} className="bg-white border border-gray-200 p-5 rounded-xl mb-6 shadow-sm flex items-center justify-between active:bg-gray-50 cursor-pointer">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Commandes à préparer</p>
          <p className="text-3xl font-black text-blue-600">{pendingCount}</p>
        </div>
        <span className="text-blue-600 font-bold">Voir →</span>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm text-center">
        <h2 className="font-black text-gray-900 mb-2">Invitez un commerçant</h2>
        <p className="text-sm text-gray-500 mb-6">Faites scanner ce QR code à un confrère pour prolonger votre accès gratuit à ArtiPro.</p>
        <div className="flex justify-center mb-4">
          <QRCodeSVG value={referralUrl} size={150} level={"H"} />
        </div>
        <p className="text-xs text-gray-400 break-all">{referralUrl}</p>
      </div>
    </div>
  );
}

function Catalogue({ products, setProducts }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="p-4">
      <div className="flex justify-between items-end mb-4">
        <h2 className="font-black text-xl text-gray-900">Mon catalogue</h2>
        <button onClick={() => setShowForm(true)} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:bg-blue-800">+ Ajouter</button>
      </div>
      
      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className="bg-white border border-gray-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-bold text-gray-900">{p.nom}</h3>
              <p className="text-xs text-gray-500 mb-1">{p.description} · {p.unite}</p>
              <p className="text-sm font-black text-blue-700">{formatPrice(p.prix_unitaire || p.prix)}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded ${p.en_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {p.en_stock ? "En stock" : "Rupture"}
            </span>
          </div>
        ))}
      </div>

      {showForm && <ProductForm onClose={() => setShowForm(false)} onCreated={(p) => { setProducts([p, ...products]); setShowForm(false); }} />}
    </div>
  );
}

function ProductForm({ onClose, onCreated }) {
  const [form, setForm] = useState(initialProductForm);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/fournisseur/produits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: form.nom, categorie: form.categorie, prix: Number(form.prix), unite: form.unite, en_stock: form.en_stock })
      });
      const result = await res.json();
      if (result.status === 'success') onCreated(result.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
      <div className="bg-white w-full rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Ajouter un produit</h2>
          <button onClick={onClose} className="text-gray-500 text-xl font-bold">×</button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input required type="text" placeholder="Nom (Ex: Ciment CPJ 35)" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 font-bold" />
          <input required type="number" placeholder="Prix Unitaire (FCFA)" value={form.prix} onChange={e => setForm({...form, prix: e.target.value})} className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 font-bold" />
          <input required type="text" placeholder="Unité (sac, barre...)" value={form.unite} onChange={e => setForm({...form, unite: e.target.value})} className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 font-bold" />
          
          <label className="flex items-center gap-2 mt-4 text-sm font-bold text-gray-700">
            <input type="checkbox" checked={form.en_stock} onChange={e => setForm({...form, en_stock: e.target.checked})} className="w-5 h-5 accent-blue-600" />
            Produit disponible en stock
          </label>
          <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl mt-6 active:bg-blue-800">{loading ? "Ajout..." : "Enregistrer"}</button>
        </form>
      </div>
    </div>
  );
}

function Orders({ orders, allOrders, filter, onFilter, onSelect }) {
  return (
    <div>
      <div className="flex bg-white border-b border-gray-200 sticky top-0">
        {orderTabs.map(tab => {
          const count = allOrders.filter(o => o.statut === tab.id).length;
          return (
            <button key={tab.id} onClick={() => onFilter(tab.id)} className={`flex-1 py-3 text-sm font-bold ${filter === tab.id ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500'}`}>
              {tab.label} ({count})
            </button>
          )
        })}
      </div>
      <div className="p-4 space-y-3">
        {orders.length === 0 ? <p className="text-center text-gray-500 mt-10">Aucune commande.</p> : orders.map(o => (
          <div key={o.id} onClick={() => onSelect(o)} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex justify-between items-center active:bg-gray-50 cursor-pointer">
            <div>
              <p className="font-bold text-gray-900">{o.artisan}</p>
              <p className="text-xs text-gray-500">Cmd #{o.id} · {o.chantier}</p>
            </div>
            <span className="text-blue-600 font-bold text-sm">Détails →</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderDetail({ order, onClose, onMarkReady }) {
  // Parsing sécurisé du JSONB renvoyé par PostgreSQL
  const articles = typeof order.articles === 'string' ? JSON.parse(order.articles) : order.articles;
  const total = articles.reduce((sum, item) => sum + (item.quantite * item.prix), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
      <div className="bg-white w-full rounded-2xl p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-black text-xl text-gray-900">Cmd #{order.id}</h2>
            <p className="text-sm text-gray-500">{order.artisan} - {order.date}</p>
          </div>
          <button onClick={onClose} className="bg-gray-100 text-gray-600 p-2 rounded-full font-bold">✕</button>
        </div>
        
        <div className="space-y-3 mb-6">
          {articles.map((a, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-700">{a.quantite} {a.unite} × {a.nom}</span>
              <span className="font-bold text-gray-900">{formatPrice(a.quantite * a.prix)}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-6">
          <span className="font-bold text-gray-500 uppercase text-xs">Total estimé</span>
          <span className="font-black text-xl text-blue-700">{formatPrice(total)}</span>
        </div>

        {order.statut === "en_attente" && (
          <button onClick={onMarkReady} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl active:bg-blue-700">Marquer comme prête</button>
        )}
      </div>
    </div>
  );
}
