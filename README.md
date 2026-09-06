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

## Sobre o projeto

Escolher uma carreira trava muita gente, e não por falta de vontade. A informação está espalhada
por dezenas de sites, costuma vir em linguagem difícil e quase nunca começa pelo que a pessoa
gosta de fazer.

O Alvo Certo junta num lugar só três coisas que ajudam nessa decisão: um teste vocacional que
devolve um perfil, técnicas de estudo explicadas de forma prática e um panorama de profissões
por área. O teste usa o modelo RIASEC (Holland): você responde 12 afirmações e recebe o perfil
dominante junto com as áreas e carreiras que mais combinam com ele.

O projeto nasceu de um trabalho acadêmico (Sprints 07 e 08) e hoje serve como peça de portfólio.

> **É uma demonstração.** Não representa uma empresa real. Os formulários gravam numa API de
> teste (MockAPI) só para exercitar os fluxos de envio.

## Demo

<!-- Adicione a URL após publicar o deploy (Vercel, Netlify ou GitHub Pages). -->

_Deploy ainda não publicado._

## Funcionalidades

| Página               | O que faz                                                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Landing page**     | Hero, números do projeto, seção "o que você encontra", "como funciona" e chamadas para ação.                                                                                                                                                   |
| **Teste vocacional** | 12 perguntas do modelo RIASEC, com barra de progresso e cálculo de perfil. Recomenda áreas e carreiras e guarda o último resultado no `localStorage`. Aberto ao público, sem cadastro.                                                         |
| **Cadastro e login** | Validação em tempo real, mensagens de erro e estado de carregamento. Fala com a API REST (MockAPI), checa se o usuário já existe e nunca manda a senha na _query string_.                                                                      |
| **Painel do aluno**  | Rota protegida por _navigation guard_. Saudação personalizada, técnicas de estudo com vídeo, roteiro de escolha profissional, o teste vocacional embutido e profissões em alta com valores em reais. A seção aberta fica salva entre visitas.  |
| **Contato**          | Formulário validado que grava a mensagem na API de teste, com retorno de sucesso e de erro.                                                                                                                                                    |
| **Página 404**       | Tela própria para endereços que não existem.                                                                                                                                                                                                  |

## Stack e ferramentas

- Vue 3 (`<script setup>`, Composition API) e Vue Router 4, com rotas _lazy_, guards e `scrollBehavior`
- Vite 6 para build e servidor de desenvolvimento
- Axios: um único cliente HTTP, com a URL base vinda de variável de ambiente
- Design system próprio em CSS (`src/assets/styles/main.css`): tokens em custom properties, sem framework CSS
- Vitest e @vue/test-utils para testes de unidade e de componente
- Cypress para testes de ponta a ponta e de API
- ESLint e Prettier para padronizar o código

## Estrutura de pastas

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

## Como rodar

### Pré-requisitos

- Node.js 20+ (ver `.nvmrc`)
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

## Testes e qualidade

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

Os testes de unidade cobrem `App`, `Home`, `Contato`, o cálculo de perfil do teste
(`scoreRiasec`) e o fluxo completo do componente `VocationalQuiz`. Os testes de ponta a ponta
passam por navegação, página 404, cadastro, login, rota protegida, logout e o caminho
cadastro para login para painel, mais dois testes que batem direto na API.

## Decisões técnicas

- **Design system sem framework CSS.** Tokens em custom properties (`--ac-*`), um reset curto e
  componentes reaproveitados. O CSS final ficou em cerca de 30 KB. Com o Bootstrap importado
  inteiro, que o projeto não usava, eram cerca de 370 KB.
- **Ícones em SVG inline** (`AppIcon.vue`), no lugar de uma webfont de cerca de 300 KB para meia
  dúzia de glifos.
- **Rotas _lazy_ com code splitting.** Cada tela vira um arquivo separado no build.
- **`navigation guard`** em `/paineldoaluno` e **`guestOnly`** em login e cadastro.
- **Estado de autenticação como _singleton_** no escopo do módulo. Header, painel e guards
  compartilham o mesmo estado sem biblioteca de estado global.
- **Acessibilidade.** HTML semântico (`header`, `main`, `footer`, `nav`), _skip link_,
  `:focus-visible` consistente, `aria-*` no menu e na barra de progresso do teste, suporte a
  `prefers-reduced-motion`.
- **Ilustração do hero em SVG inline**, no lugar de uma imagem pesada.

## Licença

[MIT](LICENSE).
