import React, { useState, useEffect } from 'react';

const DashboardArtisan = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/feed')
      .then(res => res.json())
      .then(result => {
        if (result.status === 'success') {
          setFeed(result.data);
        }
        setLoading(false);
      })
      .catch(err => console.error("Erreur chargement feed", err));
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Chargement de la veille sectorielle...</div>;
  }

  return (
    <div className="bg-gray-50 w-full min-h-screen">
      {feed.map((item, index) => (
        <div key={item.id || index} className="bg-white p-4 mb-3 border-b border-gray-200">
          
          {/* 1. Titre et Description (En haut) */}
          <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">
            {item.titre}
          </h3>
          <p className="text-sm text-gray-600 mb-3 leading-snug">
            {item.description || item.contenu}
          </p>

          {/* 2. Photo(s) de réalisation (Zone principale) */}
          <div className="w-full h-52 bg-gray-100 rounded-xl mb-4 flex items-center justify-center border border-gray-200 overflow-hidden relative">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
              {item.source === 'portfolio' ? 'Réalisation' : 'Actualité'}
            </span>
          </div>

          {/* 3. Pied de publication : Profil et Mentions */}
          <div className="flex justify-between items-end">
            
            {/* Gauche : Profil (Signature) */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200 shrink-0">
                {item.artisan_nom ? item.artisan_nom.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-bold text-gray-900 leading-none mb-1">
                  {item.artisan_nom || 'Administrateur'}
                </span>
                <span className="text-xs text-blue-600 font-medium leading-none capitalize">
                  {item.type_metier || 'Maçonnerie'}
                </span>
              </div>
            </div>

            {/* Droite : Mentions et Partage */}
            <div className="flex items-center gap-4">
              
              {/* Mentions J'aime / Ne m'intéresse pas (Superposées) */}
              <div className="flex flex-col gap-1.5">
                <button className="text-gray-400 hover:text-green-600 active:text-green-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-red-600 active:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path>
                  </svg>
                </button>
              </div>

              {/* Séparateur visuel léger */}
              <div className="w-px h-8 bg-gray-200"></div>

              {/* Bouton Partager */}
              <button className="text-gray-400 hover:text-blue-600 active:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardArtisan;
