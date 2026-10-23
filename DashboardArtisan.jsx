import React, { useState, useEffect } from 'react';

const DashboardArtisan = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feed');
        if (response.ok) {
          const result = await response.json();
          setFeed(result.data);
        }
      } catch (err) {
        console.error("Erreur de chargement du flux", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <header className="bg-blue-900 text-white p-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">ARTI<span className="text-blue-300">PRO</span></h1>
        <div className="bg-blue-800 px-3 py-1 rounded-full text-sm font-medium">Mon Espace</div>
      </header>

      <main className="p-4 max-w-2xl mx-auto mt-4">
        <h2 className="text-gray-800 text-lg font-bold mb-4">Veille Sectorielle</h2>

        {loading && <div className="text-center text-blue-900 py-8">Chargement...</div>}

        <div className="space-y-4">
          {!loading && feed.length === 0 && (
            <p className="text-gray-500 text-center py-8">Aucune actualité pour le moment.</p>
          )}

          {feed.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4">
              {item.source === 'actualite' ? (
                <div className="border-l-4 border-orange-500 pl-3">
                  <span className="text-xs font-bold text-orange-600 uppercase bg-orange-50 px-2 py-1 rounded">Information</span>
                  <h3 className="font-bold text-gray-800 mt-2">{item.titre}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.contenu}</p>
                </div>
              ) : (
                <div className="border-l-4 border-blue-500 pl-3">
                  <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">Réalisation - {item.type_metier}</span>
                  <h3 className="font-bold text-gray-800 mt-2">{item.titre}</h3>
                  <p className="text-gray-600 text-sm mt-1 mb-2">{item.description}</p>
                  <p className="text-xs text-gray-500 font-medium">Par {item.artisan_nom}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardArtisan;
