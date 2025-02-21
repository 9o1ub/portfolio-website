import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';

// Ленивая загрузка страниц
const Home = React.lazy(() => import('./pages/Home'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Documentation = React.lazy(() => import('./pages/Documentation'));

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const PageContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
`;

const LoadingScreen = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const pageVariants = {
  initial: {
    opacity: 0,
    x: "100%",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    x: "-100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageContainer
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Home />
            </PageContainer>
          } 
        />
        <Route 
          path="/portfolio" 
          element={
            <PageContainer
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Portfolio />
            </PageContainer>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PageContainer
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <About />
            </PageContainer>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PageContainer
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Contact />
            </PageContainer>
          } 
        />
        <Route 
          path="/documentation" 
          element={
            <PageContainer
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Documentation />
            </PageContainer>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AppContainer>
        <Navigation />
        <Suspense fallback={
          <LoadingScreen>
            Загрузка...
          </LoadingScreen>
        }>
          <AnimatedRoutes />
        </Suspense>
      </AppContainer>
    </Router>
  );
}

export default App;
