# Feature 06 — Relatórios com IA

## Objetivo

Geração automática de relatórios de prestação de contas para financiadores, utilizando a Claude API para criar narrativas baseadas nos dados da organização.

## Requisitos

### RL-01 Cabeçalho da Página
- Título: "Relatórios com IA"
- Subtítulo: "Prestação de contas automática para financiadores"

### RL-02 Formulário de Geração (painel esquerdo)
- Cabeçalho do formulário: "✦ Gerar relatório"
- Campo **TIPO DE RELATÓRIO** (seleção exclusiva):
  - Relatório Mensal (padrão selecionado — borda azul + checkmark)
  - Relatório Anual
  - Relatório por Projeto
- Campo **PROJETO** (dropdown/select):
  - Opção padrão: "Todos os projetos"
  - Demais opções: lista de projetos do seed
- Campo **TOM DA NARRATIVA** (seleção múltipla de pílulas):
  - Institucional (selecionado por padrão — fundo azul/indigo)
  - Financiadores
  - Redes sociais
- Botão "Gerar Relatório" (indigo, full width) — aciona a chamada à IA

### RL-03 Painel Direito — Estado Vazio
- Ícone de sparkles (✦) em fundo roxo-claro
- Título: "Relatório com Inteligência Artificial"
- Subtítulo: "A IA analisa seus projetos, ações, evidências e beneficiários para gerar uma prestação de contas pronta para os financiadores."

### RL-04 Painel Direito — Relatório Gerado
Após clicar em "Gerar Relatório":
- Tags: "RELATÓRIO MENSAL · JUNHO 2026" + botões PDF | DOCX (MVP: apenas visual)
- Título gerado: "Relatório de Impacto Social"
- Linha: "Instituto Semear · Período de 01 a 30 de junho de 2026"
- 3 métricas em destaque: 1.284 Beneficiários | 142 Ações realizadas | 8 Projetos ativos
- "Resumo executivo" — texto gerado pela IA (streamado ou completo)

### RL-05 Integração com Claude API
- Endpoint: Claude API via `fetch` com `anthropic` SDK
- Variável de ambiente: `VITE_ANTHROPIC_API_KEY`
- Modelo: `claude-haiku-4-5-20251001` (rápido e econômico para geração de texto)
- Prompt do sistema: contextualiza o modelo com dados da organização (org, projetos, métricas)
- Prompt do usuário: instrução de gerar relatório do tipo/projeto/tom selecionados
- Streaming da resposta para exibição progressiva (usando ReadableStream)
- Estado: idle → loading → streaming → done | error

### RL-06 Prompt Template

```
Sistema:
Você é o assistente de prestação de contas do Instituto Semear.
Dados da organização:
- Total arrecadado: R$ 487.250
- Beneficiários ativos: 1.284
- Projetos ativos: 8
- Ações realizadas no mês: 142

Projetos:
{lista dos projetos com nome, beneficiários, ações, arrecadado}

Gere um {tipo} com tom {tom} sobre o período de junho de 2026.
Inclua: resumo executivo, destaques por projeto, impacto social, perspectivas.
Formato: Markdown.
```

### RL-07 Loading State
- Skeleton loader no painel direito enquanto IA processa
- Ou spinner centralizado com "Gerando relatório..."
- Streaming linha a linha com cursor piscando (opcional, nice-to-have)

## Critérios de Aceitação

- [ ] Formulário com 3 campos funcionais (tipo, projeto, tom)
- [ ] Estado vazio exibido ao entrar na página
- [ ] Clicar em "Gerar Relatório" dispara chamada à API
- [ ] Loading state visível durante geração
- [ ] Relatório gerado exibido no painel direito
- [ ] Tags e botões PDF/DOCX visíveis (mesmo que não funcionais)
- [ ] Erro de API exibido com mensagem amigável
- [ ] VITE_ANTHROPIC_API_KEY configurável via .env.local
