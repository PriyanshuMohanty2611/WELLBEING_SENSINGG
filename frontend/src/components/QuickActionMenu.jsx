import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Camera, Thermometer, Droplets, Smile, 
  FileText, Cpu, Activity, Zap, Shield, HeartPulse 
} from 'lucide-react';
import GlassCard from './GlassCard';

const QuickActionMenu = ({ isOpen, onClose, onAction }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-[#050510] border-t border-white/10 rounded-t-[3rem] p-8 pb-12 z-[101] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tight">System Input</h2>
                <p className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">Neural Command Center</p>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ActionButton 
                icon={<Camera className="text-cyan-400" />} 
                title="Sensing Scan" 
                subtitle="Camera PPG / Vitals"
                onClick={() => onAction('measure')}
                primary
              />
              <ActionButton 
                icon={<Cpu className="text-purple-400" />} 
                title="IoT Sync" 
                subtitle="Connect BLE Sensors"
                onClick={() => onAction('iot')}
              />
              <ActionButton 
                icon={<Smile className="text-yellow-400" />} 
                title="Mood Log" 
                subtitle="Neural Feedback"
                onClick={() => onAction('mood')}
              />
              <ActionButton 
                icon={<Droplets className="text-blue-400" />} 
                title="Fluid Sync" 
                subtitle="Hydration Level"
                onClick={() => onAction('water')}
              />
              <ActionButton 
                icon={<FileText className="text-pink-400" />} 
                title="MedScan AI" 
                subtitle="OCR Lab Reports"
                onClick={() => onAction('ocr')}
              />
              <ActionButton 
                icon={<Thermometer className="text-orange-400" />} 
                title="Log Temperature" 
                subtitle="Manual Calibration"
                onClick={() => onAction('temp')}
              />
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-gray-700 text-[10px] font-black uppercase tracking-widest">
                <Shield size={12} /> SECURE BIOMETRIC CHANNEL
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ActionButton = ({ icon, title, subtitle, onClick, primary = false }) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-5 rounded-3xl border text-left flex flex-col gap-3 transition-all ${
      primary ? 'bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'bg-white/[0.02] border-white/5'
    }`}
  >
    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-sm tracking-tight">{title}</h4>
      <p className="text-[9px] text-gray-500 uppercase font-black tracking-wider mt-1">{subtitle}</p>
    </div>
  </motion.button>
);

export default QuickActionMenu;
