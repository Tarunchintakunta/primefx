'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSection {
  title: string;
  description: string;
  highlight: string;
  image: string;
}

const scrollSections: ScrollSection[] = [
  {
    title: 'Zero Spreads',
    description: 'Trade major forex pairs with zero spreads during peak liquidity hours. Our institutional-grade pricing ensures you get the tightest spreads in the market.',
    highlight: '0.0 pips',
    image: '/charts/spreads.svg',
  },
  {
    title: '1:500 Leverage',
    description: 'Maximize your trading potential with leverage up to 1:500. Control larger positions with smaller capital while maintaining strict risk management protocols.',
    highlight: '1:500',
    image: '/charts/leverage.svg',
  },
  {
    title: 'Instant Execution',
    description: 'Experience lightning-fast order execution with our co-located servers. Average execution time under 10ms ensures you never miss a trading opportunity.',
    highlight: '<10ms',
    image: '/charts/execution.svg',
  },
  {
    title: 'MT5 Platform',
    description: 'Access advanced charting, algorithmic trading, and multi-asset capabilities on MetaTrader 5. Plus cTrader for ECN-style trading with Level II pricing.',
    highlight: 'MT5 & cTrader',
    image: '/charts/platforms.svg',
  },
];

export default function ScrollyTelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate which section is active based on scroll
  const sectionProgress = useTransform(scrollYProgress, [0, 1], [0, scrollSections.length]);

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column - Sticky Visual Element */}
            <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
              {scrollSections.map((section, index) => {
                const sectionStart = index / scrollSections.length;
                const sectionEnd = (index + 1) / scrollSections.length;
                
                const opacity = useTransform(
                  scrollYProgress,
                  [sectionStart, sectionStart + 0.05, sectionEnd - 0.05, sectionEnd],
                  [0, 1, 1, 0]
                );
                
                const scale = useTransform(
                  scrollYProgress,
                  [sectionStart, sectionStart + 0.05, sectionEnd - 0.05, sectionEnd],
                  [0.8, 1, 1, 0.8]
                );

                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity, scale }}
                  >
                    <div className="glass-card p-8 lg:p-12 rounded-3xl w-full max-w-md">
                      <div className="text-center">
                        <div className="text-7xl lg:text-8xl font-bold gradient-text mb-6">
                          {section.highlight}
                        </div>
                        <div className="text-2xl lg:text-3xl font-semibold text-white mb-4">
                          {section.title}
                        </div>
                        
                        {/* Visual representation */}
                        <div className="mt-8 h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                          <div className="text-6xl">📊</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column - Scrolling Content */}
            <div className="space-y-[100vh] py-[50vh]">
              {scrollSections.map((section, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-8 lg:p-10 rounded-3xl"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, margin: '-20%' }}
                >
                  <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-sm font-semibold text-purple-300 mb-4">
                    Feature {index + 1}
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    {section.title}
                  </h3>
                  
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {section.description}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    <div className="text-sm font-semibold text-purple-400">
                      {section.highlight}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
