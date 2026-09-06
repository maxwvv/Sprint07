import { describe, it, expect } from 'vitest'
import { scoreRiasec, riasecQuestions } from '@/data/riasec'

const answersForType = (type, value = 5) =>
  riasecQuestions.reduce((acc, q) => {
    acc[q.id] = q.type === type ? value : 1
    return acc
  }, {})

describe('scoreRiasec', () => {
  it('soma a pontuação por tipo a partir das respostas', () => {
    const { scores } = scoreRiasec(answersForType('S'))
    // 2 perguntas do tipo S com valor 5
    expect(scores.S).toBe(10)
    // demais tipos: 2 perguntas com valor 1
    expect(scores.R).toBe(2)
  })

  it('coloca o tipo mais forte no topo do ranking', () => {
    const { ranking, top } = scoreRiasec(answersForType('E'))
    expect(ranking[0]).toBe('E')
    expect(top).toContain('E')
  })

  it('retorna empate quando dois tipos têm a mesma pontuação', () => {
    const answers = riasecQuestions.reduce((acc, q) => {
      acc[q.id] = q.type === 'A' || q.type === 'I' ? 5 : 1
      return acc
    }, {})
    const { top } = scoreRiasec(answers)
    expect(top.sort()).toEqual(['A', 'I'])
  })

  it('é resiliente a respostas ausentes ou inválidas', () => {
    const { scores } = scoreRiasec({ 1: undefined, 2: 'x', 3: null })
    expect(Object.values(scores).every((n) => Number.isFinite(n))).toBe(true)
  })
})
