import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Zap, Brain, MessageSquare } from 'lucide-react';
import GlassCard from './GlassCard';

const AICoherence = ({ healthData }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Neural Interface initialized. I am analyzing your biometrics. How can I assist your optimization today?" }
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
      setMessages(prev => [...prev, { role: 'assistant', content: "System connection error. My neural core suggests your energy levels are optimal for a short recovery walk." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02020a] text-white p-6 pb-32">
      <header className="flex items-center gap-4 mb-8 pt-4">
        <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
          <Brain className="text-purple-400" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black uppercase italic">Coherence AI</h1>
          <p className="text-purple-400 text-[10px] font-bold tracking-widest">NEURAL ANALYST ONLINE</p>
        </div>
      </header>

      <div className="space-y-4 mb-4 h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-white text-black font-medium' 
                : 'bg-white/5 border border-white/10 text-gray-300 backdrop-blur-xl'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && <div className="text-purple-400 animate-pulse text-xs font-bold uppercase tracking-widest ml-4">Processing Neural Patterns...</div>}
      </div>

      <div className="fixed bottom-28 left-6 right-6 z-50">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your health..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-purple-500/50 backdrop-blur-2xl"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-white text-black rounded-xl hover:scale-105 transition-transform"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoherence;
