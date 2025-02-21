import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ScrollbarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 12px;
  padding: 2px;
  z-index: 1000;
`;

const ScrollTrack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  backdrop-filter: blur(5px);
`;

const ScrollThumb = styled(motion.div)`
  position: absolute;
  width: 8px;
  border-radius: 4px;
  background: linear-gradient(
    180deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1 !important;
    width: 10px;
  }

  ${ScrollbarContainer}:hover & {
    opacity: 0.8;
  }
`;

const CustomScrollbar = () => {
  const location = useLocation();
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollStartTop, setScrollStartTop] = useState(0);
  const thumbRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (location.pathname === '/') return;

    const updateThumbPosition = () => {
      if (!trackRef.current) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackHeight = trackRef.current.clientHeight;
      
      const newThumbHeight = Math.max(
        40,
        (windowHeight / documentHeight) * trackHeight
      );
      setThumbHeight(newThumbHeight);

      const scrollProgress = scrollTop / (documentHeight - windowHeight);
      const newThumbTop = scrollProgress * (trackHeight - newThumbHeight);
      setThumbTop(newThumbTop);
    };

    updateThumbPosition();
    window.addEventListener('scroll', updateThumbPosition);
    window.addEventListener('resize', updateThumbPosition);

    return () => {
      window.removeEventListener('scroll', updateThumbPosition);
      window.removeEventListener('resize', updateThumbPosition);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/') return;

    const handleMouseMove = (e) => {
      if (!isDragging || !trackRef.current) return;

      const deltaY = e.clientY - startY;
      const trackHeight = trackRef.current.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const newThumbTop = Math.max(
        0,
        Math.min(trackHeight - thumbHeight, scrollStartTop + deltaY)
      );

      const scrollProgress = newThumbTop / (trackHeight - thumbHeight);
      window.scrollTo(0, scrollProgress * (documentHeight - windowHeight));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, scrollStartTop, thumbHeight, location.pathname]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollStartTop(thumbTop);
    document.body.style.userSelect = 'none';
  };

  if (location.pathname === '/') {
    return null;
  }

  return (
    <ScrollbarContainer>
      <ScrollTrack ref={trackRef}>
        <ScrollThumb
          ref={thumbRef}
          style={{ 
            height: thumbHeight,
            y: thumbTop
          }}
          onMouseDown={handleMouseDown}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isDragging 
              ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
              : '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        />
      </ScrollTrack>
    </ScrollbarContainer>
  );
};

export default CustomScrollbar; 