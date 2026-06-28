# Tasks — Feature 02 Dashboard Executivo

## T02.1 — KpiCard Component
- Criar `src/components/KpiCard.tsx`
- Props: icon, delta, deltaType ('up'|'down'), value, label
- Delta badge: verde se up, vermelho se down
- **Verify**: Renderiza com todos os 4 valores do seed

## T02.2 — PeriodToggle Component
- Criar `src/components/PeriodToggle.tsx`
- Props: periods[], activePeriod, onChange
- **Verify**: Toggle entre Mês/Trimestre/Ano destaca corretamente

## T02.3 — RevenueBarChart Component
- Criar `src/components/RevenueBarChart.tsx`
- Usar `BarChart` + `Bar` + `XAxis` + `Tooltip` do Recharts
- Dados: 12 meses de 2026 com valores crescentes até Dezembro
- Barra do mês atual (Dezembro) com fill indigo-600, demais indigo-200
- Valor total + delta % acima do gráfico
- **Verify**: 12 barras visíveis, última destacada

## T02.4 — RetentionDonutChart Component
- Criar `src/components/RetentionDonutChart.tsx`
- Usar `PieChart` + `Pie` com innerRadius para donut
- Segmento verde = 64%, cinza = 36%
- Label central "64% retenção" via `Label` do Recharts
- **Verify**: Donut exibe 64% na cor correta

## T02.5 — Dashboard Page
- Criar `src/pages/Dashboard.tsx`
- Compor: PeriodToggle → 4x KpiCard → RevenueBarChart + RetentionDonutChart
- Layout: grid 2 colunas para os 2 gráficos
- Conectar ao `useAppData()` para dados
- **Verify**: Página completa fiel ao design 01-Dashboard.png

## Dependências
T01 completo → T02.1 + T02.2 (paralelos) → T02.3 + T02.4 (paralelos) → T02.5
