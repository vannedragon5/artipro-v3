import React, { useState } from 'react';

const AjoutPortfolio = ({ artisanId, onClose, onSuccess }) => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titre.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/artisans/${artisanId}/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titre, description })
      });
      
      if (response.ok) {
        onSuccess(); // Déclenche le rafraîchissement du flux côté parent
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col font-sans">
      {/* En-tête natif de création */}
      <div className="bg-blue-900 text-white px-4 py-3 flex justify-between items-center shadow-sm">
        <button onClick={onClose} className="text-white p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h2 className="font-bold text-lg">Nouvelle Réalisation</h2>
        <div className="w-6"></div> {/* Espacement pour centrer le titre */}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex-1 flex flex-col">
        {/* Placeholder pour une future photo (découplage) */}
        <div className="w-full h-40 bg-gray-100 rounded-xl mb-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
          <span className="text-sm font-semibold">Ajouter une photo</span>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Titre du chantier</label>
          <input 
            type="text" 
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 text-gray-900 font-semibold"
            placeholder="Ex: Fondations villa R+1"
            required
          />
        </div>

        <div className="mb-6 flex-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description des travaux</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 text-gray-600 resize-none h-32"
            placeholder="Détails techniques, matériaux utilisés..."
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || !titre.trim()}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl active:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {isSubmitting ? 'Publication...' : 'Publier dans le réseau'}
        </button>
      </form>
    </div>
  );
};

export default AjoutPortfolio;
