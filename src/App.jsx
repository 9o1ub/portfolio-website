import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import GradientBackground from './components/GradientBackground';
import CustomCursor from './components/CustomCursor';
import CustomScrollbar from './components/CustomScrollbar';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Toast from './components/Toast';

// Ленивая загрузка страниц
const Home = React.lazy(() => import('./pages/Home'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #ffffff;
  cursor: none; // Скрываем стандартный курсор
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`;

const LoadingScreen = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  z-index: 1;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Имитация загрузки
    setTimeout(() => {
      setIsLoading(false);
      addToast({
        type: 'success',
        title: 'Добро пожаловать!',
        message: 'Сайт успешно загружен'
      });
    }, 2000);
  }, []);

  const addToast = (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <Router>
      <AppContainer>
        <Preloader isLoading={isLoading} />
        <CustomCursor />
        <GradientBackground />
        <CustomScrollbar />
        <ScrollProgress />
        <Toast toasts={toasts} removeToast={removeToast} />
        <Navigation />
        <MainContent>
          <Suspense fallback={
            <LoadingScreen>
              Загрузка...
            </LoadingScreen>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App; 