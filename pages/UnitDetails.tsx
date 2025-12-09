import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LessonCard from '../components/LessonCard';
import { ArrowLeft, Plus } from 'lucide-react';

const UnitDetails: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const { units, lessons } = useApp();
  
  const unit = units.find(u => u.id === unitId);
  const unitLessons = lessons
    .filter(l => l.blockId === unitId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (!unit) return <div className="p-8">Unidade não encontrada.</div>;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto mb-16 md:mb-0">
      <Link to="/units" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-google-blue mb-4 transition-colors">
        <ArrowLeft size={16} />
        Voltar para Turmas
      </Link>

      <div className="bg-white p-6 rounded-xl border border-google-border shadow-sm mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-sans font-medium text-gray-800 mb-2">
              {unit.name}
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                {unit.code}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                {unit.shift}
              </span>
            </div>
          </div>
           {/* Mock "Add" button just for UI completeness */}
           <button className="hidden sm:flex items-center gap-2 bg-google-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
            <Plus size={18} />
            <span className="text-sm font-medium">Nova Aula</span>
           </button>
        </div>
        <p className="mt-4 text-gray-600 text-sm">{unit.description}</p>
      </div>

      <h2 className="text-lg font-medium text-gray-700 mb-4 px-1">Cronograma de Aulas</h2>
      
      <div className="space-y-4">
        {unitLessons.length > 0 ? (
          unitLessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))
        ) : (
          <p className="text-gray-500 italic p-4 text-center border rounded-lg">Nenhuma aula cadastrada para este bloco.</p>
        )}
      </div>

       {/* Floating Action Button for Mobile */}
       <button className="fixed bottom-20 right-4 w-14 h-14 bg-google-blue text-white rounded-full shadow-lg flex items-center justify-center md:hidden z-40 hover:bg-blue-600 active:scale-90 transition-transform">
        <Plus size={24} />
       </button>
    </div>
  );
};

export default UnitDetails;
