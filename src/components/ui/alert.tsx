import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import closeIcon from '@/assets/icons/close.svg';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description: string;
}

const Alert: React.FC<AlertProps> = ({ type, title, description }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 5, 0));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return '';
    }
  };

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-start justify-center z-50 mt-2"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className={`relative border-l-4 ${getAlertStyles()}`} role="alert">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
          onClick={() => setVisible(false)}
        >
          <img src={closeIcon} alt="Close" className="w-4 h-4 bg-gray-200" />
        </button>
        <p className="font-bold text-sm px-6 pt-4">{title}</p>
        <p className="text-sm px-6 pb-4">{description}</p>
        <div className="h-1 mt-2">
          <div className={`h-full ${type === 'success' ? 'bg-green-400' : type === 'error' ? 'bg-red-400' : type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`} style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;
