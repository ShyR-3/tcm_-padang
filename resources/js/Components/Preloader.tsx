import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
        
        if (!hasSeenPreloader) {
            setIsVisible(true);
            const timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        sessionStorage.setItem('hasSeenPreloader', 'true');
                        setTimeout(() => setIsVisible(false), 500);
                        return 100;
                    }
                    return prev + 3;
                });
            }, 25);
            return () => clearInterval(timer);
        }
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.22, 0.84, 0.38, 1] }}
                    className="fixed inset-0 z-[100] bg-[#0f2419] flex flex-col items-center justify-center"
                >
                    <motion.img
                        src="/images/logo-tcm.webp"
                        alt="TCM Padang Logo"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain mb-8"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 200 }}
                        transition={{ duration: 1, ease: [0.22, 0.84, 0.38, 1] }}
                        className="h-px bg-[#c9a961] mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-[#faf8f3] text-xs tracking-[0.4em] uppercase mb-8"
                    >
                        TCM Premium Experience
                    </motion.p>
                    <div className="w-48 h-px bg-[#1a3d2e] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#c9a961]"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}