import React from 'react';

interface SectionTitleProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon, className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 p-4 pt-6 ${className}`}>
      {icon && <span className="text-primary">{icon}</span>}
      <h2 className="text-xl font-semibold text-neutral-dark">{title}</h2>
    </div>
  );
};

export default SectionTitle;
