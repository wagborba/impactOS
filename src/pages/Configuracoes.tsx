import { useState, useEffect } from 'react'
import { Eye, EyeOff, CheckCircle, XCircle, Loader2, LogOut, ExternalLink } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getLLMConfig, saveLLMConfig, PROVIDERS } from '../services/llmConfig'
import type { LLMConfig } from '../services/llmConfig'
import { testLLMConnection } from '../services/llmService'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

type Provider = LLMConfig['provider']

export default function Configuracoes() {
  const { user, logout } = useAuth()
  const [config, setConfig] = useState<LLMConfig>(getLLMConfig)
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ ok: boolean; latencyMs?: number; error?: string } | null>(null)

  useEffect(() => { setConfig(getLLMConfig()) }, [])

  const setProvider = (provider: Provider) => {
    setConfig({ provider, apiKey: '', model: PROVIDERS[provider].defaultModel })
    setTestResult(null)
    setSaved(false)
  }

  const handleSave = () => {
    saveLLMConfig(config)
    setSaved(true)
    setTestResult(null)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    const result = await testLLMConnection()
    setTestResult(result)
    setTesting(false)
  }

  const providerColors: Record<Provider, string> = {
    anthropic: 'border-orange-400 bg-orange-50',
    openai: 'border-emerald-400 bg-emerald-50',
    google: 'border-blue-400 bg-blue-50',
  }

  const providerIconColors: Record<Provider, string> = {
    anthropic: 'text-orange-600',
    openai: 'text-emerald-600',
    google: 'text-blue-600',
  }

  return (
    <div className="max-w-2xl space-y-8">
      {/* LLM Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">Inteligência Artificial</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Escolha o provedor de IA para Relatórios, Assistente e Copiloto.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Provider cards */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Provedor</label>
            <div className="grid grid-cols-3 gap-3">
              {(Object.entries(PROVIDERS) as [Provider, typeof PROVIDERS[Provider]][]).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setProvider(key)}
                  className={`border-2 rounded-xl p-4 text-left transition-all ${
                    config.provider === key
                      ? providerColors[key]
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`text-2xl mb-2 ${config.provider === key ? providerIconColors[key] : 'text-slate-400'}`}>
                    {p.icon}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-tight">{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Modelo</label>
            <select
              value={config.model}
              onChange={(e) => setConfig((c) => ({ ...c, model: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {PROVIDERS[config.provider].models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* API Key */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700">Chave de API</label>
              <a
                href={`https://${PROVIDERS[config.provider].docsUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
              >
                Obter chave <ExternalLink size={10} />
              </a>
            </div>
            <div className="relative">
              <Input
                type={showKey ? 'text' : 'password'}
                value={config.apiKey}
                onChange={(e) => setConfig((c) => ({ ...c, apiKey: e.target.value }))}
                placeholder={`sk-...`}
                className="border-slate-200 pr-10 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Sua chave é armazenada apenas no seu dispositivo (localStorage).
            </p>
          </div>

          {/* Test result */}
          {testResult && (
            <div className={`flex items-center gap-2 text-sm rounded-lg px-4 py-3 ${
              testResult.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {testResult.ok
                ? <><CheckCircle size={16} /> Conexão bem-sucedida! Latência: {testResult.latencyMs}ms</>
                : <><XCircle size={16} /> {testResult.error}</>
              }
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              className="border-slate-200 text-slate-700"
              onClick={handleTest}
              disabled={testing || !config.apiKey}
            >
              {testing ? <><Loader2 size={14} className="mr-2 animate-spin" />Testando...</> : 'Testar conexão'}
            </Button>
            <Button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={!config.apiKey}
            >
              {saved ? <><CheckCircle size={14} className="mr-1.5" />Salvo!</> : 'Salvar configuração'}
            </Button>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">Minha conta</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{user?.initials}</span>
            </div>
            <div>
              <div className="font-semibold text-slate-900">{user?.name}</div>
              <div className="text-sm text-slate-500">{user?.email}</div>
              <div className="text-xs text-slate-400 mt-0.5">{user?.role}</div>
            </div>
            {user?.provider === 'google' && (
              <span className="ml-auto text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                Google
              </span>
            )}
          </div>
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            onClick={logout}
          >
            <LogOut size={14} className="mr-1.5" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  )
}
