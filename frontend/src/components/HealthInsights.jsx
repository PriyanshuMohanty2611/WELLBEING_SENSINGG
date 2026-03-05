import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, TrendingUp, History, Activity, 
  Calendar, Zap, AlertCircle, Sparkles, 
  ChevronRight, Database, Shield 
} from 'lucide-react';
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
        setHistory(data.slice(0, 10).reverse()); // Last 10 records
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
    hr: h.heart_rate,
    state: h.recovery_state
  }));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-8 pb-40 animate-fade-in font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pt-4">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center border border-slate-800 shadow-enterprise">
            <Database className="text-cyan-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase italic text-slate-900 tracking-tight">Temporal Registry</h1>
            <p className="text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">BIOMETRIC PACKET RETRIEVAL ACTIVE</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-enterprise">
           <Shield className="text-emerald-500" size={18} />
           <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Data Verification: 100%</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-10">
        <GlassCard className="p-10 border-slate-200/50">
          <div className="flex justify-between items-start mb-12">
            <div className="flex items-start gap-5">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 shadow-sm">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="font-black text-xl text-slate-900 italic uppercase">Recovery Architecture</h3>
                <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-wider">Temporal variance indicates <span className="text-emerald-600 font-black italic">Resonant Stability</span></p>
              </div>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={statsData}>
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="hrv" radius={[6, 6, 6, 6]} barSize={24}>
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.hrv > 40 ? '#10b981' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between items-center mt-10 pt-8 border-t border-slate-100">
              <div className="flex gap-8">
                 <LegendItem color="bg-emerald-500" label="Optimal Recovery" />
                 <LegendItem color="bg-slate-200" label="Baseline Stability" />
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">RMSSD TEMPORAL PACKETS</p>
          </div>
        </GlassCard>

        <div className="space-y-4">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6 px-2">Historical Logs</h4>
           {loading && <div className="text-center py-20 text-[10px] font-black text-slate-300 uppercase animate-pulse tracking-[0.5em]">Fetching Neural Archive...</div>}
           {history.length === 0 && !loading && (
             <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200 text-slate-400 text-xs italic font-medium uppercase tracking-widest">No temporal packets found. Initialize a scan to begin synchronization.</div>
           )}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {history.map((h, i) => (
               <motion.div
                 key={i}
                 whileHover={{ y: -3, borderColor: '#10b98133', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)' }}
                 className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-enterprise flex justify-between items-center cursor-pointer transition-all"
               >
                  <div className="flex items-center gap-5">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${h.stress_score > 60 ? 'bg-rose-50' : 'bg-slate-50'}`}>
                        <Activity size={24} className={h.stress_score > 60 ? 'text-rose-500' : 'text-slate-400'} />
                     </div>
                     <div>
                        <p className="font-black text-sm tracking-tight text-slate-900 italic uppercase">{new Date(h.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })} • {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Metabolic Load: {h.energy_score}%</p>
                     </div>
                  </div>
                  <div className="text-right flex items-center gap-5">
                     <div>
                        <p className="text-2xl font-black text-slate-900 tracking-tighter italic leading-none">{h.heart_rate}<span className="text-[9px] text-slate-300 ml-1 uppercase not-italic">BPM</span></p>
                        <p className="text-[10px] text-emerald-600 uppercase font-black tracking-widest mt-1">{h.recovery_state}</p>
                     </div>
                     <ChevronRight size={18} className="text-slate-200" />
                  </div>
               </motion.div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</span>
    </div>
);

export default HealthInsights;
