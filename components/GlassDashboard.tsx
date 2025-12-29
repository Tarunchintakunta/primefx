'use client';

import { motion } from 'framer-motion';

interface DashboardCard {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  size: 'small' | 'medium' | 'large';
}

const dashboardData: DashboardCard[] = [
  {
    title: 'Total Equity',
    value: '$1,240,500',
    subtitle: 'Across all accounts',
    trend: '+12.5%',
    size: 'large',
  },
  {
    title: 'Active Platforms',
    value: 'MT5 & cTrader',
    subtitle: '2 platforms connected',
    size: 'medium',
  },
  {
    title: 'Open Positions',
    value: '14',
    subtitle: 'Total P&L: +$8,420',
    trend: '+$8,420',
    size: 'small',
  },
  {
    title: 'Available Margin',
    value: '$845,200',
    subtitle: 'Free margin for trading',
    size: 'medium',
  },
];

const recentWithdrawals = [
  { date: '2024-12-28', amount: '$50,000', status: 'Completed', method: 'Wire Transfer' },
  { date: '2024-12-25', amount: '$25,000', status: 'Completed', method: 'Crypto (USDT)' },
  { date: '2024-12-20', amount: '$100,000', status: 'Processing', method: 'Wire Transfer' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};


export default function GlassDashboard() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="section-container">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="gradient-text mb-6">
            Your Trading Dashboard
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time overview of your forex trading portfolio with institutional-grade analytics
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {dashboardData.map((card, index) => (
            <motion.div
              key={index}
              className={`glass-card p-6 lg:p-8 rounded-3xl group hover:bg-white/10 transition-all duration-300 cursor-pointer
                ${card.size === 'large' ? 'md:col-span-2' : ''}
                ${card.size === 'medium' ? 'md:col-span-1' : ''}
              `}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex flex-col h-full">
                <div className="text-sm font-medium text-gray-400 mb-3">
                  {card.title}
                </div>
                
                <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                  {card.value}
                </div>
                
                <div className="text-sm text-gray-400 mb-4">
                  {card.subtitle}
                </div>
                
                {card.trend && (
                  <div className="mt-auto">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold
                      ${card.trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                    `}>
                      <span>{card.trend.startsWith('+') ? '↗' : '↘'}</span>
                      <span>{card.trend}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Latest Withdrawals Table */}
        <motion.div
          className="glass-card p-6 lg:p-8 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Latest Withdrawals</h3>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-semibold">
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Method</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentWithdrawals.map((withdrawal, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="py-4 px-4 text-gray-300">{withdrawal.date}</td>
                    <td className="py-4 px-4 text-white font-semibold">{withdrawal.amount}</td>
                    <td className="py-4 px-4 text-gray-300">{withdrawal.method}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                        ${withdrawal.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                      `}>
                        {withdrawal.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
