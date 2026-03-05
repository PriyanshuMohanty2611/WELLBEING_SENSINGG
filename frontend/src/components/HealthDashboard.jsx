import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Activity, Battery, Thermometer, Wind, Droplets, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';
import ThreeHeart from './ThreeHeart';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import DigitalTwin from './DigitalTwin';

const NeuroPulseDashboard = ({ data, onBack }) => {
  const {
    heart_rate = 72, rmssd = 40, sdnn = 55, pnn50 = 15, lf_hf_ratio = 1.5,
    stress_score = 30, energy_score = 75, focus_level = 65,
    oxygen_saturation = 98, blood_pressure_sys = 120, blood_pressure_dia = 80,
    temperature = 36.6, recovery_state = "Optimal"
  } = data || {};

  const historyData = [
    { name: '00:00', val: 65 }, { name: '04:00', val: 60 }, { name: '08:00', val: 85 },
    { name: '12:00', val: 75 }, { name: '16:00', val: 80 }, { name: '20:00', val: 70 }
  ];

  return (
    <div className="min-h-screen bg-[#02020a] text-white p-6 pb-32 font-sans selection:bg-cyan-500/30">
      <header className="flex justify-between items-center mb-10 pt-4">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Zap size={24} className="text-cyan-400" />
           </div>
           <div>
              <h1 className="text-2xl font-black tracking-tight uppercase italic">NeuroPulse AI</h1>
              <p className="text-gray-500 text-xs font-bold tracking-[0.2em]">SYSTEM OPERATIONAL</p>
           </div>
        </div>
        <div className="text-right">
           <p className="text-gray-400 text-xs">RECOVERY STATE</p>
           <p className={`text-sm font-bold ${recovery_state === 'Optimal' ? 'text-emerald-400' : 'text-orange-400'}`}>{recovery_state.toUpperCase()}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Digital Twin Visualization */}
        <div className="lg:col-span-12">
            <GlassCard className="border-cyan-500/10 bg-gradient-to-b from-cyan-500/5 to-transparent">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2">
                        <DigitalTwin health={{ stress_score, energy_score }} />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                       <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Digital Twin Analysis</h3>
                       <p className="text-gray-400 leading-relaxed text-sm">
                         Your physiological avatar is currently showing <span className="text-cyan-400 font-bold">Resonant Coherence</span>. 
                         The auric particle density suggests high cognitive availability.
                       </p>
                       <div className="grid grid-cols-2 gap-4">
                          <MetricBox label="Energy Store" value={`${energy_score}%`} color="text-cyan-400" />
                          <MetricBox label="Focus Buffer" value={`${focus_level}%`} color="text-purple-400" />
                          <MetricBox label="Sympathetic Stress" value={`${stress_score}%`} color="text-red-400" />
                          <MetricBox label="RMSSD (HRV)" value={`${rmssd} ms`} color="text-emerald-400" />
                       </div>
                    </div>
                </div>
            </GlassCard>
        </div>

        {/* Deep HRV Analytics */}
        <div className="lg:col-span-8">
            <GlassCard className="h-full">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold flex items-center gap-2"><Activity size={18} className="text-cyan-400" /> Neural Pulse History</h4>
                    <div className="flex gap-2">
                        {['24H', '7D', '30D'].map(t => <button key={t} className="text-[10px] px-2 py-1 bg-white/5 rounded border border-white/10 hover:bg-cyan-500/20">{t}</button>)}
                    </div>
                </div>
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historyData}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#555" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#050510', border: '1px solid #333' }} />
                      <Area type="monotone" dataKey="val" stroke="#06b6d4" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </GlassCard>
        </div>

        {/* Bio-Diagnostics */}
        <div className="lg:col-span-4 space-y-6">
           <GlassCard className="bg-emerald-500/5 border-emerald-500/20">
              <p className="text-xs text-emerald-400 font-bold tracking-widest mb-2 uppercase">HRV Coherence</p>
              <div className="flex justify-between items-end">
                 <div>
                    <h5 className="text-2xl font-bold">{lf_hf_ratio.toFixed(1)} <span className="text-xs font-normal text-gray-500">Ratio</span></h5>
                    <p className="text-[10px] text-gray-400 mt-1">LF/HF Balance Spectrum</p>
                 </div>
                 <div className="w-20 bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: `${Math.min(100, lf_hf_ratio * 20)}%` }} />
                 </div>
              </div>
           </GlassCard>
           
           <div className="grid grid-cols-2 gap-4">
               <MiniVital label="TEMP" value={`${temperature}°C`} />
               <MiniVital label="SPO2" value={`${oxygen_saturation}%`} />
               <MiniVital label="BP" value={`${blood_pressure_sys}/${blood_pressure_dia}`} />
               <MiniVital label="SDNN" value={`${sdnn}ms`} />
           </div>

           <motion.button 
             whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6,182,212,0.2)" }}
             whileTap={{ scale: 0.98 }}
             onClick={onBack}
             className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2"
           >
             Initialize Scan <ArrowRight size={18} />
           </motion.button>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value, color }) => (
  <div className="bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{label}</p>
    <p className={`text-xl font-black mt-1 ${color}`}>{value}</p>
  </div>
);

const MiniVital = ({ label, value }) => (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
        <p className="text-gray-500 text-[9px] font-black tracking-widest uppercase">{label}</p>
        <p className="text-md font-bold text-gray-200 mt-1">{value}</p>
    </div>
);

export default NeuroPulseDashboard;
