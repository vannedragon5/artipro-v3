import React, { useState } from 'react';

const GenerateurDevis = ({ onClose, onValider, isStandalone = false }) => {
  const [typeDoc, setTypeDoc] = useState('devis'); // devis ou facture
  const [nomClient, setNomClient] = useState('');
  
  const [lignes, setLignes] = useState([
    { id: 1, description: '', specification: '', quantite: 1, prixUnitaire: '' }
  ]);
  const [mainDoeuvre, setMainDoeuvre] = useState('');

  const ajouterLigne = () => {
    setLignes([...lignes, { id: Date.now(), description: '', specification: '', quantite: 1, prixUnitaire: '' }]);
  };

  const modifierLigne = (id, champ, valeur) => {
    setLignes(lignes.map(l => l.id === id ? { ...l, [champ]: valeur } : l));
  };

  const supprimerLigne = (id) => {
    if (lignes.length > 1) {
      setLignes(lignes.filter(l => l.id !== id));
    }
  };

  const sousTotalMateriel = lignes.reduce((total, ligne) => {
    const qte = parseFloat(ligne.quantite) || 0;
    const prix = parseFloat(ligne.prixUnitaire) || 0;
    return total + (qte * prix);
  }, 0);

  const coutMainDoeuvre = parseFloat(mainDoeuvre) || 0;
  const totalGeneral = sousTotalMateriel + coutMainDoeuvre;

  const handleValider = () => {
    if (totalGeneral > 0) {
      if (isStandalone) {
        // En mode express, on renvoie toutes les infos pour générer le "PDF"
        onValider({ type: typeDoc, client: nomClient, total: totalGeneral });
      } else {
        // En mode réponse à une demande, on ne renvoie que le total (comportement original)
        onValider(totalGeneral);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col font-sans">
      <div className={`${isStandalone && typeDoc === 'facture' ? 'bg-green-700' : 'bg-gray-900'} text-white px-4 py-3 flex justify-between items-center shadow-sm transition-colors`}>
        <button onClick={onClose} className="p-1 text-gray-300 active:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h2 className="font-bold text-lg">
          {isStandalone ? (typeDoc === 'devis' ? 'Nouveau Devis' : 'Nouvelle Facture') : 'Détail du Devis'}
        </h2>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* ENTÊTE EXPRESS (Visible uniquement depuis le menu +) */}
        {isStandalone && (
          <div className="bg-white p-4 border-b border-gray-200 mb-4 shadow-sm">
            <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setTypeDoc('devis')} 
                className={`flex-1 py-2 rounded-md font-bold text-sm transition-colors ${typeDoc === 'devis' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              >
                Devis
              </button>
              <button 
                onClick={() => setTypeDoc('facture')} 
                className={`flex-1 py-2 rounded-md font-bold text-sm transition-colors ${typeDoc === 'facture' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'}`}
              >
                Facture
              </button>
            </div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Client concerné</label>
            <input 
              type="text" 
              placeholder="Nom du client ou entreprise" 
              value={nomClient} 
              onChange={e => setNomClient(e.target.value)} 
              className="w-full border-b-2 border-gray-200 py-2 focus:border-blue-600 focus:outline-none font-bold text-gray-900 text-lg" 
            />
          </div>
        )}

        {/* LIGNES DE MATÉRIEL (Le cœur du composant reste le même) */}
        <div className="p-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Matériaux nécessaires</h3>
          {lignes.map((ligne, index) => (
            <div key={ligne.id} className="bg-white p-3 rounded-lg border border-gray-200 mb-3 shadow-sm relative">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-gray-700 text-sm">Élément #{index + 1}</span>
                {lignes.length > 1 && (
                  <button onClick={() => supprimerLigne(ligne.id)} className="text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                )}
              </div>
              <input type="text" placeholder="Nom du matériel" value={ligne.description} onChange={(e) => modifierLigne(ligne.id, 'description', e.target.value)} className="w-full border-b border-gray-200 py-2 focus:border-blue-600 focus:outline-none mb-1 text-sm font-bold text-gray-900" />
              <input type="text" placeholder="Spécifications (Optionnel)" value={ligne.specification} onChange={(e) => modifierLigne(ligne.id, 'specification', e.target.value)} className="w-full border-b border-gray-200 py-2 focus:border-blue-600 focus:outline-none mb-3 text-xs text-gray-500 italic" />
              <div className="flex gap-3">
                <div className="w-1/3">
                  <label className="text-xs text-gray-500">Qté</label>
                  <input type="number" value={ligne.quantite} onChange={(e) => modifierLigne(ligne.id, 'quantite', e.target.value)} className="w-full border-b border-gray-200 py-1 focus:border-blue-600 focus:outline-none text-sm font-bold" />
                </div>
                <div className="w-2/3">
                  <label className="text-xs text-gray-500">Prix U. (FCFA)</label>
                  <input type="number" value={ligne.prixUnitaire} onChange={(e) => modifierLigne(ligne.id, 'prixUnitaire', e.target.value)} className="w-full border-b border-gray-200 py-1 focus:border-blue-600 focus:outline-none text-sm font-bold" />
                </div>
              </div>
            </div>
          ))}

          <button onClick={ajouterLigne} className="w-full py-3 mb-6 text-blue-600 font-bold border-2 border-dashed border-blue-200 rounded-lg flex items-center justify-center gap-2 active:bg-blue-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Ajouter une ligne
          </button>

          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Main-d'œuvre</h3>
          <div className="bg-white p-3 rounded-lg border border-gray-200 mb-6 shadow-sm">
            <label className="text-xs text-gray-500">Coût de la prestation (FCFA)</label>
            <input type="number" placeholder="Ex: 50000" value={mainDoeuvre} onChange={(e) => setMainDoeuvre(e.target.value)} className="w-full border-b border-gray-200 py-2 focus:border-blue-600 focus:outline-none font-bold text-lg text-gray-900" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-bold uppercase text-xs">Total Net :</span>
          <span className="text-2xl font-extrabold text-blue-600">{totalGeneral.toLocaleString('fr-FR')} FCFA</span>
        </div>
        <button 
          onClick={handleValider}
          disabled={totalGeneral === 0 || (isStandalone && !nomClient.trim())}
          className={`w-full text-white font-bold py-4 rounded-xl transition-colors disabled:bg-gray-300 disabled:opacity-50 ${isStandalone && typeDoc === 'facture' ? 'bg-green-600 active:bg-green-700' : 'bg-blue-600 active:bg-blue-700'}`}
        >
          {isStandalone ? `Générer la ${typeDoc}` : 'Valider ce montant'}
        </button>
      </div>
    </div>
  );
};

export default GenerateurDevis;
