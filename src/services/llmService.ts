import { getLLMConfig } from './llmConfig'

export interface LLMMessage {
  role: 'user' | 'assistant'
  content: string
}

interface CallParams {
  systemPrompt: string
  messages: LLMMessage[]
  maxTokens?: number
}

async function callAnthropic(apiKey: string, model: string, p: CallParams): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({ model, max_tokens: p.maxTokens ?? 1024, system: p.systemPrompt, messages: p.messages }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } }
    throw new Error(err.error?.message ?? `Erro Anthropic ${res.status}`)
  }
  const data = await res.json() as { content: Array<{ text: string }> }
  return data.content[0]?.text ?? ''
}

async function callOpenAI(apiKey: string, model: string, p: CallParams): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      max_tokens: p.maxTokens ?? 1024,
      messages: [{ role: 'system', content: p.systemPrompt }, ...p.messages],
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } }
    throw new Error(err.error?.message ?? `Erro OpenAI ${res.status}`)
  }
  const data = await res.json() as { choices: Array<{ message: { content: string } }> }
  return data.choices[0]?.message.content ?? ''
}

async function callGoogle(apiKey: string, model: string, p: CallParams): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: p.systemPrompt }] },
      contents: p.messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: { maxOutputTokens: p.maxTokens ?? 1024 },
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } }
    throw new Error(err.error?.message ?? `Erro Google ${res.status}`)
  }
  const data = await res.json() as { candidates: Array<{ content: { parts: Array<{ text: string }> } }> }
  return data.candidates[0]?.content.parts[0]?.text ?? ''
}

/** Returns null if no API key is configured (caller should use mock). */
export async function callLLM(params: CallParams): Promise<string | null> {
  const config = getLLMConfig()
  if (!config.apiKey || config.apiKey === 'your_api_key_here') return null

  switch (config.provider) {
    case 'openai':  return callOpenAI(config.apiKey, config.model, params)
    case 'google':  return callGoogle(config.apiKey, config.model, params)
    default:        return callAnthropic(config.apiKey, config.model, params)
  }
}

export async function testLLMConnection(): Promise<{ ok: boolean; latencyMs?: number; error?: string }> {
  const start = Date.now()
  try {
    const result = await callLLM({ systemPrompt: 'Responda apenas "ok"', messages: [{ role: 'user', content: 'ping' }], maxTokens: 5 })
    if (result === null) return { ok: false, error: 'Nenhuma chave de API configurada' }
    return { ok: true, latencyMs: Date.now() - start }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Erro desconhecido' }
  }
}
