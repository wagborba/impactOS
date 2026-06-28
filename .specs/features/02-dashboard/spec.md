# Feature 02 — Dashboard Executivo

## Objetivo

Visão consolidada de impacto e captação da organização, com KPIs, gráficos e toggle de período.

## Requisitos

### DB-01 Cabeçalho da Página
- Título: "Dashboard Executivo"
- Subtítulo: "Acompanhe o impacto e a captação do Instituto Semear"

### DB-02 Toggle de Período
- Opções: Mês | Trimestre | Ano
- Estado ativo destacado (botão preenchido indigo)
- Dados dos cards/gráficos reagem ao período selecionado (pode ser simulado com variação nos dados mock)

### DB-03 Cards KPI (4 cards)
Cada card contém: ícone emoji, delta (% com cor), valor principal grande, label

| # | Label | Valor | Delta | Ícone |
|---|-------|-------|-------|-------|
| 1 | Total arrecadado | R$ 487k | +18% (verde) | 💰 |
| 2 | Beneficiários | 1.284 | +12% (verde) | 🤝 |
| 3 | Projetos ativos | 8 | +2 (verde) | 📋 |
| 4 | Ticket médio | R$ 185 | -4% (vermelho) | ❤️ |

Layout: grid 4 colunas, cards brancos com sombra sutil.

### DB-04 Gráfico de Receita Mensal
- Título: "Receita mensal" + período "Arrecadação por mês · 2026"
- Valor destacado: "R$ 487.250" + "+18,2% vs. ano anterior" (verde)
- Gráfico de barras verticais com 12 meses (J a D)
- Barras azul-claro para meses anteriores, azul-escuro (indigo) para mês atual (Dezembro)
- Sem eixo Y explícito; eixo X com iniciais dos meses
- Componente: `BarChart` do Recharts

### DB-05 Gráfico de Retenção de Doadores
- Título: "Retenção de doadores" + "D30 · últimos 6 meses"
- Gráfico donut (anel) exibindo 64% no centro
- Cor do arco preenchido: verde (#10B981); restante: cinza claro
- Label central: "64%" + "retenção"
- Abaixo do gráfico: métricas (312, 47, 38) — visíveis parcialmente no design
- Componente: `PieChart` com `innerRadius` do Recharts

## Critérios de Aceitação

- [ ] 4 KPI cards renderizados com valores corretos
- [ ] Deltas com cor correta (verde positivo, vermelho negativo)
- [ ] BarChart com 12 barras e barra do mês atual destacada
- [ ] Donut chart mostrando 64% de retenção
- [ ] Toggle Mês/Trimestre/Ano funcional (dados podem mudar levemente)
- [ ] Layout responsivo: cards em 2x2 em telas menores (md breakpoint)
