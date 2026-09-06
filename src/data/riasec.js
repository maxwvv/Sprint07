/**
 * Modelo RIASEC (Holland) usado pelo teste vocacional interativo.
 * Cada pergunta pontua um tipo; a resposta é o grau de identificação (1 a 5).
 */

export const riasecTypes = {
  R: {
    nome: 'Realista',
    resumo: 'Gosta de atividades práticas, ferramentas, máquinas e resultados concretos.',
    areas: ['Engenharias', 'Tecnologia', 'Agropecuária', 'Produção industrial'],
  },
  I: {
    nome: 'Investigativo',
    resumo: 'Gosta de analisar, pesquisar, entender causas e resolver problemas complexos.',
    areas: ['Ciências exatas', 'Saúde', 'Pesquisa', 'Dados'],
  },
  A: {
    nome: 'Artístico',
    resumo: 'Gosta de criar, se expressar e trabalhar sem regras rígidas.',
    areas: ['Design', 'Comunicação', 'Artes', 'Arquitetura'],
  },
  S: {
    nome: 'Social',
    resumo: 'Gosta de ensinar, cuidar, orientar e trabalhar diretamente com pessoas.',
    areas: ['Educação', 'Psicologia', 'Saúde', 'Serviço social'],
  },
  E: {
    nome: 'Empreendedor',
    resumo: 'Gosta de liderar, negociar, assumir riscos e influenciar pessoas.',
    areas: ['Administração', 'Direito', 'Negócios', 'Marketing'],
  },
  C: {
    nome: 'Convencional',
    resumo: 'Gosta de organização, dados, processos claros e ambientes estruturados.',
    areas: ['Contabilidade', 'Finanças', 'Logística', 'Gestão de dados'],
  },
}

export const riasecQuestions = [
  {
    id: 1,
    type: 'R',
    texto: 'Gosto de consertar, montar ou construir coisas com as próprias mãos.',
  },
  {
    id: 2,
    type: 'I',
    texto: 'Fico curioso para entender por que as coisas funcionam de determinado jeito.',
  },
  {
    id: 3,
    type: 'A',
    texto: 'Tenho facilidade e prazer em criar (desenhar, escrever, compor, editar vídeos).',
  },
  { id: 4, type: 'S', texto: 'Sinto satisfação em ajudar e ensinar outras pessoas.' },
  { id: 5, type: 'E', texto: 'Gosto de convencer, liderar grupos e assumir a frente de projetos.' },
  { id: 6, type: 'C', texto: 'Me sinto bem organizando planilhas, listas e rotinas detalhadas.' },
  {
    id: 7,
    type: 'R',
    texto: 'Prefiro atividades ao ar livre ou com equipamentos a ficar só no computador.',
  },
  { id: 8, type: 'I', texto: 'Gosto de resolver problemas de lógica, matemática ou ciências.' },
  {
    id: 9,
    type: 'A',
    texto: 'Valorizo liberdade para fazer as coisas do meu jeito, sem seguir um padrão fixo.',
  },
  { id: 10, type: 'S', texto: 'As pessoas costumam me procurar para desabafar ou pedir conselho.' },
  { id: 11, type: 'E', texto: 'Tenho vontade de ter meu próprio negócio ou gerenciar uma equipe.' },
  {
    id: 12,
    type: 'C',
    texto: 'Gosto de seguir procedimentos claros e entregar tudo dentro das regras.',
  },
]

export const answerScale = [
  { value: 1, label: 'Discordo totalmente' },
  { value: 2, label: 'Discordo' },
  { value: 3, label: 'Neutro' },
  { value: 4, label: 'Concordo' },
  { value: 5, label: 'Concordo totalmente' },
]

/**
 * Calcula o resultado do teste.
 * @param {Record<number, number>} answers  mapa questaoId -> valor (1..5)
 * @returns {{ scores: Record<string, number>, ranking: string[], top: string[] }}
 */
export function scoreRiasec(answers) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }

  for (const question of riasecQuestions) {
    const value = Number(answers?.[question.id]) || 0
    scores[question.type] += value
  }

  const ranking = Object.keys(scores).sort((a, b) => scores[b] - scores[a])
  const top = ranking.filter((type) => scores[type] === scores[ranking[0]])

  return { scores, ranking, top: top.length ? top : ranking.slice(0, 1) }
}
