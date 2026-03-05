import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DigitalWatch = ({ className }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (t) => t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const formatDate = (t) => t.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className={`relative ${className}`}>
      {/* Watch Body */}
      <div className="w-56 h-56 bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group">
        
        {/* Animated Background Pulse */}
        <motion.div 
           animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
           transition={{ duration: 4, repeat: Infinity }}
           className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl"
        />

        {/* Neural Network Pattern (Simulated with CSS) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(6,182,212,0.2)_100%)] bg-[length:20px_20px]" />
        </div>

        {/* Clock Face */}
        <div className="relative z-10 text-center">
            <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-3">Sync Active</p>
            <h2 className="text-5xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                {formatTime(time)}
            </h2>
            <div className="mt-4 flex flex-col items-center">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">
                    {formatDate(time)}
                </p>
                <div className="mt-3 flex gap-1 h-3 items-end">
                    {[...Array(8)].map((_, i) => (
                        <motion.div 
                           key={i}
                           animate={{ height: [4, Math.random() * 12 + 4, 4] }}
                           transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                           className="w-1 bg-cyan-500 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* Corner Indicators */}
        <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
      </div>

      {/* Watch Straps (Visual only) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-800 rounded-t-2xl -z-10" />
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-800 rounded-b-2xl -z-10" />
    </div>
  );
};

export default DigitalWatch;
