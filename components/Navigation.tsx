'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';

// Mega Menu Data Structure
const navigationData = {
  Company: {
    main: [
      { name: 'About Us', desc: 'Our mission and values', href: '#' },
      { name: 'Careers', desc: 'Join our team', href: '#' },
      { name: 'Press', desc: 'Latest news', href: '#' },
      { name: 'Contact', desc: 'Get in touch', href: '#' },
    ],
    featured: {
      title: 'Our Story',
      desc: 'Building the modern infrastructure for capital markets.',
      image: '🏢'
    }
  },
  Insights: {
    main: [
      { name: 'Market Analysis', desc: 'Daily market updates', href: '#' },
      { name: 'Blog', desc: 'Engineering & Product', href: '#' },
      { name: 'Case Studies', desc: 'Client success stories', href: '#' },
    ],
    featured: {
      title: 'Latest Report',
      desc: 'Q4 2024 Market Outlook for Prime Brokerage.',
      image: '📈'
    }
  },
  Clients: {
    main: [
      { name: 'Hedge Funds', desc: 'Scale your strategy', href: '#' },
      { name: 'Family Offices', desc: 'Preserve and grow wealth', href: '#' },
      { name: 'Prop Traders', desc: 'Low latency execution', href: '#' },
      { name: 'Broker-Dealers', desc: 'Clearing & Custody', href: '#' },
    ],
    featured: {
      title: 'Success Stories',
      desc: 'How we helped a $5B fund scale their operations.',
      image: '🤝'
    }
  },
  Services: {
    main: [
      { name: 'Prime Brokerage', desc: 'Financing & Lending', href: '#' },
      { name: 'Clearing', desc: 'Real-time settlement', href: '#' },
      { name: 'Execution', desc: 'Algorithmic trading', href: '#' },
      { name: 'Custody', desc: 'Secure asset protection', href: '#' },
    ],
    featured: {
      title: 'Technology',
      desc: 'Explore our API-first platform documentation.',
      image: '⚡'
    }
  },
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMouseLeave = () => {
    // Logic if needed in future
  };

  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    // Determine direction
    const direction = latest > lastScrollY.current ? "down" : "up";
    
    // Logic: 
    // If scrolling DOWN and past threshold (e.g., 50px), hide navbar
    // If scrolling UP, show navbar
    // Always show at very top (< 20px)
    if (latest < 20) {
       setVisible(true);
    } else if (direction === "down") {
       setVisible(false);
    } else {
       setVisible(true);
    }
    
    lastScrollY.current = latest;
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      animate={visible ? "visible" : "hidden"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-full w-[85%] max-w-5xl transition-all duration-300" 
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-16 h-14 flex items-center justify-between gap-8">
        {/* Logo Text Only */}
        <Link href="/" className="flex items-center group">
          <span className="text-[#1a1666] font-bold text-xl tracking-tight group-hover:text-[#2E21DE] transition-colors">
            PrimeFX
          </span>
        </Link>
        {/* Logo */}


        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          {Object.keys(navigationData).map((item) => (
            <div
              key={item}
              className="relative h-full flex items-center"
            >
              <button
                className="text-[15px] font-medium text-gray-600 hover:text-[#2E21DE] transition-colors flex items-center gap-1"
              >
                {item}
              </button>
            </div>
          ))}
          <Link href="/studio" className="text-[15px] font-medium text-gray-600 hover:text-[#2E21DE]">
            PrimeFX Studio
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-[#2E21DE] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <Link 
            href="/login"
            className="px-5 py-2.5 text-[#2E21DE] font-semibold border border-[#2E21DE]/20 rounded-full hover:bg-[#2E21DE]/5 transition-colors text-sm"
          >
            Login
          </Link>
          

        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}
