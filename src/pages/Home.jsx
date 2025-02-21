import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingCards from '../components/FloatingCards';
import profileImage from '../assets/profile.jpeg';

const HomeWrapper = styled.div`
  overflow-y: auto;
  height: 100vh;
  scroll-behavior: smooth;
  background: #ffffff;
  position: relative;
  perspective: 1px;
  transform-style: preserve-3d;
  scroll-snap-type: y mandatory;
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #ffffff;
  position: relative;
  scroll-snap-align: start;
  overflow: hidden;
  isolation: isolate;
`;

const SecondScreen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background: #ffffff;
  position: relative;
  scroll-snap-align: start;
  overflow: hidden;
`;

const ContentSection = styled(motion.div)`
  flex: 1;
  padding: 2rem;
  z-index: 1;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ImageSection = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProfileImage = styled(motion.div)`
  width: 400px;
  height: 400px;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: url(${profileImage}) center/cover no-repeat;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: 0.1;
  z-index: 0;
`;

const SkillTag = styled(motion.div)`
  position: absolute;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-weight: 500;
  color: var(--primary-color);
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #636e72;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const Hero = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  z-index: 2;
  position: relative;
  mix-blend-mode: normal;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 7rem;
  margin-bottom: 1rem;
  color: #000;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  font-weight: 400;
  max-width: 600px;
  position: relative;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled(motion(Link))`
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease;

  &.primary {
    background: var(--primary-color);
    color: white;
    box-shadow: 0 4px 15px rgba(9, 132, 227, 0.3);
  }

  &.secondary {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #636e72;
`;

const ScrollText = styled(motion.span)`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ScrollArrow = styled(motion.div)`
  width: 30px;
  height: 30px;
  border: 2px solid currentColor;
  border-radius: 50%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 8px;
    height: 8px;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
  }
`;

const BackgroundAnimation = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: -1;
`;

const Circle = styled(motion.div)`
  position: absolute;
  background: ${props => props.color};
  border-radius: 50%;
  opacity: 0.1;
`;

const ThirdScreen = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: #ffffff;
  position: relative;
  overflow: visible;
  margin-bottom: 4rem;
  scroll-snap-align: start;
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  height: 300px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const GalleryOverlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const GalleryTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--text-color);
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
  z-index: -1;
  filter: blur(50px);
`;

const Footer = styled(motion.footer)`
  width: 100%;
  padding: 4rem 2rem;
  background: #fafafa;
  position: relative;
  z-index: 10;
  transform: translateZ(0);
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.03);
  scroll-snap-align: end;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
    letter-spacing: -0.5px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #4a4a4a;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    position: relative;
    display: inline-block;

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -2px;
      left: 0;
      background: var(--primary-color);
      transition: width 0.3s ease;
    }

    &:hover {
      color: var(--primary-color);
      
      &:after {
        width: 100%;
      }
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4a4a4a;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: #4a4a4a;
    transition: all 0.3s ease;
    font-size: 1.2rem;
    
    &:hover {
      color: var(--primary-color);
      transform: translateY(-2px);
    }
  }
`;

const CardsScreen = styled.div`
  min-height: 100vh;
  position: relative;
  scroll-snap-align: start;
  overflow: hidden;
  background: #ffffff;
`;

const Home = () => {
  const secondScreenRef = useRef(null);
  const thirdScreenRef = useRef(null);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
    }
  };

  const scrollVariants = {
    initial: { 
      opacity: 1,
      y: 0
    },
    animate: {
      opacity: [0.6, 1],
      y: [0, 12],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const profileImageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        duration: 1
      }
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    }
  };

  const skillTagVariants = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: index * 0.15
      }
    }),
    hover: {
      scale: 1.15,
      y: -8,
      boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20
      }
    }
  };

  const galleryItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const circles = [
    { size: 400, color: "#0984e3", x: -200, y: -200 },
    { size: 300, color: "#00b894", x: "80%", y: "60%" },
    { size: 200, color: "#6c5ce7", x: "60%", y: -100 },
  ];

  const skillTags = [
    { text: "React", x: -180, y: -100 },
    { text: "TypeScript", x: 150, y: -80 },
    { text: "Node.js", x: -150, y: 100 },
    { text: "Firebase", x: 180, y: 80 }
  ];

  const shapes = [
    { size: 200, color: "#0984e3", x: "10%", y: "20%" },
    { size: 150, color: "#00b894", x: "85%", y: "50%" },
    { size: 100, color: "#6c5ce7", x: "50%", y: "85%" }
  ];

  const galleryItems = [];

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

  const calculateMorphing = (basePosition, mousePosition, speed, size, isX = true) => {
    const base = parseFloat(basePosition) / 100 * (isX ? window.innerWidth : window.innerHeight);
    const mouseDelta = (isX ? mousePosition.x : mousePosition.y) - base;
    const distance = Math.abs(mouseDelta);
    const maxDistance = size * 2;
    const morphFactor = Math.max(0, 1 - distance / maxDistance);
    return morphFactor;
  };

  const calculateBorderRadius = (x, y, mouseX, mouseY, size) => {
    const baseX = parseFloat(x) / 100 * window.innerWidth;
    const baseY = parseFloat(y) / 100 * window.innerHeight;
    const angle = Math.atan2(mouseY - baseY, mouseX - baseX);
    const distance = Math.sqrt(Math.pow(mouseX - baseX, 2) + Math.pow(mouseY - baseY, 2));
    const maxDistance = size * 3;
    const morphFactor = Math.max(0, 1 - distance / maxDistance);
    
    const topLeft = 20;
    const topRight = 20;
    const bottomRight = 20;
    const bottomLeft = 20;

    const angleOffset = (angle + Math.PI * 2) % (Math.PI * 2);
    const morphAmount = 40 * morphFactor;

    if (angleOffset < Math.PI / 2) {
      return `${topLeft}px ${topRight + morphAmount}px ${bottomRight}px ${bottomLeft}px`;
    } else if (angleOffset < Math.PI) {
      return `${topLeft}px ${topRight}px ${bottomRight + morphAmount}px ${bottomLeft}px`;
    } else if (angleOffset < Math.PI * 3/2) {
      return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft + morphAmount}px`;
    } else {
      return `${topLeft + morphAmount}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
    }
  };

  const handleScroll = () => {
    secondScreenRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const footerVariants = {
    hidden: { 
      opacity: 0,
      y: 100
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <HomeWrapper>
      <HomeContainer>
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
              style={{
                zIndex: Math.floor(image.scale * 10)
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

        <Hero
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Title 
            variants={itemVariants}
          >
            Привет, я Разработчик
          </Title>
          <Subtitle variants={itemVariants}>
            Создаю красивые и функциональные веб-приложения,
            которые помогают бизнесу расти и развиваться
          </Subtitle>
          <ButtonContainer variants={itemVariants}>
            <Button
              to="/portfolio"
              className="primary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Смотреть работы
            </Button>
            <Button
              to="/contact"
              className="secondary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Связаться
            </Button>
          </ButtonContainer>
        </Hero>
        
        <ScrollIndicator
          onClick={handleScroll}
          variants={scrollVariants}
          initial="initial"
          animate="animate"
        >
          <ScrollText>Прокрутите вниз</ScrollText>
          <ScrollArrow />
        </ScrollIndicator>
      </HomeContainer>

      <CardsScreen>
        <FloatingCards />
      </CardsScreen>

      <SecondScreen ref={secondScreenRef}>
        <ContentSection
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15
            }
          }}
          viewport={{ once: true }}
        >
          <SectionTitle>Обо мне</SectionTitle>
          <SectionText>
            Я frontend-разработчик с опытом создания современных веб-приложений.
            Специализируюсь на React и TypeScript, постоянно изучаю новые технологии
            и следую лучшим практикам разработки.
          </SectionText>
          <Button
            to="/about"
            className="primary"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Узнать больше
          </Button>
        </ContentSection>

        <ImageSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {shapes.map((shape, index) => (
            <FloatingShape
              key={index}
              color={shape.color}
              style={{
                width: shape.size,
                height: shape.size,
                left: shape.x,
                top: shape.y
              }}
              animate={{
                y: [0, 20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 2,
                times: [0, 0.5, 1]
              }}
            />
          ))}
          
          <ProfileImage
            variants={profileImageVariants}
            whileHover="hover"
          />

          {skillTags.map((tag, index) => (
            <SkillTag
              key={index}
              style={{ x: tag.x, y: tag.y }}
              variants={skillTagVariants}
              custom={index}
              whileHover="hover"
            >
              {tag.text}
            </SkillTag>
          ))}
        </ImageSection>
      </SecondScreen>

      <Footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={footerVariants}
      >
        <FooterContent>
          <FooterColumn>
            <h3>Навигация</h3>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/portfolio">Портфолио</Link></li>
              <li><Link to="/about">Обо мне</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Услуги</h3>
            <ul>
              <li><a href="#">Веб-разработка</a></li>
              <li><a href="#">UI/UX Дизайн</a></li>
              <li><a href="#">Мобильные приложения</a></li>
              <li><a href="#">Консультации</a></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Ресурсы</h3>
            <ul>
              <li><a href="#">Блог</a></li>
              <li><a href="#">Документация</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Поддержка</a></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Связаться</h3>
            <ul>
              <li><a href="mailto:contact@example.com">contact@example.com</a></li>
              <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
              <li><a href="#">Telegram</a></li>
              <li><a href="#">WhatsApp</a></li>
            </ul>
          </FooterColumn>
        </FooterContent>
        <FooterBottom>
          <div>© 2024 Все права защищены</div>
          <SocialLinks>
            <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          </SocialLinks>
        </FooterBottom>
      </Footer>
    </HomeWrapper>
  );
};

export default Home; 