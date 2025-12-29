'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function InfrastructureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background Video/Image Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E21DE] via-transparent to-[#2E21DE]" />
      </div>

      <motion.div 
        className="relative z-10 section-container"
        style={{ opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              {/* Tech Stack Grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '☁️', label: 'Cloud' }, { icon: '⚡', label: 'Fast' }, { icon: '🛡️', label: 'Secure' },
                  { icon: '🔒', label: 'Auth' }, { icon: '📊', label: 'Data' }, { icon: '🔄', label: 'Sync' },
                  { icon: '📱', label: 'Mobile' }, { icon: '💻', label: 'Web' }, { icon: '🔌', label: 'API' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="aspect-square bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs text-white/60 font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Animated shimmer */}
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-white/50 uppercase tracking-wider text-sm mb-4">
              Modern Infrastructure
            </p>
            
            <h2 className="heading-lg text-white mb-6">
              Built for Today&apos;s Markets
            </h2>
            
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              While legacy systems struggle with outdated technology, we&apos;ve built our 
              infrastructure from the ground up using modern cloud architecture, 
              real-time data processing, and institutional-grade security.
            </p>

            <div className="space-y-4">
              {['Cloud-Native Architecture', 'Real-Time Processing', 'Zero-Trust Security'].map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
