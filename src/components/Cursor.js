import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Cursor = ({ position }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.left = `${position.x}px`;
      cursor.style.top = `${position.y}px`;
    }
  }, [position]);

  return (
    <motion.div
      ref={cursorRef}
      className="cursor-follow"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default Cursor;
