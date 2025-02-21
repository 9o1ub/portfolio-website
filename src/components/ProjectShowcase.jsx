import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ShowcaseContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(9,132,227,0.05) 100%);
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-color);
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => `url(${props.image}) center/cover`};
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  padding: 0.4rem 1rem;
  background: var(--primary-color);
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const ProjectLink = styled.a`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(9, 132, 227, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const projects = [
  {
    title: "Заметки",
    description: "Веб-приложение для создания и управления заметками с современным интерфейсом",
    image: "/assets/tz-preview.png",
    tech: ["React", "Firebase", "Styled Components", "Framer Motion"],
    link: "https://tztest-18f2b.web.app/"
  },
  {
    title: "AI Чат-бот",
    description: "Интеллектуальный чат-бот с поддержкой нейронных сетей и обработкой естественного языка",
    image: "https://source.unsplash.com/random/800x600?ai",
    tech: ["React", "Python", "TensorFlow", "NLP"],
    link: "#"
  },
  {
    title: "Крипто-кошелек",
    description: "Безопасный криптовалютный кошелек с поддержкой множества блокчейнов",
    image: "https://source.unsplash.com/random/800x600?crypto",
    tech: ["React Native", "Web3.js", "Blockchain", "Solidity"],
    link: "#"
  },
  {
    title: "AR Навигатор",
    description: "Приложение дополненной реальности для навигации внутри помещений",
    image: "https://source.unsplash.com/random/800x600?augmented-reality",
    tech: ["Unity", "ARKit", "ARCore", "C#"],
    link: "#"
  }
];

const ProjectShowcase = () => {
  return (
    <ShowcaseContainer>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Мои Проекты
      </Title>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <ProjectImage image={project.image} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.tech.map((tech, i) => (
                  <TechTag key={i}>{tech}</TechTag>
                ))}
              </TechStack>
              <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                Подробнее
              </ProjectLink>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ShowcaseContainer>
  );
};

export default ProjectShowcase; 