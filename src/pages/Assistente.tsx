import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { sendChatMessage, type Message } from '../services/assistantApi'
import ReactMarkdown from 'react-markdown'

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Olá, Marina! Sou o copiloto do ImpactOS. Estou conectado aos dados do Instituto Semear e posso responder sobre indicadores, projetos e doadores. Experimente perguntar algo abaixo. 👋',
  timestamp: new Date(),
}

const SUGGESTIONS = [
  'Quantas pessoas atendemos em maio?',
  'Quais projetos arrecadaram mais?',
  'Como está a retenção de doadores?',
]

export default function Assistente() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    setShowSuggestions(false)
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setIsLoading(true)

    try {
      const reply = await sendChatMessage(history.filter((m) => m.id !== 'welcome'))
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date() },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const fmt = (d: Date) => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <div className="font-semibold text-slate-900">Copiloto ImpactOS</div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs text-slate-500">Conectado aos seus dados</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <Sparkles size={13} className="text-white" />
              </div>
            )}
            <div className="max-w-lg">
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-sm'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm prose-slate max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
              <div
                className={`text-xs text-slate-400 mt-1 ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                {fmt(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pl-10">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="text-sm border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-50 hover:border-indigo-300 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
              <Sparkles size={13} className="text-white" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-slate-100">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend(input)
              }
            }}
            disabled={isLoading}
            placeholder="Pergunte sobre seus indicadores, projetos ou doadores..."
            className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 rounded-xl flex items-center justify-center transition-colors"
          >
            <Send size={16} className={input.trim() && !isLoading ? 'text-white' : 'text-slate-400'} />
          </button>
        </div>
      </div>
    </div>
  )
}
