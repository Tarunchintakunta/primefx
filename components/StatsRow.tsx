'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { prefix: '', value: 500, suffix: 'M+', label: 'Shares/Day' },
  { prefix: '$', value: 15, suffix: 'B+', label: 'Notional/Day' },
  { prefix: '', value: 300, suffix: '%', label: 'YoY Growth' },
  { prefix: '$', value: 2, suffix: 'B+', label: 'Capital Raised' },
];

function Counter({ value, duration }: { value: number; duration: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {

      const end = value;
      const totalFrames = Math.round(duration * 60);
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(end * progress);
        
        if (frame === totalFrames) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(currentCount);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [value, duration, inView]);

  return <span ref={nodeRef}>{count}</span>;
}

export default function StatsRow() {
  const ref = useRef(null);

  return (
    <div ref={ref} className="w-full py-12 relative z-20">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <div className="glass-card p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 backdrop-blur-md border border-white/10">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tighter">
                    {stat.prefix}
                    <Counter value={stat.value} duration={2} />
                    {stat.suffix}
                  </div>
                  <div className="text-xs md:text-sm font-bold text-white/60 uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
