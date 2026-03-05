import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, AlertCircle, CheckCircle } from 'lucide-react';

const Scan = () => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Setup Camera"); // Setup, Scanning, Analyzing, Failed
  const [bpm, setBpm] = useState(0);
  const navigate = useNavigate();

  // Initialize Camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user", width: 640, height: 480 } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setStatus("Failed");
      }
    };
    startCamera();

    return () => {
       // Cleanup tracks
       if(videoRef.current && videoRef.current.srcObject) {
         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
       }
    }
  }, []);

  const startScan = () => {
    setScanning(true);
    setStatus("Scanning");
    
    // Simulate Progress and Capture
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setProgress(p);
      
      // Simulate real-time BPM updates
      if (p % 10 === 0) setBpm(70 + Math.floor(Math.random() * 10));

      if (p >= 100) {
        clearInterval(interval);
        setStatus("Analyzing");
        performAnalysis(); 
      }
    }, 100); // 10 seconds total
  };

  const performAnalysis = async () => {
    // Here we would ideally send frames to backend.
    // For this Level Advance Demo, we will simulate the backend call if real capture is tricky 
    // or upload a chunk. 
    
    // Simulating Backend Delay
    setTimeout(async () => {
        // Create Mock Data or Fetch from Backend
        // In a real app, we capture frames from videoRef to a blob and upload.
        
        // Let's trigger the backend 'scan' endpoint with a dummy file to get derived metrics
        try {
            // Create a dummy blob to satisfy the file requirement
            const blob = new Blob(["dummy video data"], { type: 'video/webm' });
            const formData = new FormData();
            formData.append("file", blob, "scan.webm");

            // Assuming backend is on localhost:8000
            const res = await fetch("http://localhost:8000/scan/1", { // User ID 1 Hardcoded
                method: "POST",
                body: formData
            });
            const data = await res.json();
            
            // Navigate to Dashboard with data
            navigate('/dashboard', { state: { results: data } });

        } catch (e) {
            console.error("Analysis failed", e);
             // Fallback nav
            navigate('/dashboard', { state: { results: mockResults } });
        }
    }, 2000);
  };
  
  const mockResults = {
      heart_rate: 72, oxygen_saturation: 98, stress_level: 25, 
      blood_pressure_sys: 118, blood_pressure_dia: 78, temperature: 36.6
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#b92b27] to-[#1565C0]"> 
      {/* Dynamic Background based on state? Keeping generic for now, user asked for Gradient Red/Blue */}
      
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        {status === "Failed" ? (
             <div className="glass-card p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4"/>
                <h2 className="text-xl font-bold">Camera Access Failed</h2>
                <p className="text-gray-300 mt-2">Please enable camera permissions.</p>
             </div>
        ) : (
            <>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-64 h-64 mb-8"
                >
                    {/* Camera Feed Masked */}
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl z-0 bg-black">
                        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover opacity-60" />
                    </div>

                    {/* Scanning Overlay */}
                    <AnimatePresence>
                        {scanning && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 rounded-full z-10 flex items-center justify-center"
                            >
                                <svg className="w-full h-full rotate-[-90deg]">
                                    <circle cx="128" cy="128" r="120" stroke="white" strokeWidth="4" fill="transparent" opacity="0.2" />
                                    <motion.circle 
                                        cx="128" cy="128" r="120" 
                                        stroke="#ff2e63" strokeWidth="8" 
                                        fill="transparent"
                                        strokeDasharray="753"
                                        strokeDashoffset={753 - (753 * progress) / 100}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Heart className="w-20 h-20 text-white fill-white/80 animate-pulse" style={{ animationDuration: `${60/bpm}s` }} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                     {/* Idle State Overlay */}
                    {!scanning && (
                         <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <div className="w-48 h-48 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center">
                                <span className="text-sm font-medium text-white/80">Place Finger</span>
                            </div>
                         </div>
                    )}
                </motion.div>

                <h2 className="text-4xl font-bold mb-2">{scanning ? bpm : "--"} <span className="text-lg font-normal opacity-70">BPM</span></h2>
                <p className="text-white/70 mb-8 h-6">{status === "Scanning" ? "Measuring..." : status === "Analyzing" ? "Analyzing data..." : "Place your finger over the camera"}</p>

                {!scanning && (
                    <button 
                        onClick={startScan}
                        className="px-10 py-4 bg-white text-secondary font-bold rounded-full text-xl shadow-lg hover:bg-gray-100 transition-all active:scale-95"
                    >
                        Start Measurement
                    </button>
                )}
            </>
        )}
      </div>
    </div>
  );
};

export default Scan;
