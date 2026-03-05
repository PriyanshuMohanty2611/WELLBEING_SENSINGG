import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Activity, Battery, Thermometer, Wind, Droplets, ArrowRight, BrainCircuit, Target, ShieldCheck } from 'lucide-react';
import GlassCard from './GlassCard';
import ThreeHeart from './ThreeHeart';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import DigitalTwin from './DigitalTwin';

const HealthDashboard = ({ data, onBack }) => {
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

  // Calculate Neural Score (simulated based on metrics)
  const neuralScore = Math.floor((rmssd * 2) + (energy_score * 3) + focus_level + (100 - stress_score)) + 400;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-6 pb-32 font-sans selection:bg-cyan-500/30">
      <header className="flex justify-between items-center mb-10 pt-4">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
              <Zap size={24} className="text-cyan-600" />
           </div>
           <div>
              <h1 className="text-2xl font-black tracking-tight uppercase italic text-slate-900">WELLBEING_SENSINGG</h1>
              <p className="text-slate-400 text-xs font-bold tracking-[0.2em]">SYSTEM OPERATIONAL</p>
           </div>
        </div>
        <div className="text-right">
           <p className="text-slate-400 text-xs font-bold">RECOVERY STATE</p>
           <p className={`text-sm font-black ${recovery_state === 'Optimal' ? 'text-emerald-600' : 'text-orange-600'}`}>{recovery_state.toUpperCase()}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Neural Score Hexagon-Style Card */}
        <div className="lg:col-span-12">
           <GlassCard className="bg-gradient-to-br from-indigo-500/5 to-white border-indigo-500/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-4">
                  <div className="text-center md:text-left">
                     <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">Neural Health Index</p>
                     <h2 className="text-7xl font-black italic tracking-tighter text-slate-900">{neuralScore}</h2>
                     <p className="text-slate-400 text-sm font-medium mt-2 flex items-center gap-2 justify-center md:justify-start">
                        <ShieldCheck size={16} className="text-emerald-500" /> 
                        Top 5% for your age group
                     </p>
                  </div>
                  <div className="flex gap-4">
                     <HighlightBox icon={<Target className="text-blue-500" />} label="Focus Mode" value="Active" />
                     <HighlightBox icon={<BrainCircuit className="text-purple-500" />} label="Cognitive Load" value="Low" />
                  </div>
              </div>
           </GlassCard>
        </div>

        {/* Digital Twin Visualization */}
        <div className="lg:col-span-12">
            <GlassCard className="border-cyan-500/10 bg-white">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2">
                        <DigitalTwin health={{ stress_score, energy_score }} />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                       <h3 className="text-3xl font-black text-slate-900 leading-tight">Biometric Simulation</h3>
                       <p className="text-slate-500 leading-relaxed text-sm">
                         Your digital twin is resonating at <span className="text-cyan-600 font-bold">High Coherence</span>. 
                         Autonomic nervous system (ANS) patterns indicate deep physiological readiness.
                       </p>
                       <div className="grid grid-cols-2 gap-4">
                          <MetricBox label="Energy Store" value={`${energy_score}%`} color="text-cyan-600" bg="bg-cyan-50" />
                          <MetricBox label="Focus Buffer" value={`${focus_level}%`} color="text-purple-600" bg="bg-purple-50" />
                          <MetricBox label="Sympathetic Stress" value={`${stress_score}%`} color="text-rose-600" bg="bg-rose-50" />
                          <MetricBox label="RMSSD" value={`${rmssd}ms`} color="text-emerald-600" bg="bg-emerald-50" />
                       </div>
                    </div>
                </div>
            </GlassCard>
        </div>

        {/* Deep HRV Analytics */}
        <div className="lg:col-span-8">
            <GlassCard className="h-full bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-black text-slate-900 flex items-center gap-2 uppercase text-xs tracking-widest">
                       <Activity size={18} className="text-cyan-600" /> Pulse Temporal Analysis
                    </h4>
                    <div className="flex gap-2">
                        {['24H', '7D', '30D'].map(t => <button key={t} className="text-[10px] px-3 py-1 bg-slate-50 text-slate-600 font-bold rounded-full border border-slate-100 hover:bg-slate-100">{t}</button>)}
                    </div>
                </div>
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historyData}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="val" stroke="#06b6d4" fillOpacity={1} fill="url(#colorVal)" strokeWidth={4} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </GlassCard>
        </div>

        {/* Bio-Diagnostics */}
        <div className="lg:col-span-4 space-y-6">
           <GlassCard className="bg-emerald-50 border-emerald-100 shadow-none">
              <p className="text-xs text-emerald-600 font-black tracking-widest mb-2 uppercase">HRV Coherence</p>
              <div className="flex justify-between items-end">
                 <div>
                    <h5 className="text-3xl font-black text-slate-900">{lf_hf_ratio.toFixed(1)} <span className="text-xs font-normal text-slate-500">Ratio</span></h5>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">VNS Tone Balance</p>
                 </div>
                 <div className="w-20 bg-emerald-200/30 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, lf_hf_ratio * 20)}%` }} />
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
             whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
             whileTap={{ scale: 0.98 }}
             onClick={onBack}
             className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-3 transition-all"
           >
             Initialize New Scan <ArrowRight size={18} className="text-cyan-400" />
           </motion.button>
        </div>
      </div>
    </div>
  );
};

const HighlightBox = ({ icon, label, value }) => (
  <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 min-w-[120px]">
    <div className="flex items-center gap-2 mb-1">
       {icon}
       <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
    </div>
    <p className="font-bold text-slate-900">{value}</p>
  </div>
);

const MetricBox = ({ label, value, color, bg }) => (
  <div className={`${bg} p-4 rounded-3xl border border-transparent hover:border-slate-200 transition-all`}>
    <p className="text-slate-500 text-[10px] uppercase font-black tracking-wider">{label}</p>
    <p className={`text-2xl font-black mt-1 ${color}`}>{value}</p>
  </div>
);

const MiniVital = ({ label, value }) => (
    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <p className="text-slate-400 text-[9px] font-black tracking-widest uppercase">{label}</p>
        <p className="text-md font-bold text-slate-900 mt-1">{value}</p>
    </div>
);

export default HealthDashboard;
