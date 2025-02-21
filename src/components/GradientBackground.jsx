import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const GradientContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  opacity: 1;
  pointer-events: none;
  mix-blend-mode: normal;
  background: rgba(255, 255, 255, 0.95);
`;

const GradientBlob = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(${props => props.blur}px);
  mix-blend-mode: multiply;
  transition: transform 0.3s ease-out;
`;

const gradients = [
  {
    color: 'rgba(64, 123, 255, 0.35)',
    size: 600,
    x: '20%',
    y: '20%',
    blur: 80,
    speed: 0.3,
  },
  {
    color: 'rgba(238, 99, 82, 0.4)',
    size: 800,
    x: '70%',
    y: '15%',
    blur: 100,
    speed: 0.2,
  },
  {
    color: 'rgba(106, 76, 219, 0.35)',
    size: 500,
    x: '80%',
    y: '60%',
    blur: 70,
    speed: 0.4,
  },
  {
    color: 'rgba(0, 184, 148, 0.35)',
    size: 700,
    x: '10%',
    y: '70%',
    blur: 90,
    speed: 0.25,
  },
];

const GradientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateDistance = (x1, y1, x2, y2) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTransform = (gradient, mouseX, mouseY) => {
    const baseX = parseFloat(gradient.x);
    const baseY = parseFloat(gradient.y);
    
    // Расстояние от курсора до центра градиента
    const distance = calculateDistance(mouseX, mouseY, baseX, baseY);
    const maxDistance = 50; // Максимальное расстояние влияния
    const influence = Math.max(0, 1 - distance / maxDistance);
    
    // Направление от курсора
    const angleX = (mouseX - baseX) * gradient.speed * influence * -1;
    const angleY = (mouseY - baseY) * gradient.speed * influence * -1;
    
    // Масштабирование при приближении курсора
    const scale = 1 + influence * 0.2;
    
    return {
      x: angleX,
      y: angleY,
      scale,
    };
  };

  return (
    <GradientContainer>
      {gradients.map((gradient, index) => (
        <GradientBlob
          key={index}
          size={gradient.size}
          color={gradient.color}
          blur={gradient.blur}
          initial={{
            x: gradient.x,
            y: gradient.y,
            scale: 1,
          }}
          animate={{
            ...getTransform(gradient, mousePosition.x, mousePosition.y),
            x: `calc(${gradient.x} + ${getTransform(gradient, mousePosition.x, mousePosition.y).x}px)`,
            y: `calc(${gradient.y} + ${getTransform(gradient, mousePosition.x, mousePosition.y).y}px)`,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1,
          }}
        />
      ))}
    </GradientContainer>
  );
};

export default GradientBackground; 