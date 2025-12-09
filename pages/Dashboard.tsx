import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import LessonCard from '../components/LessonCard';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import isWithinInterval from 'date-fns/isWithinInterval';
import addWeeks from 'date-fns/addWeeks';
import parseISO from 'date-fns/parseISO';
import ptBR from 'date-fns/locale/pt-BR';
import { ChevronLeft, ChevronRight, Filter, CalendarDays } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { lessons, units } = useApp();
  // We'll mock "Today" as Jan 20, 2026 to show relevant data from the PDF
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 0, 20)); 

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });

  // Helper to get Shift weight for sorting
  const getShiftWeight = (blockId: string): number => {
    const unit = units.find(u => u.id === blockId);
    if (!unit?.shift) return 4;
    const s = unit.shift.toLowerCase();
    if (s.includes('manhã')) return 1;
    if (s.includes('tarde')) return 2;
    if (s.includes('noite')) return 3;
    return 4;
  };

  const weeklyLessons = useMemo(() => {
    return lessons.filter(l => {
      const lDate = parseISO(l.date);
      return isWithinInterval(lDate, { start: weekStart, end: weekEnd });
    }).sort((a, b) => {
      const dateA = parseISO(a.date).getTime();
      const dateB = parseISO(b.date).getTime();
      
      // First sort by Date
      if (dateA !== dateB) {
        return dateA - dateB;
      }
      
      // If same date, sort by Shift (Unit)
      return getShiftWeight(a.blockId) - getShiftWeight(b.blockId);
    });
  }, [lessons, units, weekStart, weekEnd]);

  const getUnitName = (id: string) => units.find(u => u.id === id)?.name;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto mb-16 md:mb-0">
      <header className="mb-8">
        <h1 className="text-2xl font-sans font-normal text-gray-800 mb-1">
          Resumo da Semana
        </h1>
        <p className="text-gray-500 text-sm">
          Gerencie suas aulas e pendências de forma rápida.
        </p>
      </header>

      {/* Date Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-google-border mb-6">
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <button 
            onClick={() => setCurrentDate(d => addWeeks(d, -1))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="text-gray-600" />
          </button>
          
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-900">
              {format(weekStart, "d 'de' MMM", { locale: ptBR })} - {format(weekEnd, "d 'de' MMM", { locale: ptBR })}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {format(currentDate, "yyyy")}
            </span>
          </div>

          <button 
             onClick={() => setCurrentDate(d => addWeeks(d, 1))}
             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="text-gray-600" />
          </button>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide px-2">
              {weeklyLessons.length} Aulas
            </span>
            <button className="flex items-center gap-2 text-sm text-google-blue font-medium hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                <Filter size={16} />
                Filtrar
            </button>
        </div>
      </div>

      {/* Lesson Grid */}
      {weeklyLessons.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {weeklyLessons.map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              unitName={getUnitName(lesson.blockId)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <CalendarDays size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Sem aulas nesta semana</h3>
          <p className="text-gray-500 text-sm mt-1">Aproveite para planejar o próximo conteúdo!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;