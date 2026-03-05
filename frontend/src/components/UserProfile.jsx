import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Zap, Settings, Bell, LogOut, ChevronRight, Activity } from 'lucide-react';
import GlassCard from './GlassCard';

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-[#02020a] text-white p-6 pb-32">
      <header className="flex flex-col items-center justify-center pt-12 mb-10">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <User size={48} className="text-white" />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border border-dashed border-cyan-500/30 rounded-full"
          />
        </div>
        <h2 className="text-2xl font-black mt-6 tracking-tight italic uppercase">Priyanshu Mohanty</h2>
        <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mt-2">Elite Bio-Operator</p>
      </header>

      <div className="space-y-4">
        <SectionHeader title="Neural Core Settings" />
        
        <ProfileItem icon={<Settings className="text-gray-400" />} title="System Preferences" subtitle="Privacy, Bio-Link, Notifications" />
        <ProfileItem icon={<Shield className="text-emerald-400" />} title="Privacy & Encryption" subtitle="Military grade SHA-256 active" />
        <ProfileItem icon={<Zap className="text-cyan-400" />} title="Neuro-Pulse subscription" subtitle="Lifetime optimization active" />
        <ProfileItem icon={<Activity className="text-purple-400" />} title="Health Data Export" subtitle="JSON / PDF / Apple Health" />

        <motion.button 
          whileHover={{ x: 5 }}
          className="w-full mt-10 p-5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between text-red-400"
        >
          <div className="flex items-center gap-4">
            <LogOut size={20} />
            <span className="font-bold text-sm uppercase tracking-widest">Terminate Session</span>
          </div>
          <ChevronRight size={18} />
        </motion.button>

        <p className="text-center text-gray-700 text-[10px] font-black uppercase tracking-[0.5em] mt-10">
          WELLBEING_SENSINGG V2.0.4 - NEURAL CORE
        </p>
      </div>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-2 px-2">{title}</p>
);

const ProfileItem = ({ icon, title, subtitle }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.03)" }}
    className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between cursor-pointer group transition-colors"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-sm tracking-tight">{title}</h4>
        <p className="text-[10px] text-gray-500 uppercase font-black">{subtitle}</p>
      </div>
    </div>
    <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition-colors" />
  </motion.div>
);

export default UserProfile;
