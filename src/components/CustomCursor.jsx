import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
`;

const Cursor = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CursorDot = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
`;

const CursorRing = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 32px;
  height: 32px;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(1px);
`;

const CursorHighlight = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 48px;
  height: 48px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: ${props => props.isHovering ? 1 : 0};
  transition: opacity 0.2s ease;
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
          e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <CursorWrapper
      style={{
        x: mousePosition.x,
        y: mousePosition.y
      }}
    >
      <Cursor>
        <CursorHighlight isHovering={isHovering} />
        <CursorDot
          animate={{
            scale: isHovering ? 1.8 : 1,
            opacity: isHovering ? 0.9 : 1
          }}
          transition={{
            duration: 0.1,
            ease: "linear"
          }}
        />
        <CursorRing
          animate={{
            scale: isHovering ? 1.4 : 1,
            opacity: isHovering ? 0.5 : 0.8,
            borderColor: isHovering ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)'
          }}
          transition={{
            duration: 0.1,
            ease: "linear"
          }}
        />
      </Cursor>
    </CursorWrapper>
  );
};

export default CustomCursor; 