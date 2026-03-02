import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const LuxuryCard: React.FC<CardProps> = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={cn(
        "bg-white p-8 rounded-2xl border border-gold-100/50 shadow-sm hover:shadow-xl hover:border-gold-200 transition-all duration-500",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const GoldButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className, onClick }) => {
  const variants = {
    primary: "bg-gold-500 text-white hover:bg-gold-600 shadow-lg shadow-gold-500/20",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border-2 border-gold-500 text-gold-600 hover:bg-gold-50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "px-8 py-4 rounded-full font-semibold transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
};
