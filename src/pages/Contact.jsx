import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/config';
import { ref, push, serverTimestamp } from 'firebase/database';

const ContactContainer = styled.div`
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

const ContactInfo = styled(motion.div)`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #636e72;
    margin-bottom: 2rem;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  text-decoration: none;
  color: var(--text-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(10px);
  }

  .icon {
    font-size: 1.5rem;
    color: var(--primary-color);
  }
`;

const FormSection = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #636e72;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${props => props.error ? 'var(--error-color)' : '#e0e0e0'};
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${props => props.error ? 'var(--error-color)' : '#e0e0e0'};
  border-radius: 10px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(9, 132, 227, 0.3);

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: var(--error-color);
  font-size: 0.9rem;
`;

const Notification = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &.success {
    background: var(--success-color);
  }
  
  &.error {
    background: var(--error-color);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Тема обязательна';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const messagesRef = ref(db, 'messages');
      await push(messagesRef, {
        ...formData,
        timestamp: serverTimestamp()
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setNotification({
        type: 'success',
        message: 'Сообщение успешно отправлено!'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Ошибка при отправке сообщения. Попробуйте позже.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку поля при изменении
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

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
    <ContactContainer>
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
        <ContactInfo
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants}>Свяжитесь со мной</motion.h2>
          <motion.p variants={itemVariants}>
            Готов обсудить ваш проект или ответить на любые вопросы.
            Выберите удобный способ связи или заполните форму.
          </motion.p>
          
          <ContactLinks>
            <ContactLink 
              href="mailto:dnazhmitdin@gmail.com"
              variants={itemVariants}
              whileHover={{ x: 10 }}
            >
              <span className="icon">✉️</span>
              dnazhmitdin@gmail.com
            </ContactLink>
            <ContactLink 
              href="https://t.me/ne_natasha"
              target="_blank"
              variants={itemVariants}
              whileHover={{ x: 10 }}
            >
              <span className="icon">📱</span>
              @ne_natasha
            </ContactLink>
            <ContactLink 
              href="https://github.com/yourusername"
              target="_blank"
              variants={itemVariants}
              whileHover={{ x: 10 }}
            >
              <span className="icon">💻</span>
              GitHub
            </ContactLink>
          </ContactLinks>
        </ContactInfo>

        <FormSection
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Имя</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Ваше имя"
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="your@email.com"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Тема</Label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="Тема сообщения"
              />
              {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Сообщение</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Ваше сообщение..."
              />
              {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </SubmitButton>
          </Form>
        </FormSection>
      </Content>

      <AnimatePresence>
        {notification && (
          <Notification
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={notification.type}
          >
            {notification.message}
          </Notification>
        )}
      </AnimatePresence>
    </ContactContainer>
  );
};

export default Contact; 