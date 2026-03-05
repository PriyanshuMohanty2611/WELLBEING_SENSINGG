import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Camera, Thermometer, Droplets, Smile, 
  FileText, Cpu, Activity, Zap, Shield, HeartPulse, BrainCircuit 
} from 'lucide-react';

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
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-xl z-[100]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 rounded-t-[3rem] p-8 pb-16 z-[101] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

            <div className="flex justify-between items-center mb-10 px-2">
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tight text-slate-900">Neural Registry</h2>
                <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">Select Integration Channel</p>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ActionButton 
                icon={<Camera className="text-cyan-600" />} 
                title="Sensing Scan" 
                subtitle="Camera PPG Capture"
                onClick={() => onAction('measure')}
                primary
              />
              <ActionButton 
                icon={<BrainCircuit className="text-purple-600" />} 
                title="Flow State" 
                subtitle="Somatic Calibration"
                onClick={() => onAction('mood')}
              />
              <ActionButton 
                icon={<Cpu className="text-indigo-600" />} 
                title="IoT Link" 
                subtitle="Sync BLE Nodes"
                onClick={() => onAction('iot')}
              />
              <ActionButton 
                icon={<Smile className="text-amber-500" />} 
                title="Mood Metric" 
                subtitle="Neural Feedback"
                onClick={() => onAction('mood')}
              />
              <ActionButton 
                icon={<Droplets className="text-blue-600" />} 
                title="Fluid Sync" 
                subtitle="Hydration Level"
                onClick={() => onAction('water')}
              />
              <ActionButton 
                icon={<FileText className="text-rose-500" />} 
                title="MedScan AI" 
                subtitle="OCR Lab Logic"
                onClick={() => onAction('ocr')}
              />
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">
                <Shield size={12} className="text-cyan-600" /> Bio-Metric Tunnel Encrypted
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ActionButton = ({ icon, title, subtitle, onClick, primary = false }) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: primary ? "#f1f5f9" : "#fff" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-5 rounded-[2.5rem] border text-left flex flex-col gap-3 transition-all ${
      primary ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-100 shadow-sm'
    }`}
  >
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-sm tracking-tight text-slate-800">{title}</h4>
      <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider mt-1">{subtitle}</p>
    </div>
  </motion.button>
);

export default QuickActionMenu;
