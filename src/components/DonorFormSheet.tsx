import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { useAppData } from '../context/AppDataContext'
import type { Donor } from '../types'

const ORIGINS = ['Evento', 'Indicação', 'Site', 'Redes Sociais', 'E-mail', 'Telefone']

function getInitials(name: string) {
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const BLANK = {
  name: '',
  email: '',
  segment: 'Recorrente' as Donor['segment'],
  totalDonated: 0,
  lastDonation: 'hoje',
  origin: 'Site',
  engagement: 80,
}

interface DonorFormSheetProps {
  open: boolean
  onClose: () => void
}

export function DonorFormSheet({ open, onClose }: DonorFormSheetProps) {
  const { addDonor } = useAppData()
  const [form, setForm] = useState({ ...BLANK })

  const set = (field: keyof typeof BLANK, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    addDonor({
      ...form,
      initials: getInitials(form.name),
      atChurnRisk: form.engagement < 40,
    })
    setForm({ ...BLANK })
    onClose()
  }

  const field =
    'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500'
  const lbl = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5'

  const engColor =
    form.engagement >= 70
      ? 'text-emerald-600'
      : form.engagement >= 40
      ? 'text-amber-600'
      : 'text-red-500'

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-[440px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg font-bold text-slate-900">Cadastrar Doador</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div>
            <label className={lbl} htmlFor="dname">
              Nome completo <span className="text-red-400">*</span>
            </label>
            <input
              id="dname"
              required
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Ex: Carlos Mendes"
              className={field}
            />
          </div>

          {/* Email */}
          <div>
            <label className={lbl} htmlFor="demail">
              E-mail
            </label>
            <input
              id="demail"
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="email@exemplo.com"
              className={field}
            />
          </div>

          {/* Segmento */}
          <div>
            <span className={lbl}>Segmento</span>
            <div className="flex gap-2">
              {(['Recorrente', 'Grande doador', 'Eventual'] as Donor['segment'][]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set('segment', s)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    form.segment === s
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Total doado */}
          <div>
            <label className={lbl} htmlFor="dtotal">
              Total doado (R$)
            </label>
            <input
              id="dtotal"
              type="number"
              min={0}
              value={form.totalDonated}
              onChange={(e) => set('totalDonated', Number(e.target.value))}
              className={field}
            />
          </div>

          {/* Última doação */}
          <div>
            <label className={lbl} htmlFor="dlast">
              Última doação
            </label>
            <select
              id="dlast"
              value={form.lastDonation}
              onChange={(e) => set('lastDonation', e.target.value)}
              className={field}
            >
              {['hoje', '1 dia atrás', '3 dias atrás', '1 semana', '2 semanas', '1 mês', '2 meses', '3 meses'].map(
                (o) => <option key={o} value={o}>{o}</option>
              )}
            </select>
          </div>

          {/* Origem */}
          <div>
            <span className={lbl}>Canal de origem</span>
            <div className="flex flex-wrap gap-2">
              {ORIGINS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => set('origin', o)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    form.origin === o
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Engajamento */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className={lbl}>Score de engajamento</span>
              <span className={`text-sm font-bold ${engColor}`}>{form.engagement}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={form.engagement}
              onChange={(e) => set('engagement', Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0 — Inativo</span>
              <span>50 — Moderado</span>
              <span>100 — Engajado</span>
            </div>
            {form.engagement < 40 && (
              <p className="text-xs text-red-500 mt-1.5">
                ⚠ Score abaixo de 40 — doador será marcado como em risco de churn
              </p>
            )}
          </div>

          {/* Preview */}
          {form.name.trim() && (
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                {getInitials(form.name)}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">{form.name}</div>
                <div className="text-xs text-slate-500">
                  {form.segment} · {form.origin} · Engajamento: {form.engagement}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-slate-200 text-slate-600"
              onClick={() => { setForm({ ...BLANK }); onClose() }}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
              Cadastrar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
