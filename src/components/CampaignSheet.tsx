import { useState, useMemo } from 'react'
import { Send, CheckCircle, Mail, MessageSquare, Bell } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
  open: boolean
  onClose: () => void
}

type Channel = 'email' | 'whatsapp' | 'push'
type TargetFilter = 'churnRisk' | 'grandes' | 'recorrentes' | 'eventuais'

const CHANNEL_OPTIONS: { key: Channel; label: string; icon: React.FC<{ size?: number }> }[] = [
  { key: 'email', label: 'E-mail', icon: Mail },
  { key: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { key: 'push', label: 'Notificação', icon: Bell },
]

export function CampaignSheet({ open, onClose }: Props) {
  const { donors } = useAppData()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [channels, setChannels] = useState<Channel[]>(['email'])
  const [targets, setTargets] = useState<TargetFilter[]>(['churnRisk'])
  const [sendDate, setSendDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 3)
    return d.toISOString().split('T')[0]
  })

  const toggleChannel = (c: Channel) =>
    setChannels((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])

  const toggleTarget = (t: TargetFilter) =>
    setTargets((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])

  const targetedCount = useMemo(() => {
    const set = new Set<string>()
    donors.forEach((d) => {
      if (targets.includes('churnRisk') && d.atChurnRisk) set.add(d.id)
      if (targets.includes('grandes') && d.segment === 'Grande doador') set.add(d.id)
      if (targets.includes('recorrentes') && d.segment === 'Recorrente') set.add(d.id)
      if (targets.includes('eventuais') && d.segment === 'Eventual') set.add(d.id)
    })
    return set.size
  }, [donors, targets])

  const handleClose = () => {
    setSent(false)
    setName('')
    setMessage('')
    setChannels(['email'])
    setTargets(['churnRisk'])
    onClose()
  }

  const handleSend = async () => {
    if (!name.trim() || !message.trim() || targets.length === 0 || channels.length === 0) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  const targetLabels: Record<TargetFilter, string> = {
    churnRisk: 'Em risco de churn',
    grandes: 'Grandes doadores',
    recorrentes: 'Recorrentes',
    eventuais: 'Eventuais',
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-[460px] sm:max-w-[460px] overflow-y-auto">
        {sent ? (
          <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Campanha agendada!</h3>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{name}</span> será enviada para{' '}
                <span className="font-semibold text-indigo-700">{targetedCount} doadores</span> em{' '}
                {new Date(sendDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}.
              </p>
            </div>
            <Button onClick={handleClose} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
              Concluir
            </Button>
          </div>
        ) : (
          <>
            <SheetHeader className="mb-6">
              <SheetTitle>Nova campanha de reativação</SheetTitle>
              <p className="text-sm text-slate-500">Configure e agende sua campanha para reconectar com doadores.</p>
            </SheetHeader>

            <div className="space-y-5">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome da campanha</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Reativação junho 2026"
                  className="border-slate-200"
                />
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mensagem</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Olá [nome], sua contribuição foi fundamental para o Instituto Semear..."
                  rows={4}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <p className="text-xs text-slate-400 mt-1">Use [nome] para personalizar com o nome do doador.</p>
              </div>

              {/* Público-alvo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Público-alvo</label>
                <div className="space-y-2">
                  {(Object.keys(targetLabels) as TargetFilter[]).map((t) => (
                    <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={targets.includes(t)}
                        onChange={() => toggleTarget(t)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900">
                        {targetLabels[t]}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-3 py-2.5 px-3 bg-indigo-50 rounded-lg border border-indigo-100">
                  <span className="text-sm text-indigo-700">
                    Esta campanha alcançará{' '}
                    <span className="font-bold">{targetedCount} doador{targetedCount !== 1 ? 'es' : ''}</span>
                  </span>
                </div>
              </div>

              {/* Canal */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Canal de envio</label>
                <div className="flex gap-2">
                  {CHANNEL_OPTIONS.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => toggleChannel(key)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
                        channels.includes(key)
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-medium'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Data de envio</label>
                <input
                  type="date"
                  value={sendDate}
                  onChange={(e) => setSendDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 border-slate-200" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleSend}
                  disabled={loading || !name.trim() || !message.trim() || targets.length === 0 || channels.length === 0}
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />Enviando...</>
                  ) : (
                    <><Send size={14} className="mr-1.5" />Lançar campanha</>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
