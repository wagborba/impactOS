# Tasks — Feature 03 Projetos Sociais

## T03.1 — StatusBadge Component
- Criar `src/components/StatusBadge.tsx`
- Props: status ('em_andamento' | 'planejamento' | 'concluido')
- Mapear para texto e cor: verde, âmbar, cinza
- **Verify**: Todos os 3 estados renderizam com cor correta

## T03.2 — OdsBadge Component
- Criar `src/components/OdsBadge.tsx`
- Props: ods (number[])
- Renderiza pílulas "ODS N" em cinza
- **Verify**: Múltiplos ODS renderizam em linha

## T03.3 — ProjectCard Component
- Criar `src/components/ProjectCard.tsx`
- Props: project (Project), onClick
- Layout fiel ao design: ícone, nome, badge status, categoria, descrição, métricas, ODS, período
- Valor arrecadado em verde
- Hover com sombra elevada
- **Verify**: Card renderiza com dados do projeto "Educação que Transforma"

## T03.4 — ProjectDrawer Component
- Criar `src/components/ProjectDrawer.tsx`
- Usar `Sheet` do shadcn/ui (side="right", width ~480px)
- Props: project (Project | null), onClose
- Conteúdo detalhado conforme spec PJ-05
- Botão "Ver relatório" navega para /relatorios
- **Verify**: Drawer abre e fecha, exibe dados corretos

## T03.5 — Projetos Page
- Criar `src/pages/Projetos.tsx`
- Estado: activeFilter, selectedProject, isDrawerOpen
- Filtro por status com tabs
- Grid 2 colunas de ProjectCard
- Integra ProjectDrawer
- Conectar ao `useAppData()`
- **Verify**: Fiel ao design 02-Projetos.png e 01-07-Projetos-Drawer.png

## Dependências
T01 completo → T03.1 + T03.2 (paralelos) → T03.3 → T03.4 → T03.5
