
export type Status = 'Preparar' | 'Preparando' | 'Entregue';

export interface Lesson {
  id: string;
  blockId: string; // Links to a specific Curricular Unit (Bloco)
  number: string; // "Aula 01"
  date: string; // ISO Date string YYYY-MM-DD
  title: string;
  description: string;
  status: Status;
  resources?: string; // "Roteiro"
  presentation?: string; // "Apresentação"
  observations?: string;
  link?: string; // Link da aula
}

export interface CurricularUnit {
  id: string;
  name: string; // Nome da UC
  code: string; // Código da turma
  shift: string; // Turno
  description: string;
  diary?: string; // Diário de classe
  location?: string; // Local
  driveLink?: string; // Link do google drive
}

export interface AppContextType {
  lessons: Lesson[];
  units: CurricularUnit[];
  updateLessonStatus: (id: string, status: Status) => void;
  updateLessonObservation: (id: string, text: string) => void;
  updateLessonLink: (id: string, link: string) => void;
  addUnit: (unit: CurricularUnit) => void;
  updateUnit: (unit: CurricularUnit) => void;
  deleteUnit: (id: string) => void;
}
