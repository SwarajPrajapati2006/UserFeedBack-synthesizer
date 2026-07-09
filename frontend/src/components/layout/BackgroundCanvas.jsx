import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundCanvas = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(247,243,232,0.12),transparent_34%),linear-gradient(135deg,rgba(37,99,235,0.15),transparent_42%,rgba(96,165,250,0.12))]" />
      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, 35, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-14%] left-[-12%] h-[48vw] w-[48vw] rounded-full bg-brandBlue/20 blur-[130px]"
      />
      <motion.div
        animate={{
          x: [0, -55, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-22%] right-[-10%] h-[58vw] w-[58vw] rounded-full bg-brandPurple/18 blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, 32, 0],
          y: [0, -42, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[22%] left-[58%] h-[34vw] w-[34vw] rounded-full bg-cyan-400/14 blur-[110px]"
      />
    </div>
  );
};
