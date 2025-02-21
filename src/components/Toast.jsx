import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
`;

const ToastItem = styled(motion.div)`
  padding: 15px 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  pointer-events: all;
  
  &.success {
    border-left: 4px solid var(--success-color);
    .icon {
      color: var(--success-color);
    }
  }
  
  &.error {
    border-left: 4px solid var(--error-color);
    .icon {
      color: var(--error-color);
    }
  }
  
  &.info {
    border-left: 4px solid var(--primary-color);
    .icon {
      color: var(--primary-color);
    }
  }
`;

const Icon = styled.div`
  font-size: 1.5rem;
`;

const Content = styled.div`
  flex: 1;
  
  .title {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 4px;
  }
  
  .message {
    font-size: 0.9rem;
    color: #666;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #333;
  }
`;

const toastVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.9
  }
};

const Toast = ({ toasts, removeToast }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  return (
    <ToastContainer>
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            className={toast.type}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <Icon className="icon">{getIcon(toast.type)}</Icon>
            <Content>
              <div className="title">{toast.title}</div>
              <div className="message">{toast.message}</div>
            </Content>
            <CloseButton onClick={() => removeToast(toast.id)}>×</CloseButton>
          </ToastItem>
        ))}
      </AnimatePresence>
    </ToastContainer>
  );
};

export default Toast; 