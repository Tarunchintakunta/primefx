'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Execution',
    description: 'Algorithmic trading and smart order routing.',
    icon: '⚡',
  },
  {
    title: 'Financing',
    description: 'Flexible leverage and securities lending solutions.',
    icon: '💰',
  },
];

export default function ServicesGrid() {
  return (
    <section className="w-full py-24 relative z-20 bg-[#2E21DE]">
      <div className="section-container">
        <div className="mb-20 text-center lg:text-left">
          <h2 className="heading-lg text-white mb-6">What We Do</h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
            A modern approach to prime brokerage, built from the ground up to serve the needs of today's investors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* Main Large Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clients Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-[2rem] flex flex-col justify-between min-h-[420px] hover:bg-white/5 transition-all duration-300 border border-white/10 relative overflow-hidden group"
            >
              {/* Background Decoration */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                 <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.22-7.52-1.72 1.72-7.52 3.22 7.52z"/></svg>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Clients</h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  We serve sophisticated investors including hedge funds, registered investment advisors, family offices, and broker-dealers.
                </p>
              </div>
              <div className="relative z-10 flex items-center text-white/80 hover:text-white cursor-pointer transition-colors font-medium">
                <span className="text-base">Learn more</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </motion.div>

            {/* Services Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-10 rounded-[2rem] flex flex-col justify-between min-h-[420px] hover:bg-white/5 transition-all duration-300 border border-white/10 relative overflow-hidden group"
            >
              {/* Background Decoration */}
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#2E21DE]/30 rounded-full blur-3xl group-hover:bg-[#2E21DE]/40 transition-colors" />
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 scale-150">
                 <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Services</h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Full-service prime brokerage, clearing, custody, and execution services built on modern technology.
                </p>
              </div>
              <div className="relative z-10 flex items-center text-white/80 hover:text-white cursor-pointer transition-colors font-medium">
                <span className="text-base">Learn more</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </motion.div>
          </div>

          {/* Right Column Stack */}
          <div className="flex flex-col gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-[2rem] flex-1 flex flex-col justify-center hover:bg-white/5 transition-all duration-300 border border-white/10 relative overflow-hidden group"
              >
                 <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/3 translate-y-1/3 scale-150 text-9xl">
                    {service.icon}
                 </div>
                 
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl border border-white/5">
                    {service.icon}
                  </div>
                  <div className="p-2 rounded-full border border-white/20 text-white/40 group-hover:text-white/80 transition-colors">
                    <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
                <h3 className="relative z-10 text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="relative z-10 text-white/70 text-base leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
