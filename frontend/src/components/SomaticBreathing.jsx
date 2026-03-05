import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, X, Shield, Activity, ChevronRight } from 'lucide-react';

const SomaticBreathing = ({ onClose }) => {
  const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    const runPhase = async () => {
      // Inhale (4s)
      setPhase('Inhale');
      for (let i = 0; i <= 100; i++) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 40));
      }
      // Hold (4s)
      setPhase('Hold');
      await new Promise(r => setTimeout(r, 4000));
      // Exhale (6s)
      setPhase('Exhale');
      for (let i = 100; i >= 0; i--) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 60));
      }
      runPhase();
    };
    runPhase();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      <div className="absolute top-0 right-0 p-6">
        <button onClick={onClose} className="p-3 bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="text-center mb-20">
        <h2 className="text-3xl font-black italic uppercase tracking-tight text-slate-900">Somatic Calibration</h2>
        <p className="text-emerald-500 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Vagal Nerve Activation</p>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Breathing Circle */}
        <motion.div 
          animate={{ 
            scale: phase === 'Inhale' ? 1.5 : phase === 'Exhale' ? 1 : 1.5,
          }}
          transition={{ duration: phase === 'Exhale' ? 6 : 4, ease: "easeInOut" }}
          className="w-40 h-40 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-full blur-3xl opacity-20 absolute"
        />
        
        <motion.div 
          animate={{ 
            scale: phase === 'Inhale' ? 1.4 : phase === 'Exhale' ? 1 : 1.4,
            borderWidth: phase === 'Hold' ? 8 : 2
          }}
          transition={{ duration: phase === 'Exhale' ? 6 : 4, ease: "easeInOut" }}
          className="w-48 h-48 rounded-full border-2 border-emerald-400/30 flex items-center justify-center"
        >
          <div className="text-center">
             <AnimatePresence mode="wait">
                <motion.p 
                  key={phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl font-black italic uppercase text-slate-900"
                >
                  {phase}
                </motion.p>
             </AnimatePresence>
          </div>
        </motion.div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div 
                className="w-1 h-1 bg-emerald-400 rounded-full" 
                style={{ transform: `translateY(${120 + i * 5}px)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-32 w-full max-w-xs">
        <div className="flex justify-between items-center mb-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Calibration Progress</span>
           <span className="text-[10px] font-black text-emerald-500">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
           <motion.div 
             animate={{ width: `${progress}%` }}
             className="h-full bg-emerald-400"
           />
        </div>
      </div>

      <p className="mt-20 text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase max-w-[200px] text-center leading-relaxed">
        Focus on the sensation of air moving through your center.
      </p>
    </div>
  );
};

export default SomaticBreathing;
