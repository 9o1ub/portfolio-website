import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const CardsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

const Card = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Icon = styled(motion.div)`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const Title = styled(motion.h3)`
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Description = styled(motion.p)`
  font-size: 1rem;
  color: #636e72;
  text-align: center;
  line-height: 1.6;
`;

const cards = [
  {
    icon: '💻',
    title: 'Веб-разработка',
    description: 'Создание современных и отзывчивых веб-приложений с использованием передовых технологий',
    position: { x: -350, y: 0, z: 0 }
  },
  {
    icon: '🎨',
    title: 'UI/UX Дизайн',
    description: 'Разработка интуитивных и привлекательных пользовательских интерфейсов',
    position: { x: 0, y: 0, z: 50 }
  },
  {
    icon: '📱',
    title: 'Мобильная разработка',
    description: 'Создание нативных и кроссплатформенных мобильных приложений',
    position: { x: 350, y: 0, z: 0 }
  }
];

const FloatingCards = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const calculateCardMovement = (cardPosition, mousePosition) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (mousePosition.x - centerX) / 50;
    const deltaY = (mousePosition.y - centerY) / 50;
    
    return {
      x: cardPosition.x + deltaX,
      y: cardPosition.y + deltaY,
      rotateX: -deltaY,
      rotateY: deltaX,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <CardsContainer>
      {cards.map((card, index) => (
        <Card
          key={index}
          initial={{ 
            opacity: 0,
            x: card.position.x,
            y: card.position.y + 100,
            z: card.position.z,
            rotateX: 0,
            rotateY: 0
          }}
          animate={{
            opacity: 1,
            x: calculateCardMovement(card.position, mousePosition).x,
            y: calculateCardMovement(card.position, mousePosition).y,
            z: card.position.z,
            rotateX: calculateCardMovement(card.position, mousePosition).rotateX,
            rotateY: calculateCardMovement(card.position, mousePosition).rotateY,
          }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 20,
            mass: 0.8,
          }}
          whileHover={{
            scale: 1.05,
            z: card.position.z + 50,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 * index }}
          >
            {card.icon}
          </Icon>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 * index }}
          >
            {card.title}
          </Title>
          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 * index }}
          >
            {card.description}
          </Description>
        </Card>
      ))}
    </CardsContainer>
  );
};

export default FloatingCards; 