import React, { useEffect, useRef, useState } from "react";

const metiers = [
  ["plomberie", "Plomberie"],
  ["electricite", "Électricité"],
  ["maconnerie", "Maçonnerie"],
  ["menuiserie", "Menuiserie"],
  ["peinture", "Peinture"],
  ["couverture", "Couverture / toiture"],
  ["autre", "Autre besoin"],
];

export default function ClientDemande({ onClose }) {
  const [step, setStep] = useState("record");
  const [recording, setRecording] = useState(false);
  const [audioBase64, setAudioBase64] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [recordError, setRecordError] = useState("");
  const [form, setForm] = useState({ type_metier: "", telephone: "", localisation: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [demande, setDemande] = useState(null);
  
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  async function startRecording() {
    setRecordError("");
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setRecordError("L’enregistrement audio n’est pas disponible.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunks.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = String(reader.result ?? "");
          setAudioBase64(dataUrl.split(",")[1] ?? "");
          setAudioUrl(URL.createObjectURL(blob));
          setRecording(false);
          stream.getTracks().forEach(t => t.stop());
        };
        reader.readAsDataURL(blob);
      };
      recorder.start();
      setRecording(true);
    } catch {
      setRecordError("Accès au microphone refusé.");
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }

  async function submitDemande(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      // LE VRAI APPEL API VERS POSTGRESQL !
      const response = await fetch('http://localhost:5000/api/demandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type_metier: form.type_metier,
          telephone: form.telephone,
          localisation: form.localisation,
          audio_base64: audioBase64
        })
      });
      const result = await response.json();
      if (result.status === 'success') {
        setDemande(result.data);
        setStep("success");
      }
    } catch (err) {
      setError("Erreur réseau. Impossible d'envoyer la demande.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto flex flex-col font-sans">
      <div className="bg-gray-900 text-white px-4 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-lg font-bold">Espace Client</h1>
        <button onClick={onClose} className="text-sm bg-gray-700 px-3 py-1 rounded-md active:bg-gray-600">Quitter</button>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        {step === "record" && (
          <div className="flex flex-col items-center flex-1 justify-center text-center">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Votre besoin ?</h2>
            <p className="text-gray-500 mb-8 text-sm">Transmettez votre demande aux artisans proches.</p>
            
            <button 
              onClick={recording ? stopRecording : startRecording}
              className={`w-32 h-32 rounded-full flex items-center justify-center text-white shadow-xl transition-transform ${recording ? 'bg-red-500 animate-pulse scale-110' : 'bg-blue-600 active:scale-95'}`}
            >
              {recording ? (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3 2a1 1 0 00-1 1v4a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1H6z" clipRule="evenodd"></path></svg>
              ) : (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"></path></svg>
              )}
            </button>
            <p className="mt-6 text-sm font-bold text-gray-600">{recording ? "Enregistrement en cours..." : "Touchez pour enregistrer"}</p>
            
            {audioUrl && (
              <div className="mt-6 bg-gray-100 p-4 rounded-xl w-full">
                <audio src={audioUrl} controls className="w-full h-10 mb-2" />
                <button onClick={() => { URL.revokeObjectURL(audioUrl); setAudioUrl(""); setAudioBase64(""); }} className="text-xs text-red-600 font-bold">Refaire le vocal</button>
              </div>
            )}
            
            <button onClick={() => setStep("form")} disabled={recording} className="mt-auto w-full bg-blue-900 text-white font-bold py-4 rounded-xl disabled:opacity-50">Continuer</button>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={submitDemande} className="flex flex-col flex-1">
            <button type="button" onClick={() => setStep("record")} className="text-blue-600 font-bold text-sm mb-6 flex items-center gap-2">← Retour</button>
            <h2 className="text-xl font-black text-gray-900 mb-6">Détails de contact</h2>
            
            <label className="text-xs font-bold text-gray-500 mb-1">Métier recherché</label>
            <select required value={form.type_metier} onChange={e => setForm({...form, type_metier: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 outline-none">
              <option value="">Choisir un métier...</option>
              {metiers.map(([val, lab]) => <option key={val} value={val}>{lab}</option>)}
            </select>

            <label className="text-xs font-bold text-gray-500 mb-1">Numéro WhatsApp</label>
            <input required type="tel" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 outline-none" placeholder="Ex: +229..." />

            <label className="text-xs font-bold text-gray-500 mb-1">Localisation</label>
            <input required type="text" value={form.localisation} onChange={e => setForm({...form, localisation: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6 outline-none" placeholder="Ex: Abomey-Calavi" />
            
            <button type="submit" disabled={loading} className="mt-auto w-full bg-green-600 text-white font-bold py-4 rounded-xl active:bg-green-700">{loading ? "Envoi..." : "Envoyer ma demande"}</button>
          </form>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Demande envoyée !</h2>
            <p className="text-gray-500 mb-8">Les artisans proches ont été notifiés. Vous serez contacté très bientôt.</p>
            <button onClick={onClose} className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl">Retourner à l'accueil</button>
          </div>
        )}
      </div>
    </div>
  );
}
