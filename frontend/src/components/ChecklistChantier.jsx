import React, { useState, useEffect } from 'react';

const ChecklistChantier = ({ chantier, onBack }) => {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showClotureModal, setShowClotureModal] = useState(false);
  const [descFinale, setDescFinale] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/chantiers/${chantier.id}/taches`)
      .then(res => res.json())
      .then(result => {
        if (result.status === 'success') setTaches(result.data);
        setLoading(false);
      });
  }, [chantier.id]);

  const toggleTache = async (id, statutActuel) => {
    if (chantier.statut === 'cloture') return; // Bloque la modif si déjà terminé
    
    const nouveauStatut = !statutActuel;
    setTaches(taches.map(t => t.id === id ? { ...t, est_coche: nouveauStatut } : t));
    
    try {
      await fetch(`http://localhost:5000/api/taches/${id}/toggle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ est_coche: nouveauStatut })
      });
    } catch (err) { console.error(err); }
  };

  const validerCloture = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/chantiers/${chantier.id}/cloture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titre: `Réalisation : ${chantier.titre}`,
          description: descFinale || "Chantier achevé avec succès."
        })
      });
      if (response.ok) {
        onBack(); // Retourne à l'accueil/chantiers pour voir les mises à jour
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-4 text-center mt-10">Chargement...</div>;

  const progression = taches.length > 0 ? Math.round((taches.filter(t => t.est_coche).length / taches.length) * 100) : 0;
  const estFini = progression === 100 && chantier.statut !== 'cloture';

  return (
    <div className="bg-white w-full min-h-screen pb-20 relative">
      <div className="bg-blue-900 text-white px-4 py-3 sticky top-0 z-10 flex items-center gap-3 shadow-sm">
        <button onClick={onBack} className="active:bg-blue-800 p-1 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <div>
          <h1 className="font-bold text-lg leading-tight truncate">{chantier.titre}</h1>
          <p className="text-blue-200 text-xs">{chantier.localisation}</p>
        </div>
      </div>

      <div className="bg-white p-4 border-b border-gray-100">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {chantier.statut === 'cloture' ? 'Chantier Terminé' : 'Avancement'}
          </span>
          <span className={`text-xl font-extrabold ${chantier.statut === 'cloture' ? 'text-green-600' : 'text-blue-600'}`}>
            {chantier.statut === 'cloture' ? '100%' : `${progression}%`}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className={`${chantier.statut === 'cloture' ? 'bg-green-500' : 'bg-blue-600'} h-2 rounded-full transition-all duration-500`} style={{ width: chantier.statut === 'cloture' ? '100%' : `${progression}%` }}></div>
        </div>
      </div>

      <div className="w-full">
        {taches.map((tache) => (
          <div key={tache.id} onClick={() => toggleTache(tache.id, tache.est_coche)} className={`flex items-center gap-4 px-4 py-4 border-b border-gray-100 transition-colors ${chantier.statut !== 'cloture' ? 'cursor-pointer active:bg-gray-50' : 'opacity-70'}`}>
            <div className={`w-6 h-6 flex-shrink-0 rounded flex items-center justify-center border-2 ${tache.est_coche ? (chantier.statut === 'cloture' ? 'bg-green-500 border-green-500' : 'bg-blue-600 border-blue-600') : 'border-gray-300'}`}>
              {tache.est_coche && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
            </div>
            <span className={`text-sm font-semibold ${tache.est_coche ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{tache.nom}</span>
          </div>
        ))}
      </div>
      
      <div className="p-4 mt-4 space-y-3">
        {estFini && (
          <button onClick={() => setShowClotureModal(true)} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg active:bg-green-700 transition-colors shadow-md">
            Clôturer le Chantier
          </button>
        )}
        <button className="w-full bg-orange-100 text-orange-700 font-bold py-3 rounded-lg active:bg-orange-200 transition-colors">
          Signaler un problème
        </button>
      </div>

      {/* Modal de Clôture */}
      {showClotureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Fin de chantier 🏆</h3>
            <p className="text-sm text-gray-500 mb-4">Ce chantier sera ajouté à votre Portfolio public.</p>
            
            <textarea 
              value={descFinale}
              onChange={(e) => setDescFinale(e.target.value)}
              placeholder="Ex: Travaux livrés dans les temps, client très satisfait..."
              className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-600 mb-4 h-24 resize-none"
            />
            
            <div className="flex gap-3">
              <button onClick={() => setShowClotureModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg active:bg-gray-200">
                Annuler
              </button>
              <button onClick={validerCloture} disabled={isSubmitting} className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg active:bg-green-700 disabled:opacity-50">
                {isSubmitting ? 'Validation...' : 'Valider'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistChantier;
