
import { Lesson, CurricularUnit } from './types';

// Extracting Curricular Units based on "Bloco" descriptions in PDF
export const MOCK_UNITS: CurricularUnit[] = [
  {
    id: 'bloco1',
    name: 'Fundamentos Matemáticos Aplicados à Gestão',
    code: 'ADAG - V5',
    shift: 'Noite',
    description: 'Bloco 1: Matemática básica, estatística e análise de dados.',
    location: 'Sala 302',
    diary: 'https://diario.escola.com.br/adag-v5',
    driveLink: 'https://drive.google.com/drive/folders/xyz'
  },
  {
    id: 'bloco2',
    name: 'Aplicação de Estatística e Ferramentas Digitais',
    code: 'ADAG - V5',
    shift: 'Noite',
    description: 'Bloco 2: Excel, Google Sheets, Power BI e análise visual.',
    location: 'Lab Informática 1',
    diary: 'https://diario.escola.com.br/adag-v5'
  },
  {
    id: 'bloco3_dash',
    name: 'Dashboards e Tomada de Decisão',
    code: 'DEIU - V1',
    shift: 'Noite',
    description: 'Bloco 3: Criação de dashboards, KPIs e apresentações.',
    location: 'Lab Informática 2',
    driveLink: 'https://drive.google.com/drive/folders/abc'
  },
  {
    id: 'bloco3_prog',
    name: 'Programação, Segurança e Documentação',
    code: 'DEIU - V1',
    shift: 'Noite',
    description: 'Bloco 3: IoT, Segurança da Informação, Documentação Técnica.',
    location: 'Lab IoT',
    diary: 'https://diario.escola.com.br/deiu-v1'
  }
];

// Extracting Lessons from the provided PDF pages (sample set for functionality)
export const MOCK_LESSONS: Lesson[] = [
  // Bloco 1
  {
    id: 'b1-01',
    blockId: 'bloco1',
    number: 'Aula 01',
    date: '2025-10-22',
    title: 'Introdução à Análise de Dados e Matemática Básica',
    description: 'Apresentação da Unidade Curricular. Operações Matemáticas: Conjuntos numéricos, Razão e proporção.',
    status: 'Entregue',
    resources: 'Aula 01 - Intro',
    observations: 'Estratégia de Aprendizagem'
  },
  {
    id: 'b1-02',
    blockId: 'bloco1',
    number: 'Aula 02',
    date: '2025-10-29',
    title: 'Matemática Aplicada aos Negócios',
    description: 'Regra de três simples e composta. Porcentagem em cenários financeiros.',
    status: 'Entregue',
    resources: 'Aula 2_ Mat',
    observations: 'Desafio de Logística'
  },
  // Bloco 2
  {
    id: 'b2-04',
    blockId: 'bloco2',
    number: 'Aula 04',
    date: '2025-11-12',
    title: 'Introdução ao software de Planilhas',
    description: 'Relevância do Google Sheets. Lógica condicional (SE, CONT.SE).',
    status: 'Entregue',
    resources: 'AULA 04 - Intro',
    presentation: 'apresentacao-04.pdf'
  },
  // Bloco 3 - Dashboards
  {
    id: 'b3d-07',
    blockId: 'bloco3_dash',
    number: 'Aula 07',
    date: '2025-12-03',
    title: 'Visualização de Dados: Gráficos Dinâmicos',
    description: 'Transformar dados brutos em visualizações interativas. Princípios de design.',
    status: 'Entregue',
    resources: 'AULA 07 - Vis',
    presentation: 'aula.html'
  },
  {
    id: 'b3d-08',
    blockId: 'bloco3_dash',
    number: 'Aula 08',
    date: '2025-12-10',
    title: 'Avaliação Objetiva',
    description: 'Aplicação de Avaliação Objetiva com o conteúdo apresentado.',
    status: 'Entregue',
    resources: 'Prova Objetiva',
    observations: 'RESUMO PARCIAL'
  },
  // Bloco 3 - Programação (IoT) - Based on Page 11 & 12
  {
    id: 'b3p-09',
    blockId: 'bloco3_prog',
    number: 'Aula 09',
    date: '2026-01-15',
    title: 'Boas Práticas de Programação e Integração IoT',
    description: 'Compreender técnicas e boas práticas. Código limpo.',
    status: 'Preparando',
    resources: 'Aula 09 - Boas Práticas'
  },
  {
    id: 'b3p-10',
    blockId: 'bloco3_prog',
    number: 'Aula 10',
    date: '2026-01-22',
    title: 'Desenvolvimento de Funcionalidades e Integração',
    description: 'Implementar funcionalidades específicas. Componentes visuais e lógicos.',
    status: 'Preparando',
    resources: 'Aula 10 - Dev'
  },
  {
    id: 'b3p-11',
    blockId: 'bloco3_prog',
    number: 'Aula 11',
    date: '2026-01-29',
    title: 'Segurança da Informação em Sistemas IoT',
    description: 'Vulnerabilidades em sistemas IoT. Autenticação e Criptografia.',
    status: 'Preparando',
    resources: 'Aula 11 - Sec'
  },
  {
    id: 'b3p-12',
    blockId: 'bloco3_prog',
    number: 'Aula 12',
    date: '2026-02-05',
    title: 'Documentação Técnica e Manual do Usuário',
    description: 'Elaborar documentação técnica detalhada. Criar manual do usuário.',
    status: 'Preparando',
    resources: 'Aula 12 - Doc'
  },
  {
    id: 'b3p-13',
    blockId: 'bloco3_prog',
    number: 'Aula 13',
    date: '2026-02-12',
    title: 'Integração Final e Apresentação de Resultados',
    description: 'Integrar todos os componentes. Testes completos.',
    status: 'Preparar'
  },
  {
    id: 'b3p-14',
    blockId: 'bloco3_prog',
    number: 'Aula 14',
    date: '2026-02-17',
    title: 'Aula Externa',
    description: 'Atividade prática externa.',
    status: 'Preparar'
  },
   {
    id: 'b3p-19',
    blockId: 'bloco3_prog',
    number: 'Aula 19',
    date: '2026-02-26',
    title: 'Avaliação Prática da Situação de Aprendizagem',
    description: 'Apresentação do protótipo final.',
    status: 'Preparar'
  }
];
