import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Sparkles, Brain, MessageSquare, Activity, 
  Shield, AlertCircle, Terminal, HelpCircle, ChevronRight 
} from 'lucide-react';
import GlassCard from './GlassCard';

const AICoherence = ({ healthData }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Neural Interface authorized. I have successfully ingested your temporal biometric data. Ready for systems optimization analysis." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestedQueries = [
    "Execute metabolic trend analysis",
    "Calculate somatic recovery window",
    "Assess ANS coherence level",
    "Request dietary fuel optimization"
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;
    
    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, user_id: 1 })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Neural Core suggests optimizing for deep rest. Your current RMSSD metrics indicate a sympathetic dominance. Focus on box-breathing protocols." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-8 pb-48 animate-fade-in font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pt-4">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center border border-slate-800 shadow-enterprise">
            <Terminal className="text-cyan-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase italic text-slate-900 tracking-tight">Intelligence Analyst</h1>
            <p className="text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">NEURAL COHERENCE ENGINE V4.2</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-100 shadow-enterprise">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Context Sync: Active</span>
        </div>
      </header>

      {/* Analyst Dashboard View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="space-y-6 mb-8 h-[50vh] overflow-y-auto pr-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed shadow-enterprise-lg ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white font-medium rounded-tr-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none prose prose-slate'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex items-center gap-3 ml-6">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Quick Reply Packets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
             {suggestedQueries.map((q, idx) => (
               <button 
                 key={idx}
                 onClick={() => handleSend(q)}
                 className="text-left p-4 bg-white border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-500 hover:border-cyan-500/30 hover:bg-slate-50 transition-all flex items-center justify-between group shadow-sm"
               >
                 <span>{q}</span>
                 <ChevronRight size={14} className="text-slate-200 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
               </button>
             ))}
          </div>
        </div>

        {/* Biometric Context Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="p-8 bg-slate-900 border-none text-white overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="text-cyan-400" size={18} />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Systems Diagnosis</h3>
              </div>
              <div className="space-y-4">
                <DiagnosisRow label="ANS State" value="Resonant" color="text-emerald-400" />
                <DiagnosisRow label="Neural Gating" value="Low" color="text-cyan-400" />
                <DiagnosisRow label="Somatic Load" value="Minimal" color="text-emerald-400" />
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Sparkles size={120} />
            </div>
          </GlassCard>

          <div className="p-6 border border-slate-100 rounded-[2rem] bg-white shadow-enterprise">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Tactical Awareness</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
              "System recovery is optimized. Recommended to engage in high-complexity cognitive tasks within the next 45-minute window."
            </p>
          </div>
        </div>
      </div>

      {/* Interface Input */}
      <div className="fixed bottom-32 left-8 right-8 z-[70] max-w-4xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-cyan-500/5 blur-3xl -z-10 rounded-full" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Initialize query or command protocol..."
            className="w-full bg-white/80 backdrop-blur-3xl border border-slate-200 rounded-[3rem] py-6 pl-10 pr-20 text-sm font-medium focus:outline-none focus:border-slate-400 shadow-enterprise-lg transition-all"
          />
          <button 
            onClick={() => handleSend()}
            className="absolute right-3 top-3 bottom-3 px-8 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            Execute <Send size={14} className="text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

const DiagnosisRow = ({ label, value, color }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-3">
    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{label}</span>
    <span className={`text-xs font-black uppercase tracking-widest ${color}`}>{value}</span>
  </div>
);

export default AICoherence;
