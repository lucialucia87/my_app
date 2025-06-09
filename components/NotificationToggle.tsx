
import React from 'react';

interface NotificationToggleProps {
  id: string;
  isToggled: boolean;
  onToggle: (id: string, newState: boolean) => void;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({ id, isToggled, onToggle }) => {
  const handleToggle = () => {
    onToggle(id, !isToggled);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none ${
        isToggled ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
          isToggled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default NotificationToggle;
