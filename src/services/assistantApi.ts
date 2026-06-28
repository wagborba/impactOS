import { callLLM } from './llmService'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SYSTEM_PROMPT = `Você é o Copiloto ImpactOS, assistente de dados do Instituto Semear.

DADOS DA ORGANIZAÇÃO (junho 2026):
Total arrecadado: R$ 487.250 (+18% vs. mês anterior)
Beneficiários ativos: 1.284 (96 novos este mês, 7 cidades, faixa predominante 0-12 anos)
Projetos ativos: 8 (5 em andamento, 2 planejamento, 1 concluído)
Ações realizadas no mês: 142
Doadores ativos: 312 (ticket médio R$ 185, 38 em risco de churn, retenção D30: 64%)

PROJETOS ATIVOS:
- Educação que Transforma: 320 beneficiários, 41 ações, R$ 118,9k (Educação, ODS 4, 10)
- Prato Cheio: 540 beneficiários, 38 ações, R$ 148k (Segurança Alimentar, ODS 1, 2)
- Semear Digital: 180 beneficiários, 22 ações, R$ 67k (Inclusão Digital, ODS 4, 8)
- Mãos que Cuidam: 95 beneficiários, 31 ações, R$ 89k (Saúde, ODS 3)
- Jovem Protagonista: 149 beneficiários, 18 ações, R$ 64,3k (Juventude, ODS 10, 16)

INSTRUÇÕES:
- Responda SEMPRE em português brasileiro
- Use os dados acima para responder com precisão
- Se não tiver a informação, diga claramente
- Seja conciso e objetivo (máximo 3 parágrafos)
- Use **negrito** para destacar números importantes
- Trate a usuária como Marina`

function getMockReply(content: string): string {
  const q = content.toLowerCase()
  if (q.includes('beneficiário') || q.includes('pessoa') || q.includes('atend'))
    return 'Em junho de 2026, o Instituto Semear atendeu **1.284 beneficiários**, com 96 novas pessoas cadastradas neste mês. O projeto com maior alcance é o **Prato Cheio** com 540 beneficiários, seguido por **Educação que Transforma** com 320.'
  if (q.includes('arrecad') || q.includes('mais') || q.includes('projeto'))
    return 'Os projetos com maior arrecadação são: (1) **Prato Cheio** com R$ 148k, (2) **Educação que Transforma** com R$ 118,9k, e (3) **Mãos que Cuidam** com R$ 89k. No total, o instituto captou **R$ 487.250** em junho de 2026, crescimento de 18% vs. o mesmo período do ano anterior.'
  if (q.includes('reten') || q.includes('doador') || q.includes('churn'))
    return 'A retenção de doadores está em **64%** (D30) nos últimos 6 meses. De 312 doadores ativos, **38 estão em risco de churn** — recomendo priorizar uma campanha de reativação para esse grupo. O ticket médio caiu 4% para R$ 185, o que merece atenção.'
  return 'Com base nos dados do Instituto Semear de junho de 2026: temos **1.284 beneficiários** ativos, **8 projetos** em execução e **R$ 487.250** captados. Posso responder sobre indicadores específicos, projetos ou situação dos doadores. O que você gostaria de saber?'
}

export async function sendChatMessage(messages: Message[]): Promise<string> {
  const result = await callLLM({
    systemPrompt: SYSTEM_PROMPT,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    maxTokens: 512,
  })

  if (result === null) {
    await new Promise((r) => setTimeout(r, 1200))
    return getMockReply(messages[messages.length - 1]?.content ?? '')
  }

  return result
}
