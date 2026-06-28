# Tasks — Feature 05 CRM de Doadores

## T05.1 — SegmentBadge Component
- Criar `src/components/SegmentBadge.tsx`
- Props: segment ('Grande doador' | 'Recorrente' | 'Eventual')
- Cores: roxo, verde, cinza
- **Verify**: Todos os 3 segmentos renderizam

## T05.2 — EngagementBar Component
- Criar `src/components/EngagementBar.tsx`
- Props: score (number 0-100)
- Barra de progresso + número ao lado
- Cor: verde ≥70, âmbar 40-69, vermelho <40
- **Verify**: Score 92 → verde, 55 → âmbar, 21 → vermelho

## T05.3 — Doadores Page
- Criar `src/pages/Doadores.tsx`
- 4 KpiCards (reutiliza componente do Dashboard)
- Tabs de segmentação com estado ativo
- Botão "+ Campanha de reativação"
- Tabela com InitialsAvatar, SegmentBadge, EngagementBar
- Filtro por tab funcional
- Conectar ao `useAppData()`
- **Verify**: Fiel ao design 04-Doadores.png

## Dependências
T01 completo + T04.1 (InitialsAvatar) → T05.1 + T05.2 (paralelos) → T05.3
