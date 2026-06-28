# Tasks — Feature 06 Relatórios com IA

## T06.1 — ReportTypeSelector Component
- Criar `src/components/ReportTypeSelector.tsx`
- Props: options[], selected, onChange
- Visual: lista de cards com borda azul + check no selecionado
- **Verify**: Seleção exclusiva funciona entre os 3 tipos

## T06.2 — NarrativeToneSelector Component
- Criar `src/components/NarrativeToneSelector.tsx`
- Props: options[], selected[], onChange (múltipla seleção)
- Visual: pílulas toggle (indigo quando ativo, borda cinza quando inativo)
- **Verify**: Pode selecionar múltiplos tons simultaneamente

## T06.3 — Serviço Claude API
- Criar `src/services/claudeApi.ts`
- Função `generateReport(params): Promise<string>`
- Usa `@anthropic-ai/sdk` ou fetch direto para `/v1/messages`
- Modelo: `claude-haiku-4-5-20251001`
- Constrói prompt com dados do seed
- Retorna texto completo (ou stream — ver T06.4)
- Lê `import.meta.env.VITE_ANTHROPIC_API_KEY`
- **Verify**: Chamada retorna texto sem erro (requer API key válida no .env.local)

## T06.4 — Streaming (nice-to-have)
- Adaptar T06.3 para retornar ReadableStream
- Hook `useStreamingText(stream)` → string progressiva
- Cursor piscante enquanto streama
- **Verify**: Texto aparece progressivamente

## T06.5 — GeneratedReport Component
- Criar `src/components/GeneratedReport.tsx`
- Props: content (string markdown), reportType, period
- Tags de identificação + botões PDF/DOCX
- Métricas em destaque (3 cards)
- Renderiza markdown com `react-markdown`
- **Verify**: Relatório simulado renderiza corretamente

## T06.6 — RelatoriosIA Page
- Criar `src/pages/RelatoriosIA.tsx`
- Estado: form (tipo, projeto, tom), status (idle|loading|done|error), content
- Formulário esquerdo + painel direito
- Painel direito: EmptyState | Skeleton | GeneratedReport
- Chama `generateReport()` ao submeter
- **Verify**: Fiel ao design 05-RelatoriosIA.png e 05b-RelatorioGerado.png

## Dependências
T01 completo → T06.1 + T06.2 (paralelos) → T06.3 → T06.4 → T06.5 → T06.6
