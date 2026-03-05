import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Zap, ShoppingCart, Plus, ChevronLeft, Droplets, Flame, Scale, Terminal, ShieldCheck } from 'lucide-react';
import GlassCard from './GlassCard';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, Legend } from 'recharts';

const NutritionLog = ({ onBack }) => {
  const macrosData = [
    { name: 'Protein', value: 30, color: '#6366f1' },
    { name: 'Carbs', value: 45, color: '#f59e0b' },
    { name: 'Fats', value: 25, color: '#10b981' }
  ];

  const mealHistory = [
    { time: '08:30 AM', name: 'Almond Oats & Blueberries', cal: 350, protein: '12g' },
    { time: '01:15 PM', name: 'Quinoa Bowl with Salmon', cal: 650, protein: '42g' },
    { time: '04:30 PM', name: 'Greek Yogurt & Honey', cal: 180, protein: '15g' },
    { time: '07:45 PM', name: 'Grilled Chicken & Steamed Greens', cal: 480, protein: '38g' },
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
                <h1 className="text-3xl font-black tracking-tight text-slate-900 italic uppercase">Metabolic Intelligence</h1>
                <p className="text-slate-400 font-bold text-[10px] tracking-[0.4em] mt-1 uppercase">NUTRITIONAL BIO-LOAD ANALYSIS • REGISTERED</p>
            </div>
        </div>
        <motion.button 
            whileHover={{ y: -2, backgroundColor: '#000' }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.4em] flex items-center gap-4 shadow-2xl shadow-slate-200"
        >
            <Plus size={18} className="text-cyan-400" /> Log Nutrient Packet
        </motion.button>
      </header>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Metabolic Primary Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InsightItem label="Primary Energy Expenditure" value="1,850" unit="kcal" sub="Optimization Score: 94%" icon={<Flame size={24} />} color="text-orange-500" />
            <InsightItem label="Liquid Volume Allocation" value="1.8" unit="L" sub="System hydration: Stable" icon={<Droplets size={24} />} color="text-cyan-500" />
            <InsightItem label="Static Body Mass" value="74.2" unit="kg" sub="Delta: -0.2kg" icon={<Scale size={24} />} color="text-emerald-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Macro Breakdown and Charts */}
          <div className="lg:col-span-7">
              <GlassCard className="p-10 h-full border-slate-200/50">
                  <div className="flex justify-between items-center mb-12">
                      <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                          <Terminal size={18} className="text-indigo-600" /> Macro-Nutrient Distribution
                      </h3>
                      <div className="flex items-center gap-3 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                          <ShieldCheck size={14} className="text-indigo-600" />
                          <span className="text-[9px] font-black uppercase text-indigo-600 tracking-widest">Calculated</span>
                      </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-16">
                      <div className="w-full md:w-1/2 h-72 relative">
                        <div className="absolute inset-0 bg-indigo-500/5 blur-[50px] rounded-full" />
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <PieChart>
                                <Pie 
                                    data={macrosData} 
                                    innerRadius={80} 
                                    outerRadius={110} 
                                    paddingAngle={10} 
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {macrosData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: '900' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-full md:w-1/2 space-y-4">
                          {macrosData.map((m, i) => (
                              <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 flex justify-between items-center group hover:border-indigo-500/20 transition-all shadow-enterprise">
                                  <div className="flex items-center gap-5">
                                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">{m.name} Index</span>
                                  </div>
                                  <span className="text-sm font-black italic text-slate-400 group-hover:text-indigo-600 transition-colors">{m.value}%</span>
                              </div>
                          ))}
                      </div>
                  </div>
              </GlassCard>
          </div>

          <div className="lg:col-span-5">
              <GlassCard className="p-10 h-full bg-slate-900 border-none text-white shadow-enterprise-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-slate-500 mb-10 font-mono">Temporal Intake History</h3>
                    <div className="space-y-8">
                        {mealHistory.map((meal, idx) => (
                            <div key={idx} className="flex justify-between items-center group">
                                <div className="flex items-center gap-5">
                                    <div className="w-1.5 h-10 bg-white/5 group-hover:bg-cyan-500 transition-colors rounded-full" />
                                    <div>
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{meal.time}</p>
                                        <p className="text-sm font-black italic uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{meal.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black italic tracking-tighter text-white tabular-nums">{meal.cal}<span className="text-[10px] font-normal text-slate-600 not-italic ml-1 uppercase">Kcal</span></p>
                                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-1">{meal.protein} Protein Logged</p>
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>
                  <Utensils className="absolute -bottom-16 -right-16 text-white/5 rotate-12" size={240} />
              </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightItem = ({ icon, label, value, unit, sub, color }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-enterprise flex justify-between items-center group hover:shadow-enterprise-lg transition-all">
        <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{label}</p>
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">{value}</span>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{unit}</span>
                </div>
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                    <ShieldCheck size={10} /> {sub}
                </p>
            </div>
        </div>
    </div>
);

export default NutritionLog;
