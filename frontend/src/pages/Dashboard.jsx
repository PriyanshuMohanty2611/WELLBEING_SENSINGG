import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Thermometer, Droplet, Wind, Mic, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const Card = ({ title, value, unit, icon: Icon, color, subtext }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="glass-card p-5 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
        <Icon className="w-24 h-24" />
    </div>
    <div className="flex items-center gap-3 mb-2 text-gray-300">
        <Icon className="w-5 h-5" style={{ color }} />
        <span className="text-sm font-medium">{title}</span>
    </div>
    <div className="flex items-baseline gap-1">
        <h3 className="text-3xl font-bold">{value}</h3>
        <span className="text-sm text-gray-400">{unit}</span>
    </div>
    {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
    <div className="h-1 w-full bg-white/5 mt-4 rounded-full overflow-hidden">
        <div className="h-full bg-white" style={{ width: '70%', backgroundColor: color }}></div>
    </div>
  </motion.div>
);

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{ role: 'bot', text: 'Hello! I noticed your stress levels are slightly elevated. How are you feeling?' }]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;
        const newMsgs = [...messages, { role: 'user', text: input }];
        setMessages(newMsgs);
        setInput("");

        // Mock API Call
        try {
            const res = await fetch(`http://localhost:8000/chat/?query=${encodeURIComponent(input)}`, { method: 'POST' });
            const data = await res.json();
            setMessages([...newMsgs, { role: 'bot', text: data.response }]);
            
            // Speak response
            const utterance = new SpeechSynthesisUtterance(data.response);
            window.speechSynthesis.speak(utterance);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end transition-all ${open ? 'w-80' : 'w-auto'}`}>
            <AnimatePresence>
                {open && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="glass-card w-full h-96 mb-4 flex flex-col overflow-hidden bg-[#1e102e]"
                    >
                        <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between">
                            <h3 className="font-bold">AI Health Assistant</h3>
                            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">x</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((m, i) => (
                                <div key={i} className={`p-3 rounded-xl text-sm max-w-[80%] ${m.role === 'user' ? 'bg-primary text-black self-end ml-auto' : 'bg-white/10 text-white self-start'}`}>
                                    {m.text}
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t border-white/10 flex gap-2">
                            <input 
                                className="bg-white/5 rounded-full px-4 py-2 text-sm flex-1 outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Ask about your health..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button onClick={handleSend} className="p-2 bg-primary text-black rounded-full hover:bg-primary/80"><Send className="w-4 h-4" /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button 
                onClick={() => setOpen(!open)}
                className="p-4 bg-primary text-black rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
                <MessageSquare className="w-6 h-6" />
                {!open && <span className="font-bold pr-2">Chat with AI</span>}
            </button>
        </div>
    );
};

const Dashboard = () => {
  const { state } = useLocation();
  // Default mock data if no state
  const data = state?.results || {
      heart_rate: 72, oxygen_saturation: 98, stress_level: 25, 
      blood_pressure_sys: 120, blood_pressure_dia: 80, temperature: 36.6
  };

  const graphData = [
      { t: '10:00', bpm: 68 }, { t: '10:05', bpm: 72 }, { t: '10:10', bpm: 75 },
      { t: '10:15', bpm: 71 }, { t: '10:20', bpm: 69 }, { t: '10:25', bpm: 73 },
      { t: '10:30', bpm: data.heart_rate }
  ];

  return (
    <div className="min-h-screen p-6 pb-24">
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold mb-1">Your Health Snapshot</h1>
            <p className="text-gray-400">Analysis completed just now</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden border-2 border-primary">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Heart Rate" value={data.heart_rate} unit="bpm" icon={Activity} color="#ff2e63" subtext="Normal Range" />
        <Card title="Blood Pressure" value={`${data.blood_pressure_sys}/${data.blood_pressure_dia}`} unit="mmHg" icon={Activity} color="#facc15" subtext="Optimal" />
        <Card title="Oxygen" value={data.oxygen_saturation} unit="%" icon={Wind} color="#00d4ff" subtext="Excellent" />
        <Card title="Stress Level" value={data.stress_level} unit="/100" icon={Activity} color="#a855f7" subtext={data.stress_level > 50 ? "High" : "Low"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card p-6">
            <h3 className="font-bold mb-6">Heart Rate Variability</h3>
            <div className="h-64 cursor-crosshair">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={graphData}>
                        <defs>
                            <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff2e63" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ff2e63" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="t" stroke="#ffffff50" />
                        <YAxis stroke="#ffffff50" />
                         <Tooltip 
                            contentStyle={{ backgroundColor: '#1a0b2e', border: 'none', borderRadius: '8px' }} 
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="bpm" stroke="#ff2e63" fillOpacity={1} fill="url(#colorBpm)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between bg-gradient-to-br from-surface to-primary/10">
            <div>
                <h3 className="font-bold mb-2">AI Insights</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    Based on your reading, your cardiovascular health looks stable. 
                    Your stress level is {data.stress_level > 50 ? "elevated" : "low"}, which suggests 
                    {data.stress_level > 50 ? " you should take a break." : " you are well rested."}
                </p>
            </div>
            <button className="mt-4 w-full py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-medium">
                View Detailed Report
            </button>
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default Dashboard;
