'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeleprompterProps {
    talkingPoints: string[];
    productTitle: string;
}

export default function Teleprompter({ talkingPoints, productTitle }: TeleprompterProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll the teleprompter every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % talkingPoints.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [talkingPoints]);

    // Reset index when product changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [productTitle]);

    return (
        <div className="bg-black/80 border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">AI Teleprompter</h3>
                <span className="text-xs text-gray-500">Live Assist</span>
            </div>

            <div className="h-32 relative overflow-hidden flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={productTitle + currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-full"
                    >
                        <p className="text-2xl font-medium text-white leading-relaxed">
                            "{talkingPoints[currentIndex]}"
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-4 flex justify-center gap-1">
                {talkingPoints.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-700'}`}
                    />
                ))}
            </div>
        </div>
    );
}
