import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ExperienceTimeline from '../components/ExperienceTimeline';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`;

const BackgroundAnimation = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
`;

const Circle = styled(motion.div)`
  position: absolute;
  background: ${props => props.color};
  border-radius: 50%;
  opacity: 0.1;
`;

const FloatingImage = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  overflow: hidden;
  opacity: 0.15;
  background: ${props => props.color};
  mix-blend-mode: multiply;
  z-index: 0;
  filter: blur(50px);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const InfoSection = styled(motion.div)`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #636e72;
    margin-bottom: 1.5rem;
  }
`;

const SkillsSection = styled(motion.div)`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
`;

const SkillContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const Skill = styled(motion.div)`
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h4 {
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  .percentage {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
  }
`;

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const circles = [
    { size: 400, color: "#0984e3", x: -200, y: -200 },
    { size: 300, color: "#00b894", x: "80%", y: "60%" },
    { size: 200, color: "#6c5ce7", x: "60%", y: -100 },
  ];

  const floatingImages = [
    { 
      size: 600, 
      color: "rgba(64, 123, 255, 0.3)",
      x: "15%", 
      y: "20%", 
      rotateStart: -15,
      scale: 1,
      speed: 0.02
    },
    { 
      size: 800, 
      color: "rgba(238, 99, 82, 0.2)",
      x: "75%", 
      y: "15%", 
      rotateStart: 10,
      scale: 1.2,
      speed: 0.01
    },
    { 
      size: 500, 
      color: "rgba(106, 76, 219, 0.25)",
      x: "85%", 
      y: "60%", 
      rotateStart: -20,
      scale: 0.9,
      speed: 0.015
    }
  ];

  const calculatePosition = (basePosition, mousePosition, speed, isX = true) => {
    const base = parseFloat(basePosition) / 100 * (isX ? window.innerWidth : window.innerHeight);
    const mouseDelta = (isX ? mousePosition.x : mousePosition.y) - (isX ? window.innerWidth : window.innerHeight) / 2;
    const offset = Math.sin(Date.now() / 2000) * 30;
    return base + mouseDelta * speed + offset;
  };

  const skills = [
    { name: 'React', percentage: '90%' },
    { name: 'JavaScript', percentage: '95%' },
    { name: 'Node.js', percentage: '85%' },
    { name: 'TypeScript', percentage: '80%' },
    { name: 'Firebase', percentage: '85%' },
    { name: 'UI/UX', percentage: '75%' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <AboutContainer>
      <BackgroundAnimation
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2,
          ease: "easeInOut"
        }}
      >
        {circles.map((circle, index) => (
          <Circle
            key={index}
            color={circle.color}
            style={{
              width: circle.size,
              height: circle.size,
              left: circle.x,
              top: circle.y
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: index * 2
            }}
          />
        ))}
        {floatingImages.map((image, index) => (
          <FloatingImage
            key={index}
            size={image.size}
            color={image.color}
            initial={{ 
              x: calculatePosition(image.x, mousePosition, 0, true),
              y: calculatePosition(image.y, mousePosition, 0, false),
              scale: image.scale,
              rotate: image.rotateStart,
            }}
            animate={{ 
              x: calculatePosition(image.x, mousePosition, image.speed, true),
              y: calculatePosition(image.y, mousePosition, image.speed, false),
              rotate: [image.rotateStart, image.rotateStart + 5],
              scale: [image.scale, image.scale * 1.05]
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            <motion.div
              animate={{ 
                opacity: [0.6, 0.8],
                scale: [1, 1.1]
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror"
              }}
              style={{
                width: "100%",
                height: "100%",
                background: `radial-gradient(circle at center, ${image.color}, transparent)`
              }}
            />
          </FloatingImage>
        ))}
      </BackgroundAnimation>

      <Content>
        <InfoSection
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants}>Обо мне</motion.h2>
          <motion.p variants={itemVariants}>
            Я разработчик с более чем 5-летним опытом создания современных веб-приложений.
            Специализируюсь на frontend-разработке с использованием React и сопутствующих технологий.
          </motion.p>
          <motion.p variants={itemVariants}>
            Мой подход к работе основан на создании эффективных, масштабируемых и
            удобных для пользователя решений, которые помогают бизнесу достигать своих целей.
          </motion.p>

          <ExperienceTimeline />
        </InfoSection>

        <SkillsSection
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h3 variants={itemVariants}>Мои навыки</motion.h3>
          <SkillContainer>
            {skills.map((skill, index) => (
              <Skill
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h4>{skill.name}</h4>
                <div className="percentage">{skill.percentage}</div>
              </Skill>
            ))}
          </SkillContainer>
        </SkillsSection>
      </Content>
    </AboutContainer>
  );
};

export default About; 