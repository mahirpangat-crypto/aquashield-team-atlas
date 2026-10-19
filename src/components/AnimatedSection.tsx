import React from 'react';
import { motion } from 'motion/react';

interface AnimatedSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ id, children, className = '' }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`scroll-mt-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};
