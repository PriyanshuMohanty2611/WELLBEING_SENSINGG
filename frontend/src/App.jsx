import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, User, Shield, Sparkles, Plus, Bell, Settings, HeartPulse } from 'lucide-react';
import HealthDashboard from './components/HealthDashboard';
import MeasurementUI from './components/MeasurementUI';
import GlassCard from './components/GlassCard';

const App = () => {
  const [screen, setScreen] = useState('welcome');
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:8000/history/1");
        const data = await res.json();
        if (data && data.length > 0) setHealthData(data[0]);
      } catch (e) {}
    };
    fetchHistory();
  }, []);

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-[#02020a] text-white p-6 flex flex-col items-center justify-center overflow-hidden relative selection:bg-cyan-500/30">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
      
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 text-center space-y-12">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-[2rem] mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.4)]">
            <Zap size={48} className="text-white" />
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border border-dashed border-cyan-500/20 rounded-full" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter italic uppercase text-white">NeuroPulse<span className="text-cyan-400">AI</span></h1>
          <p className="text-gray-500 text-lg font-bold tracking-[0.4em] uppercase">Human Optimization Engine</p>
        </div>

        <div className="space-y-6 pt-10">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setScreen(healthData ? 'dashboard' : 'measure')} className="w-full py-5 px-16 bg-white text-black rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Initialize Neural Core
          </motion.button>
          <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2">
            <Shield size={14} /> End-to-End Neural Privacy
          </p>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="font-sans antialiased select-none">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && <WelcomeScreen key="welcome" />}
        {screen === 'dashboard' && <NeuroPulseDashboard key="dashboard" data={healthData} onBack={() => setScreen('measure')} />}
        {screen === 'measure' && <MeasurementUI key="measure" onComplete={(d) => { setHealthData(d); setScreen('dashboard'); }} onCancel={() => setScreen('welcome')} />}
      </AnimatePresence>

      {screen === 'dashboard' && (
        <nav className="fixed bottom-0 left-0 right-0 h-24 bg-black/80 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-8 z-50">
          <NavItem icon={<Activity />} active />
          <NavItem icon={<Heart />} />
          <button onClick={() => setScreen('measure')} className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl -mt-12 flex items-center justify-center shadow-2xl shadow-cyan-500/40">
            <Plus className="text-white" size={32} />
          </button>
          <NavItem icon={<Sparkles />} />
          <NavItem icon={<User />} />
        </nav>
      )}
    </div>
  );
};

const NavItem = ({ icon, active = false }) => (
  <button className={`p-3 rounded-2xl transition-all ${active ? 'text-emerald-400 bg-emerald-400/10' : 'text-gray-500 hover:text-white'}`}>
    {React.cloneElement(icon, { size: 24 })}
  </button>
);

export default App;
