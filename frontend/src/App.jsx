import React, { useState, useEffect } from 'react';
import DashboardArtisan from './components/DashboardArtisan';
import ProfilArtisan from './components/ProfilArtisan';
import MesChantiers from './components/MesChantiers';
import ChecklistChantier from './components/ChecklistChantier';
import AjoutPortfolio from './components/AjoutPortfolio';
import Marketplace from './components/Marketplace';
import DevisInverse from './components/DevisInverse';
import GenerateurDevis from './components/GenerateurDevis';
import ClientDemande from './components/ClientDemande';
import FournisseurDashboard from './components/FournisseurDashboard'; // NOUVEL IMPORT

function App() {
  const [activeTab, setActiveTab] = useState('accueil');
  const [chantierActif, setChantierActif] = useState(null);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [showDevisForm, setShowDevisForm] = useState(false);
  const [showDocumentRapide, setShowDocumentRapide] = useState(false); 
  const [showProfilPage, setShowProfilPage] = useState(false);
  const [showClientInterface, setShowClientInterface] = useState(false);
  const [showFournisseurInterface, setShowFournisseurInterface] = useState(false); // NOUVEAU

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [nbDemandes, setNbDemandes] = useState(0); 
  const artisanId = 2; 
  const [reputationGlobal, setReputationGlobal] = useState({ indice_confiance: '...' });

  useEffect(() => {
    fetch(`http://localhost:5000/api/artisans/${artisanId}/reputation`).then(res => res.json()).then(res => { if(res.status === 'success') setReputationGlobal(res.data); }).catch(err => console.error(err));
  }, [artisanId, refreshTrigger]);

  useEffect(() => {
    fetch('http://localhost:5000/api/demandes').then(res => res.json()).then(res => { if(res.status === 'success') setNbDemandes(res.data.length); }).catch(err => console.error(err));
  }, [refreshTrigger, showClientInterface, showDevisForm]);

  if (showFournisseurInterface) return <FournisseurDashboard onClose={() => setShowFournisseurInterface(false)} />; // LE MODE FOURNISSEUR
  if (showClientInterface) return <ClientDemande onClose={() => { setShowClientInterface(false); setRefreshTrigger(prev => prev + 1); }} />;
  if (showProfilPage) return <ProfilArtisan artisanId={artisanId} onBack={() => setShowProfilPage(false)} />;
  if (chantierActif) return <ChecklistChantier chantier={chantierActif} onBack={() => setChantierActif(null)} />;
  if (showPortfolioForm) return <AjoutPortfolio artisanId={artisanId} onClose={() => setShowPortfolioForm(false)} onSuccess={() => { setShowPortfolioForm(false); setRefreshTrigger(prev => prev + 1); }} />;
  if (showDevisForm) return <DevisInverse artisanId={artisanId} onClose={() => setShowDevisForm(false)} onSuccess={() => { setShowDevisForm(false); setRefreshTrigger(prev => prev + 1); setActiveTab('chantiers'); }} />;
  if (showDocumentRapide) return <GenerateurDevis isStandalone={true} onClose={() => setShowDocumentRapide(false)} onValider={(data) => { alert(`${data.type} généré(e).`); setShowDocumentRapide(false); }} />;

  return (
    <div className="bg-white min-h-screen pb-16 font-sans relative">
      <header className="bg-blue-900 text-white px-4 py-3 sticky top-0 z-10 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-black tracking-wide">ARTI<span className="text-blue-300">PRO</span></h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-blue-800 px-3 py-1 rounded-full border border-blue-700 shadow-inner">
            <svg className="w-5 h-5 text-yellow-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <span className="font-bold text-sm text-white">{reputationGlobal.indice_confiance}</span>
          </div>
          <button onClick={() => setShowProfilPage(true)} className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-black border-2 border-white shadow-sm active:scale-95 transition-transform">
            GA
          </button>
        </div>
      </header>

      <main className="w-full">
        {activeTab === 'accueil' && (<DashboardArtisan key={refreshTrigger} />)}
        {activeTab === 'chantiers' && (<MesChantiers artisanId={artisanId} onSelectChantier={setChantierActif} />)}
        {activeTab === 'marketplace' && (<Marketplace />)}
      </main>

      <button onClick={() => setIsActionMenuOpen(true)} className="fixed bottom-20 right-4 bg-blue-600 text-white p-4 rounded-full active:bg-blue-700 z-30 shadow-lg flex items-center justify-center">
        {nbDemandes > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
      </button>

      {isActionMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end justify-center" onClick={() => setIsActionMenuOpen(false)}>
          <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="font-bold text-gray-900">Espaces & Actions</h3>
              <button onClick={() => setIsActionMenuOpen(false)} className="text-gray-400 p-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            
            <div className="w-full pb-8">
              {/* BOUTON FOURNISSEUR */}
              <button onClick={() => { setIsActionMenuOpen(false); setShowFournisseurInterface(true); }} className="w-full flex items-center gap-4 px-4 py-4 active:bg-gray-50 text-left border-b border-gray-100 bg-blue-50">
                <div className="bg-blue-200 text-blue-800 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                  <span className="font-bold text-blue-900 block">Espace Fournisseur</span>
                  <span className="text-xs text-blue-700">Gérer ma boutique (Démo)</span>
                </div>
              </button>

              <button onClick={() => { setIsActionMenuOpen(false); setShowClientInterface(true); }} className="w-full flex items-center gap-4 px-4 py-4 active:bg-gray-50 text-left border-b border-gray-100 bg-gray-50">
                <div className="bg-green-100 text-green-700 p-2 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                <div><span className="font-semibold text-gray-900 block">Simuler un Client</span><span className="text-xs text-gray-500">Envoyer une demande (Test)</span></div>
              </button>

              <button onClick={() => { setIsActionMenuOpen(false); setShowDevisForm(true); }} className="w-full flex items-center justify-between px-4 py-4 active:bg-gray-50 text-left border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 text-orange-700 p-2 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg></div>
                  <div><span className="font-semibold text-gray-900 block">Nouvelles demandes</span><span className="text-xs text-gray-500">Répondre aux clients</span></div>
                </div>
                {nbDemandes > 0 && <span className="bg-green-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-sm">{nbDemandes}</span>}
              </button>

              <button onClick={() => { setIsActionMenuOpen(false); setShowDocumentRapide(true); }} className="w-full flex items-center gap-4 px-4 py-4 active:bg-gray-50 text-left border-b border-gray-100">
                <div className="bg-purple-100 text-purple-700 p-2 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
                <div><span className="font-semibold text-gray-900 block">Devis / Facture</span><span className="text-xs text-gray-500">Générer un document express</span></div>
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around pb-safe z-20">
        <button onClick={() => setActiveTab('accueil')} className={`flex-1 py-3 text-xs font-bold flex flex-col items-center ${activeTab === 'accueil' ? 'text-blue-700' : 'text-gray-400'}`}><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg><span>Accueil</span></button>
        <button onClick={() => setActiveTab('chantiers')} className={`flex-1 py-3 text-xs font-bold flex flex-col items-center border-l border-gray-100 ${activeTab === 'chantiers' ? 'text-blue-700' : 'text-gray-400'}`}><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg><span>Chantiers</span></button>
        <button onClick={() => setActiveTab('marketplace')} className={`flex-1 py-3 text-xs font-bold flex flex-col items-center border-l border-gray-100 ${activeTab === 'marketplace' ? 'text-blue-700' : 'text-gray-400'}`}><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg><span>Marketplace</span></button>
      </nav>
    </div>
  );
}
export default App;
