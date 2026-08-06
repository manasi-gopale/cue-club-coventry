import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      setTimeout(() => {
        onComplete?.();
      }, 700);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="loader__logo"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="loader__icon">CC</div>

            <h1>Cue Club</h1>

            <p>Precision • Atmosphere • Excellence</p>
          </motion.div>

          <div className="loader__bar">
            <motion.div
              className="loader__progress"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}