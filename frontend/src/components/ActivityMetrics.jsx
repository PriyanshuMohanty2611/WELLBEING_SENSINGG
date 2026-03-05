import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Footprints, Flame, Timer, Compass, ChevronLeft, TrendingUp, Zap, Target, ShieldCheck, Terminal, Activity } from 'lucide-react';
import GlassCard from './GlassCard';
import DigitalWatch from './DigitalWatch';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, Cell } from 'recharts';

const ActivityMetrics = ({ onBack }) => {
  const stepsData = [
    { day: 'Mon', steps: 8400 },
    { day: 'Tue', steps: 6200 },
    { day: 'Wed', steps: 11500 },
    { day: 'Thu', steps: 9800 },
    { day: 'Fri', steps: 4500 },
    { day: 'Sat', steps: 12800 },
    { day: 'Sun', steps: 10200 },
  ];

  const expenditureData = [
    { time: '08:00', cal: 120 },
    { time: '10:00', cal: 450 },
    { time: '12:00', cal: 300 },
    { time: '14:00', cal: 600 },
    { time: '16:00', cal: 200 },
    { time: '18:00', cal: 800 },
    { time: '20:00', cal: 150 },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-8 pb-40 animate-fade-in font-sans">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-4">
        <div className="flex items-center gap-6">
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-enterprise hover:shadow-md transition-all"
            >
                <ChevronLeft size={24} className="text-slate-900" />
            </motion.button>
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 italic uppercase">Kinetic Analysis</h1>
                <p className="text-slate-400 font-bold text-[10px] tracking-[0.4em] mt-1 uppercase">BIOMECHANICAL PERFORMANCE TRACKING • V4.2</p>
            </div>
        </div>
        <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-2xl border border-slate-100 shadow-enterprise">
            <Target className="text-emerald-500" size={24} />
            <div className="border-l border-slate-100 pl-6">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Kinetic Target Status</p>
                <p className="text-sm font-black text-slate-900 uppercase italic">8,420 <span className="text-[10px] text-slate-300 not-italic ml-1">/ 10k Steps</span></p>
            </div>
            <div className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <span className="text-[9px] font-black text-emerald-600">84.2%</span>
            </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12">
                <GlassCard className="p-10 border-slate-200/50">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500 flex items-center gap-4">
                            <Activity size={20} /> Thermodynamic Expenditure Waveform
                        </h3>
                        <div className="flex items-center gap-3 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">
                            <ShieldCheck size={14} className="text-orange-600" />
                            <span className="text-[9px] font-black uppercase text-orange-600 tracking-widest">Calibrated</span>
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <AreaChart data={expenditureData}>
                                <defs>
                                    <linearGradient id="kineticGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }} 
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="cal" stroke="#f97316" fill="url(#kineticGrad)" strokeWidth={5} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>

            <div className="lg:col-span-8">
                <GlassCard className="p-10 border-slate-200/50 h-full">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-4">
                            <Terminal size={20} className="text-emerald-500" /> Temporal Kinetic Displacement
                        </h3>
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                            <TrendingUp size={20} className="text-slate-400" />
                        </div>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <BarChart data={stepsData}>
                                <XAxis dataKey="day" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff' }} 
                                />
                                <Bar dataKey="steps" radius={[6, 6, 6, 6]} barSize={36}>
                                    {stepsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.steps > 10000 ? '#10b981' : '#cbd5e1'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>

            <div className="lg:col-span-4 space-y-6">
                <div className="flex justify-center mb-4">
                    <DigitalWatch />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <KineticMetric icon={<Timer size={24} />} label="Active Operation Window" value="48 mins" color="text-cyan-500" />
                    <KineticMetric icon={<Compass size={24} />} label="Geometric Displacement" value="6.4 km" color="text-indigo-500" />
                    <KineticMetric icon={<Zap size={24} />} label="Intensity Scaling" value="Optimized" color="text-amber-500" />
                </div>

                <GlassCard className="p-10 bg-slate-900 border-none text-white shadow-enterprise-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 mb-4 font-mono">Neural Readiness Protocol</p>
                        <h4 className="text-2xl font-black italic mb-8 uppercase tracking-tight leading-tight">System calibrated for <span className="text-emerald-400">Peak Kinetic</span> training.</h4>
                        <motion.button 
                            whileHover={{ y: -3, backgroundColor: '#10b981' }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 bg-emerald-500 text-slate-900 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.4em] shadow-2xl shadow-emerald-500/20"
                        >
                            Initialize Session Sync
                        </motion.button>
                    </div>
                    <Activity className="absolute -bottom-16 -right-16 text-white/5 rotate-12" size={200} />
                </GlassCard>
            </div>
        </div>
      </div>
    </div>
  );
};

const KineticMetric = ({ icon, label, value, color }) => (
    <motion.div 
        whileHover={{ x: 5 }}
        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-enterprise flex items-center gap-6 group hover:border-indigo-500/20 transition-all cursor-default"
    >
        <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{label}</p>
            <p className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">{value}</p>
        </div>
    </motion.div>
);

export default ActivityMetrics;
