# ImpactOS — Plataforma de Gestão de Impacto Social

## Visão

ImpactOS é uma plataforma SaaS para organizações do terceiro setor (ONGs, institutos, fundações) gerenciarem projetos sociais, beneficiários, doadores e prestação de contas — com inteligência artificial integrada para análise e narrativa automática.

## Problema

Organizações sociais enfrentam três gargalos operacionais críticos:
1. **Dados dispersos** — projetos, beneficiários e doadores em planilhas desconectadas
2. **Prestação de contas manual** — relatórios para financiadores consomem dias de trabalho
3. **Relacionamento reativo com doadores** — sem visibilidade de churn ou engajamento

## Solução

Dashboard unificado com IA integrada que:
- Centraliza gestão de projetos sociais e impacto (ODS)
- Automatiza relatórios de prestação de contas via LLM
- Oferece CRM de doadores com alertas de risco de churn
- Disponibiliza assistente conversacional conectado aos dados da organização

## Organização Demo

**Instituto Semear** · Usuária: Marina Alves (Diretora Executiva)
- 8 projetos ativos · 1.284 beneficiários · 312 doadores · R$ 487k arrecadados

## Público-Alvo

- **Primário**: Diretores e coordenadores de ONGs médias (10–100 projetos/ano)
- **Secundário**: Captadores de recursos e analistas de impacto

## Proposta de Valor

| Usuário | Dor | Solução ImpactOS |
|---------|-----|-----------------|
| Diretora Executiva | Visão consolidada de impacto e captação | Dashboard Executivo com KPIs em tempo real |
| Captador de Recursos | Relatórios manuais para financiadores | Relatórios IA com 1 clique |
| Gestora de Projetos | Controle de beneficiários por projeto | Módulo de gestão integrada |
| Analista de Doações | Identificar doadores em risco | CRM com score de engajamento e alertas de churn |

## Planos

- **Plano Crescer** (demo): até 10 projetos, IA incluída
- Indicador de uso exibido na sidebar (8 de 10 projetos usados)

## Tecnologia

- **Frontend**: React 18 + Vite + TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Gráficos**: Recharts
- **Roteamento**: React Router v6
- **Estado**: React Context + useState (sem Redux — escopo atual não exige)
- **IA**: Claude API (Anthropic) — Relatórios e Assistente
- **Dados**: Mock JSON (seed data) simulando backend

## Paleta de Cores (extraída do design)

- `primary`: #4F46E5 (indigo)
- `primary-light`: #EEF2FF
- `success`: #10B981 (verde — deltas positivos)
- `danger`: #EF4444 (vermelho — deltas negativos, churn)
- `warning`: #F59E0B (âmbar — atenção)
- `background`: #F8FAFC
- `sidebar-bg`: #FFFFFF
- `card-bg`: #FFFFFF
- `text-primary`: #0F172A
- `text-muted`: #64748B
- `border`: #E2E8F0
