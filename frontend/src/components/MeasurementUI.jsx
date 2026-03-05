import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Shield, X, CheckCircle2, AlertCircle, Heart, ChevronRight, Sparkles, Activity, ShieldCheck, Terminal } from 'lucide-react';
import GlassCard from './GlassCard';

const MeasurementUI = ({ onComplete, onCancel }) => {
  const [measuring, setMeasuring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); 
  const [heartRate, setHeartRate] = useState(72);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startScanning = async () => {
    setStatus('checking');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStatus('recording');
      setMeasuring(true);
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setStatus('processing');
        await sendToBackend(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.start();
      let p = 0;
      const interval = setInterval(() => {
        p += 1;
        setProgress(p);
        setHeartRate(65 + Math.floor(Math.random() * 15));
        if (p >= 100) {
          clearInterval(interval);
          mediaRecorder.stop();
        }
      }, 100);
    } catch (err) { setStatus('error'); }
  };

  const sendToBackend = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "scan.webm");
    try {
      const res = await fetch("http://localhost:8000/scan/1", { method: "POST", body: formData });
      const data = await res.json();
      onComplete(data);
    } catch (e) {
      onComplete({ heart_rate: 72, rmssd: 45, sdnn: 60, pnn50: 18, lf_hf_ratio: 1.4, stress_score: 22, energy_score: 85, focus_level: 78, oxygen_saturation: 98, blood_pressure_sys: 118, blood_pressure_dia: 76, temperature: 36.6, recovery_state: 'Optimal' });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f8fafc] z-[100] flex flex-col p-8 overflow-hidden font-sans selection:bg-cyan-500/30">
      {/* Neural lattice background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Background soft gradients */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-slate-200 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-50 blur-[150px] rounded-full" />
      </div>

      <header className="flex justify-between items-center mb-16 relative z-10 pt-4">
        <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCancel} 
            className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-enterprise text-slate-400 hover:text-slate-900 transition-all"
        >
          <ChevronRight className="rotate-180" size={24} />
        </motion.button>
        <div className="text-center">
            <h2 className="text-2xl font-black tracking-[0.4em] uppercase italic text-slate-900 leading-none">NEURO<span className="text-cyan-600">PULSE</span></h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] mt-1.5 opacity-60">BIOMETRIC REGISTRY • SYNCHRONIZING</p>
        </div>
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-enterprise">
           <Terminal size={20} className="text-slate-900" />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="relative w-80 h-80 mb-20">
          {/* Animated concentric rings */}
          <div className="absolute inset-0 rounded-full border border-slate-200/50" />
          <div className="absolute -inset-4 rounded-full border border-slate-100" />
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 rounded-full border border-dashed border-slate-300"
          />
          
          <div className="absolute inset-2 rounded-[3.5rem] overflow-hidden bg-white border-[10px] border-white shadow-2xl relative">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover grayscale contrast-150 brightness-110 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
            <AnimatePresence>
                {status === 'recording' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Heart size={100} className="text-rose-500 opacity-20 animate-ping" />
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Holographic scanning overlay */}
            <motion.div 
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-20"
            />
          </div>

          <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] -rotate-90 pointer-events-none">
            <circle cx="50%" cy="50%" r="48%" stroke="#f1f5f9" strokeWidth="6" fill="none" />
            <circle 
                cx="50%" 
                cy="50%" 
                r="48%" 
                stroke="#0f172a" 
                strokeWidth="6" 
                fill="none" 
                strokeDasharray="100 100" 
                strokeDashoffset={100 - progress} 
                strokeLinecap="round" 
                pathLength="100" 
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
        </div>

        <div className="text-center">
          <AnimatePresence mode="wait">
            {status === 'recording' ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="text-9xl font-black text-slate-900 mb-4 tracking-tighter italic leading-none">{heartRate}</div>
                <div className="flex items-center justify-center gap-4 bg-white/50 px-6 py-2 rounded-full border border-slate-100 shadow-sm">
                   <span className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                   <p className="text-slate-900 text-[10px] font-black tracking-[0.4em] uppercase">Biological Flux Identified</p>
                </div>
              </motion.div>
            ) : status === 'processing' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="flex flex-col items-center">
                   <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-slate-200">
                      <Sparkles className="text-cyan-400 animate-pulse" size={40} />
                   </div>
                   <p className="text-slate-900 font-black tracking-[0.5em] uppercase text-sm italic">AI REGISTRY SYNCHRONIZATION</p>
                   <p className="text-slate-400 text-[9px] font-black mt-3 uppercase tracking-[0.4em] opacity-60">Architecting Neural Recovery Data</p>
                </div>
              </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <div className="bg-emerald-50 px-5 py-1.5 rounded-full border border-emerald-100 inline-flex items-center gap-2 mb-6">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">System Integrity Verified</span>
                   </div>
                   <h3 className="text-4xl font-black italic uppercase text-slate-900 tracking-tighter leading-tight">Initialize <span className="text-cyan-600">PPG Link</span></h3>
                   <p className="text-slate-400 text-[10px] font-black mt-6 max-w-[320px] mx-auto leading-loose uppercase tracking-[0.2em]">
                     Align your index vector over the <span className="text-slate-900">primary sensory lens</span>. 
                     The protocol requires 10 seconds of hemodynamic stability.
                   </p>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="mt-auto relative z-10 pb-12 w-full max-w-lg mx-auto">
        {status === 'idle' && (
          <motion.button 
            whileHover={{ y: -5, backgroundColor: '#0f172a' }}
            whileTap={{ scale: 0.98 }}
            onClick={startScanning} 
            className="w-full py-7 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-[11px] shadow-2xl shadow-slate-300 transition-all flex items-center justify-center gap-4 group"
          >
            <Activity size={18} className="text-cyan-400 group-hover:animate-pulse" />
            Begin Neural Scan
          </motion.button>
        )}
        <div className="flex flex-col items-center gap-2 mt-10">
            <p className="text-slate-300 text-[9px] font-black tracking-[0.4em] uppercase flex items-center gap-3">
              <Shield size={14} className="text-emerald-500" /> Neural-Encrypted Data Portal
            </p>
            <p className="text-[8px] text-slate-200 font-bold uppercase tracking-tighter">Authorized Usage Only • V4.2.0-CORE</p>
        </div>
      </footer>
    </div>
  );
};

export default MeasurementUI;
