import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Zap, Settings, Bell, LogOut, ChevronRight, Activity, Award, Star } from 'lucide-react';
import GlassCard from './GlassCard';

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-6 pb-40">
      <header className="flex flex-col items-center justify-center pt-12 mb-10">
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-slate-100 overflow-hidden">
            <User size={48} className="text-slate-800" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-white">
             <Star size={16} className="text-white fill-current" />
          </div>
        </div>
        <h2 className="text-3xl font-black mt-8 tracking-tighter italic uppercase text-slate-900">Priyanshu Mohanty</h2>
        <div className="flex items-center gap-2 mt-2">
            <span className="bg-cyan-100 text-cyan-700 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full">Elite Operator</span>
            <span className="bg-purple-100 text-purple-700 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full">Lv. 42 Coherence</span>
        </div>
      </header>

      <div className="space-y-6">
        <GlassCard className="bg-slate-900 border-none shadow-xl text-white">
           <div className="flex justify-between items-center">
              <div>
                 <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Lifetime Achievement</p>
                 <h3 className="text-2xl font-black italic uppercase">12.4k Bio-Points</h3>
              </div>
              <Award size={40} className="text-white/20" />
           </div>
           <div className="mt-6 flex justify-between gap-4">
              <div className="flex-1 bg-white/10 p-3 rounded-2xl">
                 <p className="text-[8px] font-bold text-white/50 uppercase">Daily Streak</p>
                 <p className="font-black text-white">12 Days</p>
              </div>
              <div className="flex-1 bg-white/10 p-3 rounded-2xl">
                 <p className="text-[8px] font-bold text-white/50 uppercase">Total Scans</p>
                 <p className="font-black text-white">842</p>
              </div>
           </div>
        </GlassCard>

        <SectionHeader title="System Modules" />
        
        <ProfileItem icon={<Settings className="text-slate-400" />} title="Neural Core Config" subtitle="Calibration frequency, sensitivity" />
        <ProfileItem icon={<Shield className="text-emerald-500" />} title="Quantum Security" subtitle="End-to-End Encryption: ACTIVE" />
        <ProfileItem icon={<Zap className="text-cyan-500" />} title="NeuroPulse Cloud" subtitle="Enterprise Plan • Pro Features" />
        <ProfileItem icon={<Activity className="text-purple-500" />} title="Biometric Node Export" subtitle="CSV / HL7 / PDF Protocol" />

        <SectionHeader title="Session Management" />
        <motion.button 
          whileHover={{ x: 5 }}
          className="w-full p-6 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-between text-rose-500 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <LogOut size={22} strokeWidth={2.5} />
            <span className="font-black text-xs uppercase tracking-widest">Terminate Core Session</span>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </motion.button>

        <p className="text-center text-slate-300 text-[9px] font-black uppercase tracking-[0.6em] mt-12 py-4">
          BIO-SYSTEM OS V2.1.2 - PRIORITY ALPHA
        </p>
      </div>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-3 px-4 pt-4">{title}</p>
);

const ProfileItem = ({ icon, title, subtitle }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: "#fff" }}
    className="p-5 bg-white border border-slate-50 rounded-[2.5rem] flex items-center justify-between cursor-pointer group transition-all shadow-sm hover:shadow-md"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-50 rounded-[1.25rem] flex items-center justify-center group-hover:bg-slate-100 transition-colors shadow-inner">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-sm tracking-tight text-slate-800">{title}</h4>
        <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter mt-0.5">{subtitle}</p>
      </div>
    </div>
    <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
  </motion.div>
);

export default UserProfile;
