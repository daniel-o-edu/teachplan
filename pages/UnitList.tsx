
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Folder, Users, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import { CurricularUnit } from '../types';

const UnitList: React.FC = () => {
  const { units } = useApp();
  const [selectedClassCode, setSelectedClassCode] = useState<string | null>(null);

  // Get unique class codes
  const classCodes = Array.from(new Set(units.map(u => u.code)));

  const filteredUnits = selectedClassCode 
    ? units.filter(u => u.code === selectedClassCode)
    : [];

  // Grouped View (First Level)
  if (!selectedClassCode) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto mb-16 md:mb-0">
        <header className="mb-8">
          <h1 className="text-2xl font-sans font-normal text-gray-800 mb-1">
            Minhas Turmas
          </h1>
          <p className="text-gray-500 text-sm">
            Selecione uma turma para visualizar as Unidades Curriculares.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classCodes.map(code => (
            <div 
              key={code}
              onClick={() => setSelectedClassCode(code)}
              className="bg-white rounded-xl border border-google-border hover:shadow-md transition-all cursor-pointer p-6 flex flex-col items-center justify-center text-center gap-4 group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-google-blue group-hover:bg-blue-100 transition-colors">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-800">{code}</h3>
                <p className="text-gray-500 text-sm mt-1">
                   {units.filter(u => u.code === code).length} Unidades Curriculares
                </p>
              </div>
              <button className="text-google-blue text-sm font-medium flex items-center mt-2 group-hover:underline">
                Acessar Turma <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // List of UCs for selected Class (Second Level)
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto mb-16 md:mb-0">
      <div className="mb-6">
        <button 
          onClick={() => setSelectedClassCode(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-google-blue transition-colors mb-2"
        >
          <ArrowLeft size={16} />
          Voltar para Turmas
        </button>
        <h1 className="text-2xl font-sans font-normal text-gray-800">
          Turma: {selectedClassCode}
        </h1>
        <p className="text-gray-500 text-sm">Unidades Curriculares disponíveis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredUnits.map(unit => (
          <Link 
            key={unit.id} 
            to={`/units/${unit.id}`}
            className="group bg-white rounded-xl border border-google-border overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="h-2 bg-google-blue group-hover:h-3 transition-all duration-300"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-google-blue">
                  <Folder size={24} />
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                  {unit.code}
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-google-blue transition-colors">
                {unit.name}
              </h3>
              
              <p className="text-sm text-gray-500 line-clamp-2 mb-6 h-10">
                {unit.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users size={16} />
                  <span>Presencial</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>{unit.shift}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UnitList;
