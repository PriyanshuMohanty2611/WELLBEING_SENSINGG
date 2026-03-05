import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Zap, Activity, Battery, Thermometer, 
  Wind, Droplets, ArrowRight, BrainCircuit, 
  Target, ShieldCheck, Download, ChevronLeft, Sparkles
} from 'lucide-react';
import GlassCard from './GlassCard';
import DigitalTwin from './DigitalTwin';
import DigitalWatch from './DigitalWatch';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

  const neuralScore = Math.floor((rmssd * 2) + (energy_score * 3) + focus_level + (100 - stress_score)) + 400;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-8 pb-32 animate-fade-in font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pt-4">
        <div className="flex items-center gap-6">
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={onBack}
             className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-enterprise"
           >
              <ChevronLeft size={20} className="text-slate-900" />
           </motion.button>
           <div>
              <h1 className="text-2xl font-black tracking-tight uppercase italic text-slate-900">Biometric Override</h1>
              <p className="text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">SYSTEM PORTAL ACTIVE • SESSION 0921-A</p>
           </div>
        </div>
        <div className="flex gap-4">
           <div className="text-right border-r border-slate-100 pr-6">
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Integrity Status</p>
              <p className={`text-sm font-black italic ${recovery_state === 'Optimal' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {recovery_state.toUpperCase()}
              </p>
           </div>
           <motion.button 
             whileHover={{ x: 3 }}
             className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 shadow-lg shadow-slate-200"
           >
              <Download size={14} className="text-cyan-400" /> Export Data
           </motion.button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Core Analysis Card */}
        <div className="lg:col-span-12">
           <GlassCard className="p-10 border-slate-200/50">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="w-full lg:w-1/2 space-y-8">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Neural Health Index</p>
                        <div className="flex items-baseline gap-4">
                          <h2 className="text-8xl font-black italic tracking-tighter text-slate-900">{neuralScore}</h2>
                          <div className="px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
                             <ShieldCheck size={14} className="text-emerald-500" />
                             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Optimal Range</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <DetailMetric label="Somatic Energy" value={`${energy_score}%`} status="High" />
                         <DetailMetric label="Cognitive Focus" value={`${focus_level}%`} status="Peak" />
                         <DetailMetric label="ANS Stress" value={`${stress_score}%`} status="Low" inverse />
                         <DetailMetric label="Base RMSSD" value={`${rmssd}ms`} status="Stable" />
                      </div>
                  </div>
                  <div className="w-full lg:w-1/2 h-80 relative">
                      <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full" />
                      <DigitalTwin health={{ stress_score, energy_score }} />
                  </div>
              </div>
           </GlassCard>
        </div>

        {/* Temporal Trends */}
        <div className="lg:col-span-8">
            <GlassCard className="p-8 h-full">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                       <Activity size={18} className="text-slate-900" /> Temporal Pulse Waveform
                    </h3>
                    <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                        {['1H', '24H', '7D'].map(t => <button key={t} className={`px-4 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${t === '24H' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>)}
                    </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={historyData}>
                      <defs>
                        <linearGradient id="dashboardGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }} 
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="val" stroke="#1e293b" fill="url(#dashboardGrad)" strokeWidth={4} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </GlassCard>
        </div>

        {/* Tactical Metrics Rack */}
        <div className="lg:col-span-4 space-y-6">
           <div className="flex justify-center mb-4">
              <DigitalWatch />
           </div>
           <GlassCard className="p-8 bg-slate-900 text-white border-none shadow-enterprise-lg relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3">VNS Tone Balance</p>
                <div className="flex justify-between items-end mb-6">
                    <h4 className="text-4xl font-black italic tracking-tighter">{lf_hf_ratio.toFixed(1)} <span className="text-[10px] not-italic text-slate-500 ml-1 uppercase">Ratio</span></h4>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Resonant</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, lf_hf_ratio * 20)}%` }}
                      className="h-full bg-cyan-400" 
                    />
                </div>
              </div>
              <Sparkles className="absolute top-0 right-0 p-4 opacity-5" size={100} />
           </GlassCard>
           
           <div className="grid grid-cols-1 gap-4">
              <MiniStat label="Oxygen Packet" value={`${oxygen_saturation}%`} icon={<Wind size={14} />} />
              <MiniStat label="System Temp" value={`${temperature}°C`} icon={<Thermometer size={14} />} />
              <MiniStat label="Blood Pressure" value={`${blood_pressure_sys}/${blood_pressure_dia}`} icon={<Zap size={14} />} />
           </div>

           <motion.button 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={() => window.location.reload()}
             className="w-full py-5 bg-emerald-500 text-slate-900 rounded-[2rem] font-black text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20"
           >
             Initialize Recalibration
           </motion.button>
        </div>
      </div>
    </div>
  );
};

const DetailMetric = ({ label, value, status, inverse = false }) => (
  <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl group hover:bg-white hover:border-slate-200 transition-all">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex justify-between items-end">
      <p className="text-xl font-black text-slate-900 italic uppercase">{value}</p>
      <p className={`text-[9px] font-black uppercase tracking-widest ${inverse ? 'text-rose-500' : 'text-emerald-500'}`}>{status}</p>
    </div>
  </div>
);

const MiniStat = ({ label, value, icon }) => (
  <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-enterprise flex justify-between items-center group hover:border-slate-300 transition-all">
    <div className="flex items-center gap-4">
       <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
          {icon}
       </div>
       <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{value}</p>
       </div>
    </div>
    <ChevronLeft size={14} className="text-slate-200 rotate-180" />
  </div>
);

export default HealthDashboard;
