import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Moon, Utensils, Footprints, 
  Droplets, Scale, ShieldCheck, ArrowRight,
  TrendingUp, Activity, Zap, Brain, Shield,
  Database, Battery, Terminal
} from 'lucide-react';
import GlassCard from './GlassCard';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

const WellnessHub = ({ onNavigate }) => {
  const summaryData = [
    { name: 'Nutrition', current: 1850, target: 2200, unit: 'kcal', color: '#f59e0b', id: 'nutrition' },
    { name: 'Sleep', current: 7.5, target: 8, unit: 'hrs', color: '#6366f1', id: 'sleep' },
    { name: 'Activity', current: 8400, target: 10000, unit: 'steps', color: '#10b981', id: 'activity' },
    { name: 'Hydration', current: 1.8, target: 2.5, unit: 'L', color: '#0ea5e9', id: 'water' }
  ];

  const pieData = [
    { name: 'Protein', value: 30, color: '#6366f1' },
    { name: 'Carbs', value: 45, color: '#f59e0b' },
    { name: 'Fats', value: 25, color: '#10b981' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-8 pb-40 animate-fade-in font-sans">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-4">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center border border-slate-800 shadow-enterprise">
            <Shield className="text-cyan-400" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 italic uppercase">Neural Intelligence</h1>
            <p className="text-slate-400 font-bold text-[10px] tracking-[0.4em] mt-1 uppercase">FEDERATED BIOMETRIC REGISTRY • V4.2</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-enterprise">
           <ShieldCheck className="text-emerald-500" size={18} />
           <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Context Sync: Verified</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Core Status Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="relative group"
              onClick={() => onNavigate(item.id)}
            >
              <GlassCard className="p-8 cursor-pointer border-slate-200/50 shadow-enterprise hover:shadow-enterprise-lg transition-all h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                    {item.id === 'nutrition' && <Utensils size={24} />}
                    {item.id === 'sleep' && <Moon size={24} />}
                    {item.id === 'activity' && <Footprints size={24} />}
                    {item.id === 'water' && <Droplets size={24} />}
                  </div>
                  <ArrowRight size={18} className="text-slate-200 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{item.name} Load</p>
                <h4 className="text-3xl font-black italic tracking-tighter text-slate-900">
                  {item.current} <span className="text-xs not-italic text-slate-300 ml-1 uppercase">{item.unit}</span>
                </h4>
                <div className="mt-8 h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (item.current / item.target) * 100)}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400">
                    <span>Baseline</span>
                    <span>Target Reached</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Metabolic Architecture Analysis */}
          <div className="lg:col-span-8">
            <GlassCard className="h-full p-10 border-slate-200/50">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 text-amber-600">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 italic">Metabolic Architecture</h3>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Nutrient Partitioning Analysis</p>
                    </div>
                </div>
                <Terminal size={18} className="text-slate-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="h-56 relative">
                  <div className="absolute inset-0 bg-indigo-500/5 blur-[60px] rounded-full" />
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <PieChart>
                      <Pie 
                        data={pieData} 
                        innerRadius={70} 
                        outerRadius={95} 
                        paddingAngle={8} 
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
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
                <div className="space-y-4">
                  {pieData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white border border-slate-100 shadow-enterprise hover:border-indigo-500/20 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-black uppercase text-slate-800 tracking-widest">{item.name} Allocation</span>
                      </div>
                      <span className="text-xs font-black italic text-slate-400 group-hover:text-indigo-600 transition-colors">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Restoration Index */}
          <div className="lg:col-span-4 cursor-pointer" onClick={() => onNavigate('sleep')}>
            <GlassCard className="h-full p-10 bg-slate-900 border-none text-white shadow-enterprise-lg relative overflow-hidden active:scale-[0.98] transition-all">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-indigo-400 shadow-inner">
                    <Moon size={24} />
                  </div>
                  <Database size={18} className="text-slate-700" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 mb-2 font-mono">Restoration Index</p>
                <div className="flex justify-between items-end mb-10">
                  <h3 className="text-6xl font-black italic tracking-tighter leading-none">92<span className="text-xl not-italic text-slate-700 ml-1">%</span></h3>
                  <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest whitespace-nowrap">Peak Recovery</span>
                  </div>
                </div>
                <div className="h-40 border-t border-white/5 pt-8">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={[
                      { t: '0h', v: 20 }, { t: '2h', v: 80 }, { t: '4h', v: 40 }, { t: '6h', v: 95 }, { t: '8h', v: 10 }
                    ]}>
                      <defs>
                        <linearGradient id="restorationGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#6366f1" fill="url(#restorationGrad)" strokeWidth={4} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <Activity className="absolute -bottom-20 -left-20 text-white/5 rotate-45" size={240} />
            </GlassCard>
          </div>

          {/* Tactical Intelligence Row */}
          <div className="lg:col-span-12">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mb-6 px-4">Tactical Biometric Intelligence</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InsightRow icon={<Battery className="text-cyan-500" />} label="Somatic Reservoir" value="84%" sub="Stability: High" />
              <InsightRow icon={<Heart className="text-rose-500" />} label="Neural Pulse" value="68 BPM" sub="Variance: Optimal" />
              <InsightRow icon={<Brain className="text-purple-500" />} label="Cognitive Clarity" value="Elite" sub="Status: Authorized" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightRow = ({ icon, label, value, sub }) => (
  <motion.div 
    whileHover={{ y: -3 }}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-enterprise flex items-center gap-6 hover:shadow-enterprise-lg transition-all cursor-default"
  >
    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-50 group hover:bg-slate-900 hover:text-white transition-all shadow-inner">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{label}</p>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">{value}</span>
        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{sub}</span>
      </div>
    </div>
  </motion.div>
);

export default WellnessHub;
