# Tasks — Feature 01 Shell

## T01.1 — Setup do Projeto
- `npm create vite@latest impactOS -- --template react-ts`
- Instalar dependências: tailwindcss, react-router-dom, lucide-react, recharts, clsx, tailwind-merge
- Configurar Tailwind com tokens de cor customizados
- Instalar shadcn/ui e adicionar componentes: button, badge, card, input, table, drawer, tabs, select, avatar, progress
- Instalar fonte Inter via index.html
- **Verify**: `npm run dev` sobe sem erros

## T01.2 — Tipos TypeScript
- Criar `src/types/index.ts` com todas as interfaces (ver design.md)
- **Verify**: `tsc --noEmit` sem erros

## T01.3 — Mock Data Seed
- Criar `src/data/seed.ts` com dados completos do Instituto Semear
  - Organização, usuário, 8 projetos, 10+ beneficiários, 10+ doadores
  - KPIs do dashboard (total arrecadado, beneficiários, projetos ativos, ticket médio)
  - Dados de receita mensal (12 meses 2026)
  - Retenção de doadores (64%)
- **Verify**: Importar seed em console sem erros de tipo

## T01.4 — AppDataContext
- Criar `src/context/AppDataContext.tsx`
- Provider com todos os dados do seed
- Hook `useAppData()` para consumo
- **Verify**: Context acessível em componente filho

## T01.5 — Sidebar
- Criar `src/components/Sidebar.tsx`
- Logo + nome da org
- Itens de navegação com `NavLink` (highlight ativo)
- Badges "IA" em Relatórios e Assistente
- Indicador de plano com `Progress`
- Rodapé com `Avatar` + nome + cargo
- **Verify**: Navegação funciona, item ativo destaca corretamente

## T01.6 — Header
- Criar `src/components/Header.tsx`
- Título/subtítulo dinamicamente via contexto de rota (ou prop)
- Input de busca com ícone Search
- Botão Copiloto → navega para /assistente
- Ícone Bell para notificações
- **Verify**: Título muda ao navegar entre rotas

## T01.7 — AppLayout + Roteamento
- Criar `src/layouts/AppLayout.tsx` (Sidebar + Header + Outlet)
- Criar `src/main.tsx` com createBrowserRouter e rotas aninhadas
- Criar páginas placeholder para cada rota
- **Verify**: Todas as 6 rotas navegam sem erro 404

## Dependências entre Tasks
T01.1 → T01.2 → T01.3 → T01.4 → T01.5 + T01.6 → T01.7
