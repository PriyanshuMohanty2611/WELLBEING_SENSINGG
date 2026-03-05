import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, History, Activity, Calendar, Zap, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import GlassCard from './GlassCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const HealthInsights = ({ userId = 1 }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:8000/history/${userId}`);
        const data = await res.json();
        setHistory(data.slice(0, 7).reverse()); // Last 7 readings
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  const statsData = history.map(h => ({
    name: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    hrv: h.rmssd,
    hr: h.heart_rate
  }));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-6 pb-40">
      <header className="flex items-center gap-4 mb-10 pt-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
          <TrendingUp className="text-emerald-600" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black uppercase italic text-slate-900">Neural Insights</h1>
          <p className="text-emerald-600 text-[10px] font-black tracking-[0.3em] uppercase">TEMPORAL ANALYSIS ACTIVE</p>
        </div>
      </header>

      <div className="space-y-6">
        <GlassCard className="bg-white border-slate-100 shadow-sm">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <Sparkles className="text-emerald-500" size={20} />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900 leading-tight">Biometric Recovery Trend</h3>
              <p className="text-slate-400 text-xs font-medium">Your autonomic nervous system is showing <span className="text-emerald-600 font-bold">Resonant Improvement</span>.</p>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={statsData}>
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="hrv" radius={[8, 8, 8, 8]} barSize={32}>
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.hrv > 40 ? '#10b981' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-50">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">RMSSD / Cycle Index</p>
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,182,129,0.3)]" />
                 <span className="text-[10px] text-slate-900 font-black uppercase tracking-widest">Optimal Recovery</span>
              </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 gap-4">
           {history.length === 0 && !loading && (
             <div className="text-center py-12 text-slate-400 text-xs italic font-medium">No temporal packets found. Initialize a scan to begin synchronization.</div>
           )}
           {history.map((h, i) => (
             <motion.div
               key={i}
               whileHover={{ x: 5 }}
               className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex justify-between items-center cursor-pointer hover:shadow-md transition-all"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center shadow-inner ${h.stress_score > 60 ? 'bg-rose-50' : 'bg-cyan-50'}`}>
                      <Activity size={24} className={h.stress_score > 60 ? 'text-rose-500' : 'text-cyan-600'} />
                   </div>
                   <div>
                      <p className="font-black text-sm tracking-tight text-slate-900">{new Date(h.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })} at {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">Energy Index: {h.energy_score}%</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="text-right">
                      <p className="text-2xl font-black text-slate-900 tracking-tighter italic">{h.heart_rate}<span className="text-[9px] text-slate-300 ml-1 uppercase not-italic">BPM</span></p>
                      <p className="text-[10px] text-emerald-600 uppercase font-black tracking-widest">{h.recovery_state}</p>
                   </div>
                   <ChevronRight size={18} className="text-slate-200" />
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default HealthInsights;
