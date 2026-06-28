export interface LLMConfig {
  provider: 'anthropic' | 'openai' | 'google'
  apiKey: string
  model: string
}

export const PROVIDERS = {
  anthropic: {
    name: 'Anthropic Claude',
    icon: '◆',
    description: 'Claude Haiku, Sonnet e Opus. Rápido, preciso e econômico.',
    models: ['claude-haiku-4-5-20251001', 'claude-sonnet-4-6', 'claude-opus-4-8'],
    defaultModel: 'claude-haiku-4-5-20251001',
    docsUrl: 'console.anthropic.com',
  },
  openai: {
    name: 'OpenAI GPT',
    icon: '⬡',
    description: 'GPT-4o e GPT-4o-mini. O modelo mais popular do mundo.',
    models: ['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-4o-mini',
    docsUrl: 'platform.openai.com',
  },
  google: {
    name: 'Google Gemini',
    icon: '✦',
    description: 'Gemini Flash e Pro. Integração nativa com Google.',
    models: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'],
    defaultModel: 'gemini-1.5-flash',
    docsUrl: 'aistudio.google.com',
  },
} as const satisfies Record<string, { name: string; icon: string; description: string; models: string[]; defaultModel: string; docsUrl: string }>

const LS_KEY = 'impactos_llm_config'

export function getLLMConfig(): LLMConfig {
  try {
    const stored = localStorage.getItem(LS_KEY)
    if (stored) return JSON.parse(stored) as LLMConfig
  } catch {}
  const envKey = import.meta.env.VITE_ANTHROPIC_API_KEY ?? ''
  return { provider: 'anthropic', apiKey: envKey, model: 'claude-haiku-4-5-20251001' }
}

export function saveLLMConfig(config: LLMConfig): void {
  localStorage.setItem(LS_KEY, JSON.stringify(config))
}
