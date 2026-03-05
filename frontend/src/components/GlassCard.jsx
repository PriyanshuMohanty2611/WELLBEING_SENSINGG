import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-6 shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
