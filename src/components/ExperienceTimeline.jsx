import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 3rem auto;
  padding: 2rem 0;
`;

const TimelineLine = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, 
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  top: 0;
  border-radius: 2px;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    box-shadow: 0 0 20px var(--primary-color);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(9, 132, 227, 0.4);
    }
    70% {
      box-shadow: 0 0 0 20px rgba(9, 132, 227, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(9, 132, 227, 0);
    }
  }

  @media (max-width: 768px) {
    left: 20px;
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.position === 'left' ? 'flex-end' : 'flex-start'};
  padding-left: ${props => props.position === 'right' ? '50%' : '0'};
  padding-right: ${props => props.position === 'left' ? '50%' : '0'};
  margin: 2rem 0;
  position: relative;

  @media (max-width: 768px) {
    padding-left: 60px;
    padding-right: 0;
    justify-content: flex-start;
  }
`;

const TimelineContent = styled(motion.div)`
  width: 80%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    top: 50%;
    ${props => props.position === 'left' ? 'right: -60px;' : 'left: -60px;'}
    transform: translateY(-50%);
    z-index: 1;
    box-shadow: 0 0 10px var(--primary-color);
    transition: all 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover::before {
    transform: translateY(-50%) scale(1.5);
    box-shadow: 0 0 20px var(--primary-color);
  }

  @media (max-width: 768px) {
    width: 100%;

    &::before {
      left: -50px;
    }
  }
`;

const TimelineDate = styled(motion.div)`
  font-size: 1rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 30px;
    height: 2px;
    background: var(--primary-color);
    display: inline-block;
  }
`;

const TimelineTitle = styled(motion.h3)`
  font-size: 1.4rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  ${TimelineContent}:hover &::after {
    width: 100%;
  }
`;

const TimelineDescription = styled(motion.p)`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SkillsList = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled(motion.span)`
  padding: 0.3rem 0.8rem;
  background: rgba(9, 132, 227, 0.1);
  border-radius: 15px;
  font-size: 0.8rem;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }
`;

const DetailButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`;

const experience = [
  {
    date: '2020 - Настоящее время',
    title: 'Frontend Developer',
    description: 'Создание пользовательских интерфейсов, внедрение новых технологий и методологий разработки. Работа с React, Redux и другими современными инструментами.',
    skills: ['React', 'JavaScript', 'Redux', 'CSS3', 'Webpack'],
    position: 'left',
    details: 'Разработка и поддержка крупных веб-приложений, оптимизация производительности, работа с REST API.'
  },
  {
    date: '2018 - 2020',
    title: 'Junior Developer',
    description: 'Начало карьеры в веб-разработке. Работа над различными проектами, изучение основных технологий и фреймворков. Участие в командной разработке.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap'],
    position: 'right',
    details: 'Создание адаптивных веб-сайтов, работа с CMS, базовая оптимизация.'
  }
];

const ExperienceTimeline = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  return (
    <TimelineContainer>
      <TimelineLine />
      {experience.map((item, index) => (
        <TimelineItem
          key={index}
          position={item.position}
          initial={{ opacity: 0, x: item.position === 'left' ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <TimelineContent
            position={item.position}
            onClick={() => setExpandedItem(expandedItem === index ? null : index)}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 10px 40px 0 rgba(31, 38, 135, 0.37)'
            }}
            transition={{ duration: 0.3 }}
          >
            <TimelineDate
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {item.date}
            </TimelineDate>
            <TimelineTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {item.title}
            </TimelineTitle>
            <TimelineDescription
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {item.description}
            </TimelineDescription>
            <SkillsList
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {item.skills.map((skill, skillIndex) => (
                <SkillTag
                  key={skillIndex}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </SkillTag>
              ))}
            </SkillsList>
            <AnimatePresence>
              {expandedItem === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginTop: '1rem' }}
                >
                  <TimelineDescription>{item.details}</TimelineDescription>
                </motion.div>
              )}
            </AnimatePresence>
            <DetailButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ marginTop: '1rem' }}
            >
              {expandedItem === index ? 'Свернуть' : 'Подробнее'}
            </DetailButton>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default ExperienceTimeline; 