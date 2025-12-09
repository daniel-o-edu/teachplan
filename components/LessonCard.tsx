import React, { useState } from 'react';
import { Lesson, Status } from '../types';
import { CalendarDays, FileText, MonitorPlay, ChevronDown, ChevronUp, Link as LinkIcon, ExternalLink } from 'lucide-react';
import StatusBadge from './StatusBadge';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import ptBR from 'date-fns/locale/pt-BR';
import { useApp } from '../context/AppContext';

interface LessonCardProps {
  lesson: Lesson;
  unitName?: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, unitName }) => {
  const { updateLessonStatus, updateLessonObservation, updateLessonLink } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [obsText, setObsText] = useState(lesson.observations || '');
  const [linkText, setLinkText] = useState(lesson.link || '');
  const [isEditingLink, setIsEditingLink] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLessonStatus(lesson.id, e.target.value as Status);
  };

  const saveObs = () => {
    updateLessonObservation(lesson.id, obsText);
    setIsEditing(false);
  };

  const saveLink = () => {
    updateLessonLink(lesson.id, linkText);
    setIsEditingLink(false);
  };

  return (
    <div className="bg-white rounded-lg border border-google-border hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div 
        className="p-4 cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wider">
            <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">{lesson.number}</span>
            {unitName && <span className="text-google-blue truncate max-w-[150px]">{unitName}</span>}
          </div>
          <StatusBadge status={lesson.status} />
        </div>
        
        <h3 className="text-lg font-medium text-google-text mb-1">{lesson.title}</h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <CalendarDays size={16} />
          {format(parseISO(lesson.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </div>

        <div className="flex items-center justify-between text-gray-400">
           <p className="text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
           {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Recursos</h4>
              <div className="flex flex-col gap-2">
                {lesson.link && !isEditingLink && (
                   <div className="flex items-center gap-2 text-sm text-google-blue">
                     <LinkIcon size={16} />
                     <a href={lesson.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                       Link da Aula <ExternalLink size={12}/>
                     </a>
                   </div>
                )}
                {lesson.resources && (
                  <div className="flex items-center gap-2 text-sm text-google-blue">
                    <FileText size={16} />
                    <span>{lesson.resources}</span>
                  </div>
                )}
                {lesson.presentation && (
                  <div className="flex items-center gap-2 text-sm text-google-blue">
                    <MonitorPlay size={16} />
                    <span>{lesson.presentation}</span>
                  </div>
                )}
                
                {/* Link Editor */}
                <div className="mt-2">
                    {!isEditingLink ? (
                         <button onClick={() => setIsEditingLink(true)} className="text-xs text-google-blue font-medium hover:underline flex items-center gap-1">
                           {lesson.link ? "Editar Link" : "+ Adicionar Link da Aula"}
                         </button>
                    ) : (
                        <div className="flex items-center gap-2 mt-1">
                            <input 
                                type="text" 
                                value={linkText} 
                                onChange={(e) => setLinkText(e.target.value)}
                                placeholder="https://..."
                                className="flex-1 text-sm p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-google-blue"
                            />
                            <button onClick={saveLink} className="text-xs bg-google-blue text-white px-2 py-1 rounded">Ok</button>
                            <button onClick={() => setIsEditingLink(false)} className="text-xs text-gray-500 hover:text-gray-700">X</button>
                        </div>
                    )}
                </div>

                {!lesson.resources && !lesson.presentation && !lesson.link && !isEditingLink && <span className="text-sm text-gray-400">Nenhum recurso anexado.</span>}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Ações</h4>
               <label className="block text-sm text-gray-600 mb-1">Alterar Status:</label>
               <select 
                  value={lesson.status} 
                  onChange={handleStatusChange}
                  className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-google-blue focus:ring focus:ring-google-blue focus:ring-opacity-50 p-2 border"
                >
                  <option value="Preparar">Preparar</option>
                  <option value="Preparando">Preparando</option>
                  <option value="Entregue">Entregue</option>
                </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase">Observações</h4>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="text-xs text-google-blue font-medium hover:underline">
                  Editar
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <textarea
                  className="w-full text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-google-blue"
                  rows={3}
                  value={obsText}
                  onChange={(e) => setObsText(e.target.value)}
                  placeholder="Adicione observações sobre a aula..."
                />
                <div className="flex justify-end gap-2">
                   <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded">Cancelar</button>
                   <button onClick={saveObs} className="px-3 py-1 text-xs bg-google-blue text-white rounded hover:bg-blue-600">Salvar</button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600 italic bg-white p-2 rounded border border-gray-200">
                {lesson.observations || "Nenhuma observação registrada."}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonCard;