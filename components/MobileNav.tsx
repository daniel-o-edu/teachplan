
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, Briefcase } from 'lucide-react';

const MobileNav: React.FC = () => {
  const navClasses = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors ${
      isActive ? 'text-google-blue bg-blue-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <NavLink to="/" className={navClasses}>
        <LayoutDashboard size={20} className="mb-1" />
        Resumo
      </NavLink>
      <NavLink to="/units" className={navClasses}>
        <BookOpen size={20} className="mb-1" />
        Turmas
      </NavLink>
      <NavLink to="/manage-classes" className={navClasses}>
        <Briefcase size={20} className="mb-1" />
        Gerenciar
      </NavLink>
      <NavLink to="/calendar" className={navClasses}>
        <Calendar size={20} className="mb-1" />
        Calendário
      </NavLink>
    </div>
  );
};

export default MobileNav;
