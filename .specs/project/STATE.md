# STATE — Memória do Projeto ImpactOS

## Decisões

| # | Decisão | Razão |
|---|---------|-------|
| D01 | React + Vite + TypeScript | Pedido explícito do usuário; Vite por performance de dev |
| D02 | Tailwind CSS | Matches the design tokens closely, utility-first for speed |
| D03 | shadcn/ui | Componentes acessíveis e customizáveis com Tailwind |
| D04 | Recharts | Lightweight, declarativo, bom suporte a bar/donut charts vistos no design |
| D05 | Mock data em JSON | MVP sem backend; seed data simula Instituto Semear |
| D06 | Claude API (Anthropic) para IA | Produto usa "Copiloto" — branding consistente com Claude |
| D07 | React Router v6 (createBrowserRouter) | Roteamento client-side padrão React |
| D08 | Context API para estado global | Escopo MVP não justifica Redux/Zustand |
| D09 | Subagentes para implementação | Pedido explícito: "utilize subagentes para otimizar tokens" |

## Arquitetura de Rotas

```
/                    → redirect → /dashboard
/dashboard           → Dashboard Executivo
/projetos            → Lista de Projetos Sociais
/beneficiarios       → Tabela de Beneficiários
/doadores            → CRM de Doadores
/relatorios          → Relatórios com IA
/assistente          → Assistente IA (Copiloto)
```

## Mock Data Seed (Instituto Semear)

- Organização: Instituto Semear
- Usuário: Marina Alves (Diretora Executiva)
- Plano: Crescer (10 projetos max, 8 usados)
- Projetos: 8 total (5 em andamento, 2 planejamento, 1 concluído)
- Beneficiários: 1.284 (96 novos este mês, 7 cidades, faixa 0-12 anos predominante)
- Doadores: 312 ativos (R$ 487.250 arrecadados, ticket médio R$ 185, 38 em risco de churn)

## Bloqueadores

Nenhum no momento.

## TODOs

- [ ] Implementar feature 01-shell
- [ ] Implementar feature 02-dashboard
- [ ] Implementar feature 03-projetos
- [ ] Implementar feature 04-beneficiarios
- [ ] Implementar feature 05-doadores
- [ ] Implementar feature 06-relatorios-ia
- [ ] Implementar feature 07-assistente

## Lições Aprendidas

_(preenchido durante implementação)_

## Ideias Adiadas (v2.0)

- Auth real com sessões persistentes
- Backend + banco de dados relacional
- Export real PDF/DOCX (jsPDF + docx.js)
- Internacionalização (i18n)
