import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, History, Activity, Calendar, Zap, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-[#02020a] text-white p-6 pb-32">
      <header className="flex items-center gap-4 mb-10 pt-4">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
          <TrendingUp className="text-emerald-400" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black uppercase italic">Neural Insights</h1>
          <p className="text-emerald-400 text-[10px] font-bold tracking-widest">TEMPORAL ANALYSIS ACTIVE</p>
        </div>
      </header>

      <div className="space-y-6">
        <GlassCard className="bg-gradient-to-br from-emerald-500/10 to-transparent">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <History className="text-emerald-400" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Temporal Recovery Trend</h3>
              <p className="text-gray-400 text-xs">Your autonomic system is adapting well to current stressors.</p>
            </div>
          </div>
          
          <div className="h-64 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData}>
                <XAxis dataKey="name" stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#050510', border: '1px solid #333', borderRadius: '12px' }} 
                />
                <Bar dataKey="hrv" radius={[6, 6, 0, 0]}>
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.hrv > 40 ? '#10b981' : '#f43f5e'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
              <p className="text-[10px] text-gray-500 font-bold uppercase">RMSSD (ms) / Scan Index</p>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                 <span className="text-[10px] text-gray-400">High Recovery</span>
              </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 gap-4">
           {history.length === 0 && !loading && (
             <div className="text-center py-12 text-gray-500 text-sm italic">No temporal data available. Initialize a scan to begin tracking.</div>
           )}
           {history.map((h, i) => (
             <GlassCard key={i} className="py-4 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${h.stress_score > 60 ? 'bg-red-500/10' : 'bg-cyan-500/10'}`}>
                         <Activity size={20} className={h.stress_score > 60 ? 'text-red-400' : 'text-cyan-400'} />
                      </div>
                      <div>
                         <p className="font-bold text-sm tracking-tight">{new Date(h.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                         <p className="text-[10px] text-gray-500 uppercase font-black">Score: {h.energy_score}% Recovery</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-xl font-black text-white">{h.heart_rate}<span className="text-[10px] text-gray-500 ml-1">BPM</span></p>
                      <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-tighter">{h.recovery_state}</p>
                   </div>
                </div>
             </GlassCard>
           ))}
        </div>
      </div>
    </div>
  );
};

export default HealthInsights;
