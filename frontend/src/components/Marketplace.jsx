import React, { useState, useEffect } from 'react';

const Marketplace = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/produits')
      .then(res => res.json())
      .then(result => {
        if (result.status === 'success') setProduits(result.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white w-full pb-24 font-sans">
      <div className="bg-blue-900 text-white px-4 py-4 sticky top-0 z-10 shadow-sm">
        <h1 className="font-bold text-lg">Marketplace</h1>
        <p className="text-blue-200 text-xs">Catalogue et tarifs négociés</p>
      </div>

      <div className="bg-orange-50 p-4 border-b border-orange-100">
        <p className="text-orange-800 text-sm font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Livraison express sur vos chantiers en cours.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Chargement du catalogue...</div>
      ) : (
        <div className="w-full">
          {produits.map(produit => (
            <div key={produit.id} className="p-4 border-b border-gray-100 flex justify-between items-center active:bg-gray-50">
              <div className="pr-4">
                <h3 className="font-bold text-gray-900 leading-tight">{produit.nom}</h3>
                <p className="text-xs text-gray-500 mt-1">{produit.description}</p>
                <span className="inline-block mt-2 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  {produit.prix_unitaire} FCFA / {produit.unite}
                </span>
              </div>
              <button className="bg-gray-100 text-blue-700 p-3 rounded-full active:bg-blue-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
