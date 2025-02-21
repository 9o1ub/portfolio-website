import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PreloaderWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LogoWrapper = styled(motion.div)`
  position: relative;
  width: 100px;
  height: 100px;
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  border-top-color: transparent;
`;

const Dot = styled(motion.div)`
  position: absolute;
  width: 15px;
  height: 15px;
  background: var(--primary-color);
  border-radius: 50%;
  top: -7.5px;
  left: 50%;
  transform: translateX(-50%);
`;

const Text = styled(motion.div)`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  color: var(--primary-color);
  white-space: nowrap;
  font-weight: 500;
`;

const Preloader = ({ isLoading }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <PreloaderWrapper
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoWrapper>
            <Circle
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Dot />
            </Circle>
            <Text>
              Загрузка{dots}
            </Text>
          </LogoWrapper>
        </PreloaderWrapper>
      )}
    </AnimatePresence>
  );
};

export default Preloader; 