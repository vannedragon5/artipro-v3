import React, { useState, useEffect } from 'react';

const MesChantiers = ({ artisanId, onSelectChantier }) => {
  const [chantiers, setChantiers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/artisans/${artisanId}/chantiers`)
      .then(res => res.json())
      .then(result => { if(result.status === 'success') setChantiers(result.data); })
      .catch(err => console.error(err));
  }, [artisanId]);

  return (
    <div className="bg-white w-full">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h2 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Chantiers en cours</h2>
      </div>
      <div>
        {chantiers.map((chantier) => (
          <div 
            key={chantier.id} 
            onClick={() => onSelectChantier(chantier)}
            className="border-b border-gray-100 px-4 py-4 flex justify-between items-center active:bg-gray-50 cursor-pointer"
          >
            <div>
              <h3 className="font-semibold text-gray-900 leading-tight">{chantier.titre}</h3>
              <p className="text-gray-500 text-sm mt-0.5">{chantier.localisation}</p>
            </div>
            <div className="flex items-center gap-2 text-right">
              <span className={`text-xs font-bold px-2 py-1 rounded-sm ${chantier.statut === 'cloture' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {chantier.statut === 'cloture' ? 'Terminé' : 'En cours'}
              </span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MesChantiers;
