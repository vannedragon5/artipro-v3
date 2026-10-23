import React, { useState, useEffect } from 'react';

const ProfilArtisan = ({ artisanId, onBack }) => {
  const [reputation, setReputation] = useState({ indice_confiance: '...' });

  useEffect(() => {
    fetch(`http://localhost:5000/api/artisans/${artisanId}/reputation`)
      .then(res => res.json())
      .then(res => { if(res.status === 'success') setReputation(res.data); })
      .catch(err => console.error(err));
  }, [artisanId]);

  // Données de l'artisan (Injectées pour le MVP)
  const artisan = {
    prenom: "Gédéon",
    nom: "ATINDJEBO",
    entreprise: "ARTI",
    secteur: "Ingénierie Logicielle & Systèmes",
    likes: 342,
    dislikes: 12,
    partages: 89
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* En-tête avec bouton retour */}
      <div className="bg-blue-900 text-white px-4 py-3 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="active:bg-blue-800 p-1 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h1 className="font-bold text-lg">Profil & Réputation</h1>
      </div>

      {/* 1. L'identité (selon ton croquis) */}
      <div className="flex flex-col items-center pt-8 pb-8 border-b border-gray-100 bg-gray-50">
        {/* Profil circulaire */}
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-3xl font-black border-4 border-white shadow-md mb-4">
          {artisan.prenom.charAt(0)}{artisan.nom.charAt(0)}
        </div>
        {/* Nom + Prénom */}
        <h2 className="text-xl font-extrabold text-gray-900 leading-tight mb-1">
          {artisan.prenom} {artisan.nom}
        </h2>
        {/* Nom d'entreprise */}
        <h3 className="text-md font-bold text-blue-600 mb-3">
          {artisan.entreprise}
        </h3>
        {/* Secteur d'activité */}
        <span className="text-xs font-bold text-gray-500 bg-gray-200 px-4 py-1.5 rounded-full uppercase tracking-wider">
          {artisan.secteur}
        </span>
      </div>

      {/* 2. Statistiques et Mentions */}
      <div className="p-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Impact de vos réalisations</h4>
        
        {/* Bloc Étoiles et Partages */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
            <svg className="w-8 h-8 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <span className="text-2xl font-black text-gray-900">{reputation.indice_confiance}</span>
            <span className="text-xs text-gray-500 font-semibold mt-1">Étoiles reçues</span>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
            <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            <span className="text-2xl font-black text-gray-900">{artisan.partages}</span>
            <span className="text-xs text-gray-500 font-semibold mt-1">Partages</span>
          </div>
        </div>

        {/* Bloc des Mentions (J'aime / N'aime pas) */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h5 className="text-sm font-bold text-gray-700 mb-4 text-center">Mentions sur vos chantiers</h5>
          <div className="flex justify-around items-center mb-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
              </div>
              <span className="font-black text-lg text-green-600">{artisan.likes}</span>
              <span className="text-xs text-gray-500 font-bold">J'aime</span>
            </div>
            
            <div className="w-px h-16 bg-gray-200"></div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path></svg>
              </div>
              <span className="font-black text-lg text-red-600">{artisan.dislikes}</span>
              <span className="text-xs text-gray-500 font-bold">Pas intéressé</span>
            </div>
          </div>
          
          {/* Note sur la désactivation */}
          <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg flex gap-3">
            <svg className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="text-[11px] text-orange-800 leading-snug">
              <span className="font-bold block mb-1">Bientôt disponible :</span> 
              Vous pourrez masquer les mentions "Pas intéressé" pour éviter la mauvaise foi. Attention, maintenir la transparence renforce votre crédibilité auprès des futurs clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilArtisan;
