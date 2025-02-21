import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import mbtiImage from '../assets/mbti-preview.png';
import tzImage from '../assets/tz-preview.png';

const PortfolioContainer = styled.div`
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

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f5f7fa;
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const ProjectDescription = styled.p`
  color: #636e72;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${props => props.active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  border: 2px solid var(--primary-color);
  font-weight: 500;
  transition: all var(--transition-speed) ease;

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  background-color: #f5f7fa;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const ModalDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #636e72;
  margin-bottom: 1.5rem;
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ModalLink = styled.a`
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &.primary {
    background: var(--primary-color);
    color: white;
    &:hover {
      background: #0771c5;
    }
  }

  &.secondary {
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    &:hover {
      background: var(--primary-color);
      color: white;
    }
  }
`;

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
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

  const projects = [
    {
      id: 'tz-test',
      title: "Заметки",
      description: "Веб-приложение для создания и управления заметками с современным интерфейсом",
      fullDescription: "Полнофункциональное веб-приложение для создания и управления заметками. Проект включает в себя систему аутентификации Firebase, анимированные переходы и интерактивные элементы, оптимизированные для всех устройств. Удобный интерфейс позволяет легко создавать, редактировать и организовывать заметки.",
      image: tzImage,
      tags: ["React", "Firebase", "Styled Components", "Framer Motion"],
      category: "web",
      liveUrl: "https://tztest-18f2b.web.app/",
      features: [
        "Создание и редактирование заметок",
        "Система авторизации",
        "Анимации и плавные переходы",
        "Адаптивный дизайн",
        "Удобный пользовательский интерфейс"
      ]
    },
    {
      id: 1,
      title: "MBTI Тест",
      description: "Интерактивный тест для определения типа личности по методике MBTI",
      fullDescription: "Полнофункциональное веб-приложение для прохождения теста MBTI. Приложение включает в себя интерактивный опросник, детальный анализ результатов и описание всех 16 типов личности. Разработано с использованием современных технологий и лучших практик UI/UX дизайна.",
      image: mbtiImage,
      tags: ["React", "Firebase", "Framer Motion"],
      category: "web",
      liveUrl: "https://mbti-b2846.web.app/",
      features: [
        "Адаптивный дизайн",
        "Анимированный интерфейс",
        "Сохранение результатов",
        "Детальная аналитика"
      ]
    }
  ];

  const filterProjects = (category) => {
    setFilter(category);
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <PortfolioContainer>
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

      <FilterContainer>
        <FilterButton
          active={filter === 'all'}
          onClick={() => filterProjects('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Все
        </FilterButton>
        <FilterButton
          active={filter === 'web'}
          onClick={() => filterProjects('web')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Веб
        </FilterButton>
      </FilterContainer>

      <Grid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(project)}
            >
              <ProjectImage src={project.image} alt={project.title} />
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TagContainer>
                  {project.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagContainer>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </AnimatePresence>
      </Grid>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ModalContent
              onClick={e => e.stopPropagation()}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <CloseButton onClick={() => setSelectedProject(null)}>×</CloseButton>
              <ModalImage src={selectedProject.image} alt={selectedProject.title} />
              <ModalTitle>{selectedProject.title}</ModalTitle>
              <ModalDescription>{selectedProject.fullDescription}</ModalDescription>
              
              <h4>Основные возможности:</h4>
              <ul>
                {selectedProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <TagContainer style={{ marginTop: '1rem' }}>
                {selectedProject.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagContainer>

              <ModalLinks>
                <ModalLink 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  className="primary"
                >
                  Открыть проект
                </ModalLink>
              </ModalLinks>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PortfolioContainer>
  );
};

export default Portfolio; 