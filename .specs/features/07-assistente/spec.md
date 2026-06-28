# Feature 07 — Assistente IA (Copiloto ImpactOS)

## Objetivo

Chat conversacional conectado aos dados da organização para responder perguntas sobre indicadores, projetos e doadores em linguagem natural.

## Requisitos

### AS-01 Cabeçalho da Página
- Título: "Assistente IA"
- Subtítulo: "Converse com seus dados em linguagem natural"

### AS-02 Header do Chat
- Avatar do Copiloto: ícone "✦" em fundo indigo
- Nome: "Copiloto ImpactOS"
- Status: "● Conectado aos seus dados" (ponto verde + texto)

### AS-03 Mensagem de Boas-Vindas (estado inicial)
- Balão de mensagem do assistente:
  > "Olá, Marina! Sou o copiloto do ImpactOS. Estou conectado aos dados do Instituto Semear e posso responder sobre indicadores, projetos e doadores. Experimente perguntar algo abaixo. 👋"

### AS-04 Chips de Sugestão
- 3 chips clicáveis abaixo da mensagem de boas-vindas:
  - "Quantas pessoas atendemos em maio?"
  - "Quais projetos arrecadaram mais?"
  - "Como está a retenção de doadores?"
- Click em chip → preenche o input e envia automaticamente

### AS-05 Interface de Chat
- Área de mensagens com scroll automático para o final
- Mensagens do usuário: balão direita, fundo indigo-600, texto branco
- Mensagens do assistente: balão esquerda, fundo branco, texto escuro
- Timestamp em cada mensagem
- Estado de loading: indicador "..." animado (dots) enquanto IA processa

### AS-06 Input de Mensagem
- Placeholder: "Pergunte sobre seus indicadores, projetos ou doadores..."
- Botão de envio: seta direita (→) em fundo indigo
- Enter para enviar
- Input limpa após envio
- Disabled durante loading

### AS-07 Integração com Claude API
- Modelo: `claude-haiku-4-5-20251001`
- Histórico de conversa enviado a cada turno (messages array)
- System prompt: contextualiza com dados completos da organização
- Sem streaming no MVP (resposta completa)

### AS-08 System Prompt Template

```
Você é o Copiloto ImpactOS, assistente de dados do Instituto Semear.

DADOS DA ORGANIZAÇÃO (junho 2026):
Total arrecadado: R$ 487.250 (+18% vs. mês anterior)
Beneficiários ativos: 1.284 (96 novos este mês, 7 cidades)
Projetos ativos: 8 (5 em andamento, 2 planejamento, 1 concluído)
Doadores ativos: 312 (ticket médio R$ 185, 38 em risco de churn, retenção D30: 64%)

PROJETOS:
[lista completa dos projetos com métricas]

BENEFICIÁRIOS: 1.284 total, faixa predominante 0-12 anos

INSTRUÇÕES:
- Responda SEMPRE em português brasileiro
- Use os dados acima para responder. Se não souber, diga que não tem essa informação.
- Seja conciso e objetivo (máx. 3 parágrafos)
- Use números concretos quando disponíveis
- Tutee o usuário (Marina)
```

### AS-09 Exemplos de Respostas Esperadas

**Pergunta**: "Quantas pessoas atendemos em maio?"
**Resposta esperada**: "Em junho de 2026, o Instituto Semear atendeu 1.284 beneficiários, com 96 novas pessoas cadastradas neste mês. O projeto com maior alcance é o Prato Cheio, com 540 beneficiários."

**Pergunta**: "Quais projetos arrecadaram mais?"
**Resposta esperada**: "Os projetos com maior arrecadação são: (1) Educação que Transforma com R$ 118,9k, (2) Mãos que Cuidam com R$ 89k, (3) Semear Digital com R$ 67k."

## Critérios de Aceitação

- [ ] Header do chat com status "Conectado"
- [ ] Mensagem de boas-vindas exibida ao entrar
- [ ] 3 chips de sugestão clicáveis
- [ ] Click em chip envia a pergunta
- [ ] Mensagens do usuário à direita (indigo), assistente à esquerda (branco)
- [ ] Loading indicator visível enquanto IA processa
- [ ] Resposta da IA exibida após processamento
- [ ] Input limpa após envio
- [ ] Scroll automático para última mensagem
- [ ] Enter envia mensagem
