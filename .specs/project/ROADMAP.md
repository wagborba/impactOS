# ImpactOS — Roadmap

## MVP (v1.0) — Implementação Atual

Todas as funcionalidades visíveis no design Figma, com mock data.

### Fase 1 — Shell & Infraestrutura
**Feature**: `01-shell`
- Layout base com sidebar + header
- Navegação entre módulos
- Design system (tokens, componentes base)

### Fase 2 — Core de Gestão
**Features**: `02-dashboard`, `03-projetos`, `04-beneficiarios`, `05-doadores`
- Dashboard Executivo com KPIs e gráficos
- CRUD de Projetos Sociais com drawer de detalhes
- Tabela de Beneficiários com filtros
- CRM de Doadores com segmentação e score

### Fase 3 — Inteligência Artificial
**Features**: `06-relatorios-ia`, `07-assistente`
- Geração de relatórios via Claude API
- Assistente conversacional (Copiloto ImpactOS)

## Status das Features

| # | Feature | Status | Prioridade |
|---|---------|--------|-----------|
| 01 | Shell & Layout | Pendente | P0 |
| 02 | Dashboard Executivo | Pendente | P0 |
| 03 | Projetos Sociais | Pendente | P1 |
| 04 | Beneficiários | Pendente | P1 |
| 05 | CRM de Doadores | Pendente | P1 |
| 06 | Relatórios IA | Pendente | P2 |
| 07 | Assistente IA | Pendente | P2 |

## Dependências

```
01-shell
  └── 02-dashboard (requer shell)
  └── 03-projetos  (requer shell)
  └── 04-beneficiarios (requer shell)
  └── 05-doadores (requer shell)
      └── 06-relatorios-ia (requer dados de projetos)
      └── 07-assistente (requer dados de todos os módulos)
```

## v2.0 — Futuro (não implementado no MVP)

- Autenticação real (Supabase/Firebase)
- Backend real com PostgreSQL
- Importação de dados (CSV/Excel)
- Integrações: Stripe (doações online), Salesforce NPSP
- Multi-tenant (múltiplas organizações)
- Mobile app (React Native)
