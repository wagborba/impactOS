# Feature 01 — Shell & Layout

## Objetivo

Estrutura base da aplicação: sidebar de navegação, header global, sistema de design e roteamento.

## Requisitos

### SH-01 Sidebar de Navegação
- Logo ImpactOS (ícone azul + texto) no topo
- Nome da organização: "Instituto Semear" abaixo do logo
- Seção **GESTÃO**: Dashboard, Projetos, Beneficiários, Doadores
- Seção **INTELIGÊNCIA**: Relatórios IA (badge "IA"), Assistente (badge "IA")
- Indicador de plano (verde): "Plano Crescer · 8 de 10 projetos usados neste mês" com barra de progresso
- Avatar + nome + cargo do usuário no rodapé: "MA · Marina Alves · Diretora Executiva" com chevron down
- Item ativo com fundo indigo-100 e texto indigo-700
- Largura fixa: 240px

### SH-02 Header Global
- Título da página (h1) + subtítulo abaixo (varia por rota)
- Campo de busca global (placeholder: "Buscar...")
- Botão primário "✦ Copiloto" (ação: navega para /assistente)
- Ícone de notificação (sino) com indicador visual
- Sem borda inferior; background transparente

### SH-03 Layout
- Sidebar fixa à esquerda, conteúdo rola à direita
- Content area: padding 24px
- Breakpoint mobile: sidebar colapsa (fora do escopo MVP)

### SH-04 Design System
- Tailwind config com tokens de cor (ver PROJECT.md)
- Tipografia: Inter (Google Fonts)
- Componentes base via shadcn/ui: Button, Badge, Input, Card, Table, Drawer, Tabs, Select, Avatar, Progress
- Ícones: lucide-react

### SH-05 Roteamento
- React Router v6 com createBrowserRouter
- Rotas aninhadas sob layout Shell
- Redirect `/` → `/dashboard`

### SH-06 Mock Data Provider
- Context `AppDataContext` provê dados globais: org, user, projetos, beneficiários, doadores, kpis
- Seed data completa do Instituto Semear em `src/data/seed.ts`

## Critérios de Aceitação

- [ ] Navegação entre todas as 6 rotas funciona sem reload
- [ ] Item ativo na sidebar reflete a rota atual (useLocation)
- [ ] Logo e nome da org visíveis
- [ ] Plano indicator mostra progresso correto (80%)
- [ ] Botão Copiloto navega para /assistente
- [ ] Header muda título/subtítulo conforme a rota
