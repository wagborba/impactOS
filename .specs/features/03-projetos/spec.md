# Feature 03 — Projetos Sociais

## Objetivo

Gestão de projetos sociais da organização com visualização em cards, filtros por status e painel de detalhes (drawer).

## Requisitos

### PJ-01 Cabeçalho da Página
- Título: "Projetos Sociais"
- Subtítulo: "[N] projetos · [M] beneficiários impactados" (dinâmico)

### PJ-02 Barra de Filtros
- Tabs de filtro: Todos · [N] | Em andamento · [N] | Planejamento · [N] | Concluído · [N]
- Tab ativo: fundo preto, texto branco; inativo: texto cinza
- Botão "+ Novo projeto" (canto direito, indigo, ação: abre drawer em modo criação — MVP: apenas visual)

### PJ-03 Grid de Cards de Projeto
- Layout: 2 colunas de cards
- Cada card contém:
  - Ícone do projeto (emoji ou imagem)
  - Nome do projeto + badge de status (verde "Em andamento", âmbar "Planejamento", cinza "Concluído")
  - Categoria com bolinha colorida (ex: "● Educação", "● Saúde")
  - Descrição curta (2 linhas, truncada)
  - 3 métricas: Beneficiários | Ações | Arrecadado (valor verde)
  - Badges ODS (ex: ODS 4, ODS 10) — pílulas cinzas
  - Período: "Mar – Dez 2026"
- Click no card → abre Drawer de detalhes

### PJ-04 Projetos Seed Data
| Projeto | Status | Categoria | Beneficiários | Ações | Arrecadado | ODS |
|---------|--------|-----------|--------------|-------|-----------|-----|
| Educação que Transforma | Em andamento | Educação | 320 | 41 | R$ 118,9k | 4, 10 |
| Prato Cheio | Em andamento | Segurança Alimentar | 540 | 38 | R$ 148k | 2, 1 |
| Semear Digital | Em andamento | Inclusão Digital | 180 | 22 | R$ 67k | 4, 8 |
| Mãos que Cuidam | Em andamento | Saúde | 95 | 31 | R$ 89k | 3 |
| Jovem Protagonista | Em andamento | Juventude | 149 | 18 | R$ 64k | 10, 16 |
| Arte & Cidadania | Planejamento | Cultura | 0 | 0 | R$ 0 | 11 |
| Casa Abrigo | Planejamento | Assistência | 0 | 0 | R$ 0 | 1, 10 |
| Verde Urbano | Concluído | Meio Ambiente | 200 | 45 | R$ 32k | 13, 15 |

### PJ-05 Drawer de Detalhes do Projeto
- Abre à direita (shadcn Drawer ou Sheet com side="right")
- Conteúdo:
  - Ícone + nome + badge status + categoria
  - Descrição completa
  - 3 métricas grandes (Beneficiários, Ações, Arrecadado)
  - Badges ODS
  - Período e barra de progresso temporal
  - Lista de ações recentes (3–5 itens)
  - Botão "Ver relatório" (navega para /relatorios)
- Fechar com X ou clique fora

### PJ-06 Filtro por Status
- Tab "Todos" mostra todos os cards
- Demais tabs filtram por `status`
- Contagem no label atualiza dinamicamente

## Critérios de Aceitação

- [ ] 8 projetos exibidos em grid 2 colunas
- [ ] Filtro por status funciona corretamente
- [ ] Contagem nos tabs é correta
- [ ] Click no card abre o drawer com dados do projeto
- [ ] Drawer fecha ao clicar fora ou no X
- [ ] Badge de status com cores corretas
