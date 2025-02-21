import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DocContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--text-color);
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a4a4a;

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  code {
    background: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }
`;

const CodeBlock = styled.pre`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
  font-family: monospace;
`;

const Documentation = () => {
  return (
    <DocContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Документация проекта "Заметки"</Title>

        <Section>
          <SectionTitle>Обзор</SectionTitle>
          <Content>
            <p>
              "Заметки" - это веб-приложение для создания и управления заметками, разработанное с использованием
              современных технологий и лучших практик веб-разработки.
            </p>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Технологии</SectionTitle>
          <Content>
            <ul>
              <li><strong>React</strong> - библиотека для построения пользовательского интерфейса</li>
              <li><strong>Firebase</strong> - платформа для аутентификации и хранения данных</li>
              <li><strong>Styled Components</strong> - библиотека для стилизации компонентов</li>
              <li><strong>Framer Motion</strong> - библиотека для создания анимаций</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Функциональность</SectionTitle>
          <Content>
            <ul>
              <li>Создание, редактирование и удаление заметок</li>
              <li>Аутентификация пользователей через Firebase</li>
              <li>Сохранение заметок в реальном времени</li>
              <li>Адаптивный дизайн для всех устройств</li>
              <li>Анимированные переходы и интерактивные элементы</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Установка и запуск</SectionTitle>
          <Content>
            <p>1. Клонируйте репозиторий:</p>
            <CodeBlock>git clone https://github.com/yourusername/notes-app.git</CodeBlock>
            
            <p>2. Установите зависимости:</p>
            <CodeBlock>npm install</CodeBlock>
            
            <p>3. Запустите проект локально:</p>
            <CodeBlock>npm run dev</CodeBlock>
          </Content>
        </Section>

        <Section>
          <SectionTitle>API и интеграция</SectionTitle>
          <Content>
            <p>
              Приложение использует Firebase для хранения данных и аутентификации. 
              Основные эндпоинты:
            </p>
            <ul>
              <li><code>/notes</code> - управление заметками</li>
              <li><code>/auth</code> - аутентификация пользователей</li>
              <li><code>/users</code> - управление профилями пользователей</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Структура проекта</SectionTitle>
          <Content>
            <ul>
              <li><code>/src/components</code> - React компоненты</li>
              <li><code>/src/pages</code> - страницы приложения</li>
              <li><code>/src/hooks</code> - пользовательские хуки</li>
              <li><code>/src/utils</code> - вспомогательные функции</li>
              <li><code>/src/styles</code> - глобальные стили</li>
            </ul>
          </Content>
        </Section>
      </motion.div>
    </DocContainer>
  );
};

export default Documentation; 