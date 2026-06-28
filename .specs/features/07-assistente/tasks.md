# Tasks — Feature 07 Assistente IA

## T07.1 — ChatMessage Component
- Criar `src/components/ChatMessage.tsx`
- Props: role ('user'|'assistant'), content, timestamp
- user: balão direita, fundo indigo-600, texto branco
- assistant: balão esquerda, fundo branco, borda sutil
- Timestamp em cinza abaixo do balão
- **Verify**: Ambos os estilos renderizam corretamente

## T07.2 — TypingIndicator Component
- Criar `src/components/TypingIndicator.tsx`
- 3 pontos animados (bounce) no estilo do assistente
- Exibido enquanto loading === true
- **Verify**: Animação CSS visível

## T07.3 — SuggestionChips Component
- Criar `src/components/SuggestionChips.tsx`
- Props: chips (string[]), onSelect (chip: string) => void
- Pílulas clicáveis, border cinza, hover com fundo cinza-50
- **Verify**: Click chama onSelect com texto correto

## T07.4 — useChat Hook
- Criar `src/hooks/useChat.ts`
- Estado: messages (Message[]), isLoading
- Função `sendMessage(content: string)`
  - Adiciona mensagem do user
  - Seta loading = true
  - Chama Claude API com histórico + system prompt
  - Adiciona resposta do assistant
  - Seta loading = false
- Inicializa com mensagem de boas-vindas do assistente
- **Verify**: Fluxo completo funciona com API key

## T07.5 — Assistente Page
- Criar `src/pages/Assistente.tsx`
- Header do chat (avatar ✦ + status conectado)
- Área de mensagens com scroll ref (useRef + scrollIntoView)
- ChatMessage para cada msg
- SuggestionChips (ocultos após primeira mensagem do user)
- TypingIndicator quando loading
- Input + botão envio
- Conectar ao useChat()
- **Verify**: Fiel ao design 06-Assistente.png

## Dependências
T01 completo + T06.3 (Claude API service, reutiliza) → T07.1 + T07.2 + T07.3 (paralelos) → T07.4 → T07.5
