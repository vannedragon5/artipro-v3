import React, { useState, useEffect } from 'react';

export default function DevisInverse({ artisanId, onClose, onSuccess }) {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/demandes')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setDemandes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleRepondre = (demandeId) => {
    if(!window.confirm("Créer un devis et démarrer le contact avec ce client ?")) return;
    
    fetch(`http://localhost:5000/api/artisans/${artisanId}/demandes/${demandeId}/repondre`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        alert("Demande acceptée ! Un nouveau chantier a été créé.");
        onSuccess(); // Ferme la page et retourne aux chantiers
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col font-sans">
      <div className="bg-orange-600 text-white px-4 py-4 flex justify-between items-center shadow-md">
        <h2 className="font-bold text-lg">Demandes locales</h2>
        <button onClick={onClose} className="bg-orange-700 px-3 py-1 rounded text-sm active:bg-orange-800">Fermer</button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-sm text-gray-500 mb-4">Clients cherchant un artisan près de chez vous.</p>
        
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Recherche des demandes...</p>
        ) : demandes.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-10">
            <span className="text-4xl block mb-2">📡</span>
            <p className="text-gray-500 font-medium">Aucune nouvelle demande pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {demandes.map(d => (
              <div key={d.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-orange-100 text-orange-800 px-2 py-1 rounded-bl-lg text-xs font-bold">
                  Nouveau
                </div>
                <div className="mb-2 pr-16">
                  <h3 className="font-bold text-gray-900">{d.titre}</h3>
                  <p className="text-xs text-gray-500">Client: {d.client_nom || "Anonyme"} ({d.client_tel || "Non précisé"})</p>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-2 flex items-center gap-3 mb-4">
                  <button className="bg-blue-600 text-white p-2 rounded-full active:bg-blue-700 shadow-sm">
                    <svg className="w-4 h-4 pl-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                  </button>
                  <div className="flex-1">
                    <div className="h-1.5 bg-gray-300 rounded-full w-full mb-1">
                      <div className="h-1.5 bg-blue-500 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">Note vocale (0:12)</span>
                  </div>
                </div>
                
                <button onClick={() => handleRepondre(d.id)} className="w-full bg-orange-600 text-white font-bold py-2.5 rounded-lg active:bg-orange-700 transition-colors shadow-sm">
                  Contacter & Devisez
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
