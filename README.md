<div align="center">

# 🎯 Alvo Certo

**Plataforma de apoio ao estudante — teste vocacional interativo, técnicas de estudo e panorama de profissões.**

Single Page Application em **Vue 3 + Vite**, com autenticação consumindo API REST, testes
automatizados (Vitest + Cypress) e interface responsiva e acessível.

![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/tested_with-Vitest-6da743?logo=vitest&logoColor=white)
![Cypress](https://img.shields.io/badge/e2e-Cypress-17202c?logo=cypress&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

</div>

---

## 📌 Sobre o projeto

O **Alvo Certo** é um projeto de portfólio, originado de um trabalho acadêmico (Sprints 07 e 08).
A proposta é reduzir a distância entre o estudante e a informação que ajuda a decidir **o que
estudar** e **que carreira seguir**.

O foco é entregar **ferramentas**, não apenas conteúdo: um teste vocacional interativo baseado
no modelo **RIASEC (Holland)** que calcula o perfil do usuário e recomenda áreas e profissões
com afinidade, além de um painel autenticado com técnicas de estudo e um panorama de profissões
por grande área.

> ⚠️ **É uma demonstração.** Não representa uma empresa real. Os formulários enviam para uma API
> de teste (MockAPI) apenas para exercitar os fluxos.

## 🔗 Demo

<!-- Adicione a URL após publicar o deploy (Vercel, Netlify ou GitHub Pages). -->

_Deploy ainda não publicado._

## ✨ Funcionalidades

| Área                 | O que faz                                                                                                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Landing page**     | Apresentação do produto: hero, números, "o que você encontra", "como funciona" e CTAs.                                                                                                                                      |
| **Teste vocacional** | Questionário RIASEC de 12 perguntas, com barra de progresso, cálculo de perfil, recomendação de áreas/carreiras e persistência do último resultado (`localStorage`). Público — não exige cadastro.                          |
| **Cadastro / Login** | Formulários com validação em tempo real, feedback de erro e estados de carregamento. Consome API REST (MockAPI), verifica duplicidade de usuário e não trafega a senha na _querystring_.                                    |
| **Painel do aluno**  | Rota protegida por _navigation guard_. Saudação personalizada, técnicas de estudo com vídeos, roteiro de escolha profissional, teste vocacional embutido e profissões em alta (valores em BRL). A seção ativa é persistida. |
| **Contato**          | Formulário validado que registra a mensagem na API de teste, com estados de sucesso e erro.                                                                                                                                 |
| **404**              | Página dedicada para rotas inexistentes.                                                                                                                                                                                    |

## 🧰 Stack e ferramentas

- **Vue 3** (`<script setup>`, Composition API) + **Vue Router 4** (rotas _lazy_, guards, `scrollBehavior`)
- **Vite 6** — build e dev server
- **Axios** — cliente HTTP único, URL base via variável de ambiente
- **Design system próprio em CSS** (`src/assets/styles/main.css`) — tokens em custom properties,
  sem framework CSS
- **Vitest** + **@vue/test-utils** — testes unitários e de componente
- **Cypress** — testes end-to-end e de API
- **ESLint** + **Prettier** — padronização e qualidade de código

## 📁 Estrutura de pastas

```
src/
├─ assets/
│  ├─ imagem.png           # logo
│  └─ styles/main.css      # design system (tokens, botões, cards, formulários, reset)
├─ components/
│  ├─ layout/              # AppHeader (responsivo), AppFooter
│  ├─ ui/                  # AppInput, FeatureCard, AppIcon (SVG inline)
│  ├─ AuthLayout.vue       # casca compartilhada de Login e Cadastro
│  └─ VocationalQuiz.vue   # teste vocacional interativo
├─ composables/
│  └─ useAuth.js           # estado de autenticação (singleton) + ações
├─ data/                   # conteúdo estático desacoplado da UI
│  ├─ features.js  aboutCards.js  studyTechniques.js
│  └─ vocationalTests.js  careers.js  riasec.js
├─ router/index.js         # rotas, guards e títulos de página
├─ services/api.js         # instância Axios
└─ views/                  # Home, Sobre, Contato, Login, Cadastro,
                           # TesteVocacional, Paineldoaluno, NotFound
tests/                     # Vitest (unit/componente) + setup
cypress/e2e/               # testes end-to-end e de API
```

## 🚀 Como rodar

### Pré-requisitos

- Node.js **20+** (ver `.nvmrc`)
- npm 10+

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. (opcional) configurar a API
cp .env.example .env        # ajuste VITE_API_BASE_URL se necessário

# 3. Ambiente de desenvolvimento
npm run dev                 # http://localhost:5173

# 4. Build de produção + preview
npm run build
npm run preview
```

## 🧪 Testes e qualidade

```bash
# Lint e formatação
npm run lint                # ESLint
npm run format              # Prettier --write

# Unitários / componente (Vitest)
npm test                    # execução única
npm run test:watch          # modo watch

# End-to-end (Cypress) — requer a aplicação rodando em outro terminal
npm run dev
npm run test:e2e            # headless
npm run test:e2e:open       # interface interativa
```

Cobertura atual dos testes unitários: `App`, `Home`, `Contato`, o algoritmo de pontuação do
teste vocacional (`scoreRiasec`) e o componente `VocationalQuiz` (fluxo completo).
Os testes E2E cobrem navegação, 404, cadastro, login, rota protegida, logout e o fluxo
cadastro → login → painel, além de dois testes diretos de API.

## 🏗️ Decisões técnicas em destaque

- **Design system sem framework CSS**: tokens em CSS custom properties (`--ac-*`), um reset
  enxuto e componentes reaproveitados. O bundle de CSS ficou em ~30 KB (era ~370 KB com o
  Bootstrap importado inteiro, que não era usado).
- **Ícones em SVG inline** (`AppIcon.vue`): evita baixar uma webfont de ~300 KB para poucos glifos.
- **Rotas _lazy_ + code splitting**: cada tela vira um chunk separado no build.
- **Navigation guard** para `/paineldoaluno` e `guestOnly` para login/cadastro.
- **Estado de autenticação como _singleton_** no escopo do módulo — compartilhado por header,
  painel e guards sem biblioteca de estado global.
- **Acessibilidade**: HTML semântico (`header`/`main`/`footer`/`nav`), _skip link_,
  `:focus-visible` consistente, `aria-*` no menu e no progresso do quiz, `prefers-reduced-motion`.
- **Ilustração do hero em SVG inline** no lugar de uma imagem pesada.

## 🗺️ Melhorias futuras

- [ ] Salvar o resultado do teste vocacional no perfil do usuário (API), não só no `localStorage`.
- [ ] Autenticação real com backend (hash de senha, token/JWT).
- [ ] Histórico de resultados e trilha de estudos personalizada por perfil.
- [ ] Converter o logo (`imagem.png`) para SVG/WebP.
- [ ] Testes de acessibilidade automatizados (axe) e CI (GitHub Actions).

## 🌐 Deploy

Projeto 100% estático após `npm run build` (pasta `dist/`). Compatível com Vercel, Netlify ou
GitHub Pages. Para SPAs, configure o _fallback_ de rotas para `index.html`. Em GitHub Pages,
ajuste `base` no `vite.config.js` para `/<nome-do-repo>/`.

## 📄 Licença

[MIT](LICENSE).
