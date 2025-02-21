import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  transform-origin: 0%;
  z-index: 1001;
`;

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 0.9rem;

  &::before {
    content: '%';
    position: absolute;
    font-size: 0.7rem;
    top: 15px;
    right: 15px;
  }
`;

const ScrollProgress = () => {
  const [showScroll, setShowScroll] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <ProgressBar style={{ scaleX }} />
      <ScrollIndicator
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScroll ? 1 : 0,
          scale: showScroll ? 1 : 0,
          y: showScroll ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {Math.round(scrollYProgress.get() * 100)}
      </ScrollIndicator>
    </>
  );
};

export default ScrollProgress; 