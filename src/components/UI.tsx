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
      transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
      className={cn(
        "glass-card p-10 rounded-[2rem] transition-all duration-700 group",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const GoldButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'obsidian';
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className, onClick }) => {
  const variants = {
    primary: "gold-gradient text-white shadow-[0_10px_30px_-10px_rgba(184,141,41,0.3)] hover:shadow-[0_15px_35px_-10px_rgba(184,141,41,0.4)]",
    secondary: "bg-white text-slate-900 border border-gold-100 hover:border-gold-300",
    outline: "border border-gold-400/30 text-gold-700 hover:border-gold-500 hover:bg-gold-50/30",
    obsidian: "bg-obsidian text-gold-100 border border-gold-500/20 hover:border-gold-500/50 shadow-2xl"
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "px-10 py-4 rounded-full font-medium tracking-wide transition-all duration-300 text-sm uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
};
