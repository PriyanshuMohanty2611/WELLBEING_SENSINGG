import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Zap, Brain, MessageSquare, Activity, User, Shield } from 'lucide-react';
import GlassCard from './GlassCard';

const AICoherence = ({ healthData }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Neural Interface initialized. I am synchronized with your latest Biometric state. How can I assist your somatic optimization today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, user_id: 1 })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "My neural core suggests you focus on rhythmic breathing. Your current energy index is optimal for high-focus tasks." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-6 pb-40">
      <header className="flex items-center gap-4 mb-8 pt-4">
        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center border border-purple-200">
          <Brain className="text-purple-600" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black uppercase italic text-slate-900">Coherence AI</h1>
          <p className="text-purple-600 text-[10px] font-black tracking-[0.3em] uppercase">NEURAL ANALYST ONLINE</p>
        </div>
      </header>

      {/* Dynamic Wave Feature */}
      <div className="mb-8 p-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center gap-4 overflow-hidden relative">
         <div className="flex gap-1 h-8 items-end">
            {[...Array(20)].map((_, i) => (
                <motion.div 
                    key={i}
                    animate={{ height: [10, Math.random() * 30 + 10, 10] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-purple-400 rounded-full"
                />
            ))}
         </div>
         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest relative z-10">Real-time Semantic Waveform</p>
         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-0" />
      </div>

      <div className="space-y-6 mb-8 h-[55vh] overflow-y-auto pr-2 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white font-medium rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && <div className="text-purple-600 animate-pulse text-[10px] font-black uppercase tracking-[0.4em] ml-6">Analyzing Neural Patterns...</div>}
      </div>

      <div className="fixed bottom-32 left-6 right-6 z-50">
        <div className="relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your health..."
            className="w-full bg-white border border-slate-200 rounded-[2.5rem] py-5 pl-8 pr-16 text-sm focus:outline-none focus:border-purple-500/50 shadow-xl shadow-slate-200 transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2.5 top-2.5 bottom-2.5 w-12 flex items-center justify-center bg-slate-900 text-white rounded-[1.5rem] hover:scale-105 transition-transform active:scale-95 shadow-lg"
          >
            <Send size={20} className="text-purple-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoherence;
