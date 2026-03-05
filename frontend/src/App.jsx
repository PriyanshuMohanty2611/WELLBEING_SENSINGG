import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, User, Shield, Sparkles, Plus, Zap, Wind } from 'lucide-react';
import HealthDashboard from './components/HealthDashboard';
import MeasurementUI from './components/MeasurementUI';
import AICoherence from './components/AICoherence';
import HealthInsights from './components/HealthInsights';
import UserProfile from './components/UserProfile';
import QuickActionMenu from './components/QuickActionMenu';
import SomaticBreathing from './components/SomaticBreathing';

const App = () => {
  const [screen, setScreen] = useState('welcome'); // welcome, dashboard, measure
  const [activeTab, setActiveTab] = useState('activity'); // activity, insights, chat, profile, flow
  const [systemOverlay, setSystemOverlay] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
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
    <div className="min-h-screen bg-white text-slate-900 p-6 flex flex-col items-center justify-center overflow-hidden relative selection:bg-cyan-500/30">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-100 blur-[150px] rounded-full opacity-50" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-100 blur-[150px] rounded-full opacity-50" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center space-y-12">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-xl shadow-cyan-200">
            <Zap size={48} className="text-white" />
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border border-dashed border-cyan-200 rounded-full" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter italic uppercase text-slate-900">WELLBEING<span className="text-cyan-600">_SENSINGG</span></h1>
          <p className="text-slate-400 text-[10px] font-black tracking-[0.6em] uppercase">The Human Operating System</p>
        </div>

        <div className="space-y-6 pt-10">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => setScreen(healthData ? 'dashboard' : 'measure')} 
            className="w-full py-5 px-20 bg-slate-900 text-white rounded-3xl font-black text-xs tracking-[0.3em] uppercase shadow-2xl shadow-slate-200 transition-all"
          >
            Authorize Access
          </motion.button>
          <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest flex items-center justify-center gap-2">
            <Shield size={14} className="text-cyan-600" /> SECURE BIOMETRIC DATA ENCRYPTION
          </p>
        </div>
      </motion.div>
    </div>
  );

  const renderDashboardContent = () => {
    switch(activeTab) {
      case 'activity': return <HealthDashboard data={healthData} onBack={() => setShowBreathing(true)} />;
      case 'insights': return <HealthInsights userId={1} />;
      case 'chat': return <AICoherence healthData={healthData} />;
      case 'profile': return <UserProfile />;
      default: return <HealthDashboard data={healthData} onBack={() => setShowBreathing(true)} />;
    }
  };

  const handleSystemAction = (action) => {
    setSystemOverlay(false);
    if (action === 'measure') {
      setScreen('measure');
    } else if (action === 'mood') {
        setShowBreathing(true);
    } else {
      alert(`Neural Module ${action.toUpperCase()} initialized.`);
    }
  };

  return (
    <div className="font-sans antialiased select-none bg-white">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && <WelcomeScreen key="welcome" />}
        {screen === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen">
             {renderDashboardContent()}
          </motion.div>
        )}
        {screen === 'measure' && <MeasurementUI key="measure" onComplete={(d) => { setHealthData(d); setScreen('dashboard'); setActiveTab('activity'); }} onCancel={() => setScreen('welcome')} />}
      </AnimatePresence>

      <AnimatePresence>
        {showBreathing && <SomaticBreathing onClose={() => setShowBreathing(false)} />}
      </AnimatePresence>

      <QuickActionMenu 
        isOpen={systemOverlay} 
        onClose={() => setSystemOverlay(false)} 
        onAction={handleSystemAction}
      />

      {screen === 'dashboard' && (
        <nav className="fixed bottom-0 left-0 right-0 h-28 bg-white/90 backdrop-blur-3xl border-t border-slate-100 flex items-center justify-around px-8 z-[60] shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
          <NavItem icon={<Activity />} active={activeTab === 'activity'} onClick={() => setActiveTab('activity')} />
          <NavItem icon={<Heart />} active={activeTab === 'insights'} onClick={() => setActiveTab('insights')} />
          <div className="relative">
             <button 
                onClick={() => setSystemOverlay(true)} 
                className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-xl shadow-slate-200 relative z-10 transition-transform active:scale-90"
              >
                <Plus className="text-white" size={32} />
              </button>
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <NavItem icon={<Sparkles />} active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
          <NavItem icon={<User />} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>
      )}
    </div>
  );
};

const NavItem = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-3xl transition-all duration-300 relative ${active ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
  >
    {active && (
      <motion.div 
        layoutId="navIndicator"
        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-500 rounded-full"
      />
    )}
    {React.cloneElement(icon, { size: 26, strokeWidth: active ? 2.5 : 2 })}
  </button>
);

export default App;
