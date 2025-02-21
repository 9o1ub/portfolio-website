import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.li)`
  margin: 0 1rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  &:hover:after,
  &.active:after {
    width: 80%;
  }

  &:hover {
    color: var(--primary-color);
  }

  &.active {
    color: var(--primary-color);
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const MenuLine = styled(motion.span)`
  width: 24px;
  height: 2px;
  background: var(--text-color);
  border-radius: 2px;
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  padding: 5rem 2rem 2rem;
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
  transition: all 0.3s ease;

  &:hover,
  &.active {
    color: var(--primary-color);
    transform: scale(1.1);
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0
    },
    open: (i) => ({
      rotate: i === 1 ? 45 : -45,
      y: i === 1 ? 6 : -6
    })
  };

  const middleLineVariants = {
    closed: {
      opacity: 1,
      x: 0
    },
    open: {
      opacity: 0,
      x: 20
    }
  };

  return (
    <NavContainer>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <NavList>
          <NavItem variants={itemVariants}>
            <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
              Главная
            </NavLink>
          </NavItem>
          <NavItem variants={itemVariants}>
            <NavLink to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>
              Портфолио
            </NavLink>
          </NavItem>
          <NavItem variants={itemVariants}>
            <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              Обо мне
            </NavLink>
          </NavItem>
          <NavItem variants={itemVariants}>
            <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
              Контакты
            </NavLink>
          </NavItem>
        </NavList>

        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          <MenuLine
            variants={lineVariants}
            animate={isOpen ? "open" : "closed"}
            custom={1}
          />
          <MenuLine
            variants={middleLineVariants}
            animate={isOpen ? "open" : "closed"}
          />
          <MenuLine
            variants={lineVariants}
            animate={isOpen ? "open" : "closed"}
            custom={2}
          />
        </MobileMenuButton>

        <AnimatePresence>
          {isOpen && (
            <MobileMenu
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <MobileNavLink 
                to="/" 
                onClick={() => setIsOpen(false)}
                className={location.pathname === '/' ? 'active' : ''}
              >
                Главная
              </MobileNavLink>
              <MobileNavLink 
                to="/portfolio" 
                onClick={() => setIsOpen(false)}
                className={location.pathname === '/portfolio' ? 'active' : ''}
              >
                Портфолио
              </MobileNavLink>
              <MobileNavLink 
                to="/about" 
                onClick={() => setIsOpen(false)}
                className={location.pathname === '/about' ? 'active' : ''}
              >
                Обо мне
              </MobileNavLink>
              <MobileNavLink 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className={location.pathname === '/contact' ? 'active' : ''}
              >
                Контакты
              </MobileNavLink>
            </MobileMenu>
          )}
        </AnimatePresence>
      </motion.div>
    </NavContainer>
  );
};

export default Navigation; 