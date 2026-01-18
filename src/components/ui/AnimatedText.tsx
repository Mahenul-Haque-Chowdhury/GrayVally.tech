"use client";

import { motion, Variants } from 'framer-motion';
import type { ComponentType } from 'react';

type AnimatedTextTag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: AnimatedTextTag;
}

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: i * 0.2 },
  }),
};

const characterVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
};

export function AnimatedText({ text, className, tag = 'h1' }: AnimatedTextProps) {
  const words = text.split(' ').map((word) => [...word, '\u00A0']); // Add a non-breaking space after each word
  const MotionComponent = (motion as unknown as Record<string, ComponentType<any>>)[tag];

  return (
    <MotionComponent
      className={className}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={characterVariant}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionComponent>
  );
}
