import React from 'react';

const Badge = ({ children, active = false, className = '' }) => {
  return (
    <span className={`${active ? 'badge-active' : 'badge-inactive'} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
