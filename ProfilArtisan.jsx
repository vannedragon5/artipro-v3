import React, { useState, useEffect } from 'react';

const ProfilArtisan = ({ artisanId = 1 }) => {
  const [reputation, setReputation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Appel à l'API pour récupérer le score de confiance
    const fetchReputation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artisans/${artisanId}/reputation`);
        if (response.ok) {
          const result = await response.json();
          setReputation(result.data);
        }
      } catch (err) {
        console.error("Erreur de chargement du profil", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReputation();
  }, [artisanId]);

  // Fonction pour afficher les étoiles dorées
  const renderStars = (note) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg key={i} className={`w-5 h-5 ${i <= note ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  if (loading) return <div className="p-4 text-center text-gray-500">Chargement du profil...</div>;
  if (!reputation) return <div className="p-4 text-center text-red-500">Profil indisponible</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans mt-4">
      {/* En-tête du profil */}
      <div className="bg-blue-900 p-6 text-center">
        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-3">
          <span className="text-2xl font-bold text-gray-600">GA</span>
        </div>
        <h2 className="text-xl font-bold text-white">Gédéon Atindjebo</h2>
        <p className="text-blue-200 text-sm font-medium">Expertise Générale BTP</p>
      </div>

      <div className="p-5">
        {/* Score de Confiance Global */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-green-800 uppercase tracking-wide">Indice de Confiance</h3>
            <p className="text-xs text-green-600 mt-1">Basé sur l'algorithme ArtiPro</p>
          </div>
          <div className="text-3xl font-extrabold text-green-600">
            {reputation.indice_confiance}<span className="text-lg text-green-500">/100</span>
          </div>
        </div>

        {/* Statistiques Rapides */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
            <div className="flex justify-center mb-1">{renderStars(Math.round(reputation.moyenne_avis))}</div>
            <p className="text-xs text-gray-500 font-medium">{reputation.total_avis} avis clients</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
            <span className="text-2xl font-bold text-gray-800">{reputation.chantiers_clotures}</span>
            <p className="text-xs text-gray-500 font-medium">Chantiers terminés</p>
          </div>
        </div>

        {/* Liste des Certifications */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">Diplômes & Certifications</h3>
          {reputation.certifications.length === 0 ? (
            <p className="text-sm text-gray-500 italic">Aucune certification ajoutée.</p>
          ) : (
            <ul className="space-y-3">
              {reputation.certifications.map((cert, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cert.est_verifie ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{cert.titre}</p>
                    <p className="text-xs text-gray-500">{cert.est_verifie ? 'Vérifié par ArtiPro' : 'En attente de vérification'}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilArtisan;
