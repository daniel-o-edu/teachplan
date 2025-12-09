
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, Settings, LogOut, Briefcase } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-r-full text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-google-blue/10 text-google-blue'
        : 'text-gray-600 hover:bg-gray-50'
    }`;

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col hidden md:flex z-50">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-google-green rounded flex items-center justify-center text-white font-bold text-xl shadow-sm">
          T
        </div>
        <span className="text-xl font-sans text-gray-700 tracking-tight">TeacherPlan</span>
      </div>

      <nav className="flex-1 pr-4 bg-white">
        <NavLink to="/" className={navClasses}>
          <LayoutDashboard size={20} />
          Resumo da Semana
        </NavLink>
        <NavLink to="/units" className={navClasses}>
          <BookOpen size={20} />
          Minhas Turmas
        </NavLink>
        <NavLink to="/manage-classes" className={navClasses}>
          <Briefcase size={20} />
          Gerenciar Turma
        </NavLink>
        <NavLink to="/calendar" className={navClasses}>
          <Calendar size={20} />
          Calendário Geral
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-100 bg-white">
        <NavLink to="/settings" className={navClasses}>
          <Settings size={20} />
          Configurações
        </NavLink>
        <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-google-red hover:bg-red-50 w-full rounded-r-full mt-2 transition-colors">
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
