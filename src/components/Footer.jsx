import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FooterWrapper = styled(motion.footer)`
  width: 100%;
  padding: 4rem 2rem;
  background: #fafafa;
  position: relative;
  z-index: 10;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.03);
  flex-shrink: 0;
  margin-top: auto;
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

const Footer = () => {
  return (
    <FooterWrapper
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
            <li><a href="https://t.me/ne_natasha">Консультации</a></li>
          </ul>
        </FooterColumn>
        <FooterColumn>
          <h3>Ресурсы</h3>
          <ul>
            <li><a href="#">Блог</a></li>
            <li><Link to="/documentation">Документация</Link></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Поддержка</a></li>
          </ul>
        </FooterColumn>
        <FooterColumn>
          <h3>Связаться</h3>
          <ul>
            <li><a href="mailto:contact@example.com">contact@example.com</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
            <li><a href="https://t.me/ne_natasha">Telegram</a></li>
            <li><a href="#">WhatsApp</a></li>
          </ul>
        </FooterColumn>
      </FooterContent>
      <FooterBottom>
        <div>© 2024 Все права защищены</div>
        <SocialLinks>
          <a href="https://github.com/9o1ub" aria-label="GitHub"><i className="fab fa-github"></i></a>
          <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
        </SocialLinks>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer; 