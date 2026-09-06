/**
 * Profissões por grande área. `riasec` liga a área aos tipos do teste
 * vocacional para que o resultado do quiz recomende carreiras.
 * `salario` em número permite ordenar/formatar na interface.
 */
export const careerAreas = [
  {
    area: 'Ciências Exatas e Tecnológicas',
    icon: '🔬',
    riasec: ['I', 'R'],
    cargos: [
      { nome: 'Engenheiro de Software', salario: 7500 },
      { nome: 'Arquiteto de Soluções (TI)', salario: 8000 },
    ],
  },
  {
    area: 'Ciências Biológicas e da Saúde',
    icon: '🌱',
    riasec: ['I', 'S'],
    cargos: [
      { nome: 'Médico', salario: 12000 },
      { nome: 'Enfermeiro', salario: 3800 },
    ],
  },
  {
    area: 'Ciências Humanas e Sociais',
    icon: '🧠',
    riasec: ['S', 'A'],
    cargos: [
      { nome: 'Professor Universitário', salario: 6000 },
      { nome: 'Psicólogo', salario: 3500 },
    ],
  },
  {
    area: 'Negócios, Administração e Direito',
    icon: '💼',
    riasec: ['E', 'C'],
    cargos: [
      { nome: 'Analista Financeiro', salario: 5500 },
      { nome: 'Advogado (início de carreira)', salario: 4500 },
    ],
  },
  {
    area: 'Artes, Design e Comunicação',
    icon: '🎨',
    riasec: ['A', 'E'],
    cargos: [
      { nome: 'Designer UX/UI', salario: 6000 },
      { nome: 'Especialista em Marketing Digital', salario: 5500 },
    ],
  },
  {
    area: 'Indústria, Produção e Meio Ambiente',
    icon: '⚙️',
    riasec: ['R', 'C'],
    cargos: [
      { nome: 'Engenheiro de Produção', salario: 7000 },
      { nome: 'Gestor Ambiental', salario: 4500 },
    ],
  },
]

export const formatBRL = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
