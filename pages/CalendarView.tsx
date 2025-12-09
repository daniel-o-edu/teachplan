import React from 'react';
import { useApp } from '../context/AppContext';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import ptBR from 'date-fns/locale/pt-BR';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView: React.FC = () => {
  const { lessons } = useApp();
  // Mock current month to Jan 2026 to show activity initially
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 0, 1)); 

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getDayLessons = (date: Date) => {
    return lessons.filter(l => isSameDay(parseISO(l.date), date));
  };

  const handlePrevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto mb-16 md:mb-0">
       <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sans font-normal text-gray-800">
            Calendário de Aulas
          </h1>
          <p className="text-gray-500 text-sm">Visão mensal</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-google-border shadow-sm">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-gray-800 w-32 text-center select-none">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </span>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-google-border overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-fr">
           {days.map((day) => {
             const dayLessons = getDayLessons(day);
             const isToday = isSameDay(day, new Date(2026, 0, 20)); // Mocking "today"
             const hasLessons = dayLessons.length > 0;

             return (
               <div 
                key={day.toString()} 
                className={`min-h-[120px] border-b border-r border-gray-100 p-2 transition-colors ${!isSameMonth(day, currentDate) ? 'bg-gray-50/50' : 'bg-white hover:bg-gray-50'}`}
               >
                 <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${isToday ? 'bg-google-blue text-white w-6 h-6 flex items-center justify-center rounded-full shadow-sm' : 'text-gray-700'}`}>
                      {format(day, 'd')}
                    </span>
                 </div>
                 
                 <div className="mt-2 flex flex-col gap-1 overflow-y-auto max-h-[80px]">
                   {dayLessons.map(l => (
                     <div 
                       key={l.id} 
                       className={`text-[10px] px-1.5 py-1 rounded border truncate cursor-default
                         ${l.status === 'Entregue' 
                           ? 'bg-green-50 text-green-700 border-green-100' 
                           : l.status === 'Preparando' 
                             ? 'bg-blue-50 text-blue-700 border-blue-100'
                             : 'bg-red-50 text-red-700 border-red-100'
                         }`}
                        title={l.title}
                     >
                       {l.title}
                     </div>
                   ))}
                 </div>
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;