// Separate framer-motion imports
export { motion, AnimatePresence } from 'framer-motion';
export type { Variants } from 'framer-motion';

export const defaultTransition = {
  duration: 0.5,
  ease: [0.165, 0.84, 0.44, 1]
};

export const defaultAnimations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}; 