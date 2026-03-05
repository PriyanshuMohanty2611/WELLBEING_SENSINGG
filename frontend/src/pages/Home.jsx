import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Activity, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-primary/40 blur-3xl rounded-full"></div>
        <div className="relative bg-gradient-to-br from-primary to-green-400 p-6 rounded-3xl shadow-2xl rotate-3 transform hover:rotate-0 transition-all duration-500">
             <Heart className="w-20 h-20 text-white fill-current animate-pulse" />
             <div className="absolute top-0 right-0 p-1 bg-yellow-400 rounded-full border-2 border-white translate-x-1/3 -translate-y-1/3">
                <Activity className="w-4 h-4 text-black" />
             </div>
        </div>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-bold mb-2 tracking-tight"
      >
        Vital<span className="text-primary">Sync</span>
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-300 text-lg mb-12 max-w-md mx-auto"
      >
        Your personal health companion. Monitor your vitals with just your camera.
      </motion.p>

      <motion.div
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.4 }}
      >
          <Link to="/scan" className="group relative px-8 py-4 bg-primary text-black font-bold rounded-full text-lg overflow-hidden shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:shadow-[0_0_40px_rgba(0,212,255,0.7)] transition-all transform hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              Get Started <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 flex gap-8"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
            <div className="p-3 bg-white/5 rounded-xl"><Shield className="w-6 h-6" /></div>
            <span className="text-sm">Secure</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-gray-400">
            <div className="p-3 bg-white/5 rounded-xl"><Activity className="w-6 h-6" /></div>
            <span className="text-sm">AI-Powered</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-gray-400">
            <div className="p-3 bg-white/5 rounded-xl"><Heart className="w-6 h-6" /></div>
            <span className="text-sm">Real-time</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
