'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
}

export default function TextReveal({ text, className = "", as: Component = "span", delay = 0 }: TextRevealProps) {
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <Component style={{ display: 'flex', flexWrap: 'wrap' }}>
        {characters.map((char, index) => (
          <motion.span 
            variants={child} 
            key={index}
            style={{ 
              display: 'inline-block',
              whiteSpace: 'pre',
            }}
          >
            {char}
          </motion.span>
        ))}
      </Component>
    </motion.div>
  );
}
