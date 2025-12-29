'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const products = ['Forex', 'Metals', 'Indices'];

export default function OurProducts() {
  const [activeTab, setActiveTab] = useState('Forex');

  return (
    <section className="relative z-10 py-20 md:py-32">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Label */}
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#22D3EE] font-semibold tracking-wider text-xs md:text-sm mb-6 uppercase"
          >
            OUR PRODUCTS
          </motion.span>
          
          {/* Main Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Trade our top performing products
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/70 text-base md:text-lg leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Confidently trade with PrimeFX&apos;s cutting-edge trading platforms offering 
            groundbreaking levels of stability and reliability. Subscribe and execute 
            on the tightest pricing and liquidity from top-tier Banks and Prime Brokers.
          </motion.p>
          
          {/* Product Tabs/Buttons - Centered */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center items-center gap-3 md:gap-4"
          >
            {products.map((product, index) => (
              <motion.button
                key={product}
                onClick={() => setActiveTab(product)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base 
                  transition-all duration-300 tracking-wide whitespace-nowrap
                  ${activeTab === product 
                    ? 'bg-white text-[#2E21DE] shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                    : 'bg-white/5 text-white/90 hover:bg-white/10 hover:text-white border border-white/20 backdrop-blur-sm'}
                `}
              >
                {product}
                {activeTab === product && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-white -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
