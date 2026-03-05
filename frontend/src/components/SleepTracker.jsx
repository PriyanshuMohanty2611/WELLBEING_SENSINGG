import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Star, Clock, Bell, ChevronLeft, Zap, Battery, Activity, ShieldCheck, Terminal } from 'lucide-react';
import GlassCard from './GlassCard';
import DigitalWatch from './DigitalWatch';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

const SleepTracker = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('7D');

  const sleepData = [
    { day: 'Mon', hours: 7.2, quality: 85 },
    { day: 'Tue', hours: 6.8, quality: 70 },
    { day: 'Wed', hours: 8.1, quality: 92 },
    { day: 'Thu', hours: 7.5, quality: 88 },
    { day: 'Fri', hours: 6.5, quality: 65 },
    { day: 'Sat', hours: 9.0, quality: 95 },
    { day: 'Sun', hours: 8.5, quality: 90 },
  ];

  const stageData = [
    { time: '11PM', deep: 20, rem: 10, light: 70 },
    { time: '1AM', deep: 60, rem: 20, light: 20 },
    { time: '3AM', deep: 30, rem: 50, light: 20 },
    { time: '5AM', deep: 10, rem: 60, light: 30 },
    { time: '7AM', deep: 5, rem: 20, light: 75 },
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
                <h1 className="text-3xl font-black tracking-tight text-slate-900 italic uppercase">Sleep Architecture</h1>
                <p className="text-slate-400 font-bold text-[10px] tracking-[0.4em] mt-1 uppercase">ESTABLISHED NEURAL RECOVERY PROTOCOL</p>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="text-right border-r border-slate-100 pr-6">
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Bio-Temporal Lock</p>
                <p className="text-sm font-black italic text-emerald-600 uppercase">SYNCHRONIZED</p>
            </div>
            <div className="flex gap-2 bg-white p-1 rounded-2xl border border-slate-100 shadow-enterprise">
                {['24H', '7D', '30D'].map(t => (
                    <button 
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === t ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Hero Navigation & Digital Watch */}
          <div className="lg:col-span-12">
              <div className="flex flex-col lg:flex-row gap-8 items-center justify-center py-10">
                  <DigitalWatch className="mb-8 lg:mb-0" />
                  <div className="max-w-md text-center lg:text-left">
                      <h2 className="text-4xl font-black italic uppercase text-slate-900 leading-none mb-6">Autonomous <br/><span className="text-indigo-600 font-black">Restoration</span></h2>
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">
                          Your restorative cycle is currently optimized. High-fidelity biometric tracking confirms a deep physiological recharge. System recalibration is recommended within the next cycle window.
                      </p>
                      <div className="mt-8 flex gap-4 justify-center lg:justify-start">
                          <div className="px-6 py-3 bg-indigo-50 rounded-2xl border border-indigo-100 text-indigo-600 flex items-center gap-3 shadow-sm">
                              <ShieldCheck size={18} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Protocol Verified</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Analytics Summary */}
        <div className="lg:col-span-8 space-y-8">
            <GlassCard className="p-10">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                        <Terminal size={18} className="text-indigo-600" /> Systemic Duration Analysis
                    </h3>
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                        <Clock size={18} className="text-slate-400" />
                    </div>
                </div>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <BarChart data={sleepData}>
                            <XAxis dataKey="day" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip 
                                cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }} 
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="hours" radius={[6, 6, 6, 6]} barSize={32}>
                                {sleepData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.hours > 7 ? '#6366f1' : '#cbd5e1'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>

            <GlassCard className="p-10">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                        <Activity size={18} className="text-pink-500" /> Hypnogram Waveform Output
                    </h3>
                    <div className="flex items-center gap-3 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Real-time Feed</span>
                    </div>
                </div>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <AreaChart data={stageData}>
                            <defs>
                                <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }} 
                            />
                            <Area type="stepAfter" dataKey="deep" stroke="#6366f1" fill="url(#sleepGrad)" strokeWidth={4} />
                            <Area type="stepAfter" dataKey="rem" stroke="#ec4899" fill="transparent" strokeWidth={2} strokeDasharray="6 6" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-slate-100">
                    <StageLegend color="bg-indigo-600" label="Deep Restorative" />
                    <StageLegend color="bg-pink-500" label="REM Neural Sort" />
                    <StageLegend color="bg-slate-200" label="Somatic Light" />
                </div>
            </GlassCard>
        </div>

        {/* Action and Metric Column */}
        <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-10 bg-slate-900 border-none shadow-enterprise-lg relative overflow-hidden">
                <div className="relative z-10 text-white">
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 mb-2 font-mono">Restoration Index</p>
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-6xl font-black italic tracking-tighter tabular-nums leading-none">95<span className="text-xl not-italic text-slate-600 ml-1">%</span></h2>
                        <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] mb-2 font-mono">PEAK STATE</span>
                    </div>
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                            <Zap size={24} />
                        </div>
                        <p className="text-xs font-medium text-slate-400 leading-tight">Biometric recalibration confirms efficient deep-stage neural sorting.</p>
                    </div>
                </div>
                <Moon size={180} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
            </GlassCard>

            <div className="grid grid-cols-1 gap-4">
                <MetricInsight label="Dormancy Latency" value="12 mins" icon={<Star size={18} className="text-slate-400" />} color="text-amber-500" />
                <MetricInsight label="Deep Wave Arch" value="2h 45m" icon={<Battery size={18} className="text-slate-400" />} color="text-indigo-600" />
                <MetricInsight label="Cycle Efficiency" value="89.4%" icon={<Activity size={18} className="text-slate-400" />} color="text-emerald-500" />
            </div>

            <motion.button 
                whileHover={{ y: -3, backgroundColor: '#000' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase text-[10px] tracking-[0.4em] shadow-2xl shadow-slate-300 transition-all"
            >
                Initialize Recovery Alert
            </motion.button>
        </div>
      </div>
    </div>
  );
};

const StageLegend = ({ color, label }) => (
    <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</span>
    </div>
);

const MetricInsight = ({ label, value, icon, color }) => (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-enterprise flex justify-between items-center group hover:border-slate-300 transition-all">
        <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                {icon}
            </div>
            <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <p className={`text-xl font-black italic uppercase tracking-tight ${color}`}>{value}</p>
            </div>
        </div>
        <ChevronLeft size={16} className="text-slate-200 rotate-180" />
    </div>
);

export default SleepTracker;
