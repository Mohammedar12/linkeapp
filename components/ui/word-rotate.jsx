"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function WordRotateWithFlip({
  words = [], // Provide a default empty array
  duration = 2500,
  charDuration = 0.5,
  charDelayMultiple = 0.08,
  wordFramerProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  charFramerProps = {
    hidden: { rotateX: -120, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length === 0) return; // Don't set up interval if words is empty

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  if (words.length === 0) {
    return null; // Or return a placeholder component
  }

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          className={cn("flex justify-center", className)}
          {...wordFramerProps}
        >
          {words[index].split("").map((char, i) => (
            <motion.h1
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={charFramerProps}
              transition={{
                duration: charDuration,
                delay: i * charDelayMultiple,
              }}
              className="origin-center drop-shadow-sm text-3xl xs:text-xl font-medium"
            >
              {char}
            </motion.h1>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
