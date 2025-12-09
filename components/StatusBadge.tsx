import React from 'react';
import { Status } from '../types';

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const getStyles = (s: Status) => {
    switch (s) {
      case 'Entregue':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Preparando':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Preparar':
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
