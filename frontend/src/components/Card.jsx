import React from 'react';

const Card = ({ children, className = '', hover = false }) => {
  return (
    <div 
      className={`card p-6 ${hover ? 'transition-transform duration-300 hover:scale-105 hover:shadow-blue-glow' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
