import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Shield, Zap, Settings, Bell, 
  LogOut, ChevronRight, Activity, Award, 
  Star, Terminal, Database, ShieldCheck 
} from 'lucide-react';
import GlassCard from './GlassCard';

const UserProfile = ({ onLogout }) => {
  const [userSettings, setUserSettings] = useState({
    name: "Priyanshu Mohanty",
    role: "Elite Operator",
    level: "Lv. 42 Coherence",
    calibrationFreq: "High (Real-time)"
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-8 pb-40 animate-fade-in font-sans">
      <header className="flex flex-col items-center justify-center pt-12 mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-slate-100/50 blur-[100px] rounded-full -z-10" />
        
        <div className="relative group">
          <div className="w-32 h-32 bg-white rounded-[3rem] flex items-center justify-center shadow-enterprise border border-slate-100 overflow-hidden group-hover:border-slate-300 transition-all">
            <User size={64} className="text-slate-900" />
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg"
          >
             <ShieldCheck size={20} className="text-white" />
          </motion.div>
        </div>

        <div className="text-center mt-10">
            <h2 className="text-4xl font-black tracking-tighter italic uppercase text-slate-900">{userSettings.name}</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
                <span className="bg-slate-900 text-white text-[9px] font-black tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border border-slate-700">{userSettings.role}</span>
                <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border border-indigo-100">{userSettings.level}</span>
            </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-10">
        <GlassCard className="bg-slate-900 border-none shadow-enterprise-lg text-white p-10 relative overflow-hidden">
           <div className="relative z-10 flex justify-between items-center">
              <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-2 font-mono">Service Metric Allocation</p>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">12,482 <span className="text-xs not-italic text-slate-600 ml-1">Credits</span></h3>
              </div>
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <Award size={32} className="text-indigo-400" />
              </div>
           </div>
           <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5 shadow-inner">
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Authorization</p>
                 <p className="font-black text-white italic uppercase tracking-tighter">Level Alpha-7</p>
              </div>
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5 shadow-inner">
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Duty Cycle</p>
                 <p className="font-black text-white italic uppercase tracking-tighter">98.2% Active</p>
              </div>
           </div>
           <Star className="absolute top-0 right-0 p-4 opacity-5" size={120} />
        </GlassCard>

        <div className="space-y-4">
            <SectionHeader title="System Module Configuration" />
            <ProfileItem 
                icon={<Settings className="text-slate-400" />} 
                title="Neural Core Protocols" 
                subtitle={`Buffer Frequency: ${userSettings.calibrationFreq}`} 
            />
            <ProfileItem 
                icon={<Shield className="text-emerald-500" />} 
                title="Quantum Biometric Encryption" 
                subtitle="End-to-End Tunnel: VERIFIED" 
            />
            <ProfileItem 
                icon={<Database className="text-indigo-500" />} 
                title="Temporal Data Registry" 
                subtitle="Primary Storage: Neural Local" 
            />
            <ProfileItem 
                icon={<Terminal className="text-cyan-500" />} 
                title="Analytical Sub-Systems" 
                subtitle="Active Sensors: 12.V4" 
            />
        </div>

        <div className="space-y-4 pt-6">
            <SectionHeader title="Authorized Session Management" />
            <motion.button 
              whileHover={{ x: 5, borderColor: '#f43f5e33' }}
              onClick={onLogout}
              className="w-full p-8 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-between text-rose-500 shadow-enterprise hover:shadow-enterprise-lg transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100 shadow-inner">
                    <LogOut size={24} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                    <span className="font-black text-xs uppercase tracking-[0.3em] block">Terminate Neural Link</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Authorized Command Protocol</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-200" />
            </motion.button>
        </div>

        <p className="text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.8em] mt-24 py-8 border-t border-slate-50 italic">
          NEUROPULSE OS • ENTERPRISE CORE V4.2.1
        </p>
      </div>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4 px-6">{title}</p>
);

const ProfileItem = ({ icon, title, subtitle }) => (
  <motion.div 
    whileHover={{ y: -3, borderColor: '#1e293b11' }}
    className="p-6 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-between cursor-pointer group transition-all shadow-enterprise hover:shadow-enterprise-lg"
  >
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner border border-slate-100">
        {icon}
      </div>
      <div>
        <h4 className="font-black text-sm tracking-tight text-slate-800 uppercase italic leading-none">{title}</h4>
        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-2">{subtitle}</p>
      </div>
    </div>
    <ChevronRight size={18} className="text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
  </motion.div>
);

export default UserProfile;
