'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const products = [
  'Forex',
  'Metals',
  'Shares',
  'Indices',
  'Commodities',
  'Digital Assets'
];

export default function OurProducts() {
  const [activeTab, setActiveTab] = useState('Forex');

  return (
    <section className="relative z-10 py-12">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Label */}
          <span className="text-[#22D3EE] font-bold tracking-wider text-sm mb-4 uppercase">
            Our Products
          </span>
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trade our top performing products
          </h2>
          
          {/* Description */}
          <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-3xl">
            Confidently trade with PrimeFX&apos;s cutting-edge trading platforms offering 
            groundbreaking levels of stability and reliability. Subscribe and execute 
            on the tightest pricing and liquidity from top-tier Banks and Prime Brokers.
          </p>
          
          {/* Product Tabs/Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {products.map((product) => (
              <button
                key={product}
                onClick={() => setActiveTab(product)}
                className={`
                  px-8 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 tracking-wide
                  ${activeTab === product 
                    ? 'bg-white text-[#2E21DE] shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-105 z-10' 
                    : 'bg-[#0a0a2e]/40 text-white/80 hover:bg-[#0a0a2e]/60 hover:text-white border border-white/10 backdrop-blur-sm hover:border-white/30'}
                `}
              >
                {product}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
