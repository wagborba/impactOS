# Feature 05 — CRM de Doadores

## Objetivo

Gestão do relacionamento com doadores: visão de arrecadação, segmentação, score de engajamento e identificação de risco de churn.

## Requisitos

### DO-01 Cabeçalho da Página
- Título: "CRM de Doadores"
- Subtítulo: "312 doadores ativos · R$ 487.250 arrecadados"

### DO-02 Cards KPI (4 cards)
| # | Label | Valor | Delta |
|---|-------|-------|-------|
| 1 | Total arrecadado | R$ 487.250 | +18% (verde) |
| 2 | Doadores ativos | 312 | +47 (verde) |
| 3 | Ticket médio | R$ 185 | -4% (vermelho) |
| 4 | Em risco de churn | 38 | badge "atenção" (vermelho) |

### DO-03 Tabs de Segmentação
- Todos | Recorrentes | Grandes doadores | Em risco · 38
- Tab "Em risco" com badge vermelho com contagem
- Ativo: fundo preto, texto branco

### DO-04 Botão de Campanha
- "+ Campanha de reativação" — indigo, canto direito acima da tabela
- MVP: apenas visual (sem modal)

### DO-05 Tabela de Doadores
- Colunas: DOADOR | SEGMENTO | TOTAL DOADO | ÚLTIMA DOAÇÃO | ORIGEM | ENGAJAMENTO
- DOADOR: Avatar com iniciais + nome + email (truncado)
- SEGMENTO: badge colorido ("Grande doador" = roxo, "Recorrente" = verde, "Eventual" = cinza)
- TOTAL DOADO: valor em reais formatado
- ÚLTIMA DOAÇÃO: tempo relativo ("2 dias atrás", "1 semana", etc.)
- ORIGEM: texto ("Evento", "Indicação", "Site", "Redes Sociais")
- ENGAJAMENTO: barra de progresso colorida + número (0-100)
  - ≥70: verde
  - 40-69: âmbar
  - <40: vermelho

### DO-06 Score de Engajamento
- Barra horizontal `<progress>` estilizada com Tailwind
- Largura da barra proporcional ao score
- Número ao lado da barra

### DO-07 Seed Data — Doadores
| Nome | Segmento | Total Doado | Última Doação | Origem | Engajamento | Em Risco |
|------|----------|------------|--------------|--------|-------------|----------|
| Carlos Mendes | Grande doador | R$ 24.500 | 2 dias atrás | Evento | 92 | não |
| Fernanda Costa | Recorrente | R$ 8.400 | 5 dias atrás | Indicação | 84 | não |
| Roberto Almeida | Recorrente | R$ 6.200 | 1 semana | Site | 71 | não |
| Patrícia Nunes | Grande doador | R$ 18.000 | 2 semanas | Evento | 55 | sim |
| André Souza | Eventual | R$ 1.500 | 3 semanas | Redes Sociais | 32 | sim |
| Claudia Martins | Recorrente | R$ 4.800 | 1 mês | Indicação | 48 | sim |
| Gabriel Lima | Eventual | R$ 800 | 2 meses | Site | 21 | sim |
| Ana Paula Ramos | Grande doador | R$ 32.000 | 3 dias | Evento | 95 | não |
| Marcio Oliveira | Recorrente | R$ 3.600 | 4 dias | Site | 78 | não |
| Silvia Alves | Eventual | R$ 1.200 | 6 semanas | Redes Sociais | 18 | sim |

### DO-08 Filtro por Segmento
- "Todos": todos os doadores
- "Recorrentes": segment === 'Recorrente'
- "Grandes doadores": segment === 'Grande doador'
- "Em risco": atChurnRisk === true (contagem = 38 no seed, tabela mostra subset)

## Critérios de Aceitação

- [ ] 4 KPI cards com valores e deltas corretos
- [ ] Card "Em risco" com badge "atenção" vermelho
- [ ] Tabs filtram corretamente
- [ ] Tabela com 10+ doadores
- [ ] Badges de segmento com cores corretas
- [ ] Barra de engajamento com cor baseada no score
