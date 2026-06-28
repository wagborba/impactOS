import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { useAppData } from '../context/AppDataContext'
import type { Project } from '../types'

const CATEGORIES = [
  { label: 'Educação', color: '#3B82F6' },
  { label: 'Segurança Alimentar', color: '#F59E0B' },
  { label: 'Inclusão Digital', color: '#8B5CF6' },
  { label: 'Saúde', color: '#EC4899' },
  { label: 'Juventude', color: '#10B981' },
  { label: 'Cultura', color: '#F97316' },
  { label: 'Assistência Social', color: '#64748B' },
  { label: 'Meio Ambiente', color: '#059669' },
  { label: 'Habitação', color: '#0EA5E9' },
  { label: 'Direitos Humanos', color: '#6366F1' },
]

const ICONS = ['📚', '🍽️', '💻', '🏥', '🌟', '🎨', '🏠', '🌱', '📋', '🤝', '💡', '🎯', '🌍', '❤️', '🏃', '✊']

const BLANK_FORM = {
  name: '',
  icon: '📋',
  category: 'Educação',
  categoryColor: '#3B82F6',
  status: 'planejamento' as Project['status'],
  description: '',
  ods: [] as number[],
  startDate: '',
  endDate: '',
  beneficiaries: 0,
  actions: 0,
  raised: 0,
}

interface ProjectFormSheetProps {
  open: boolean
  onClose: () => void
}

export function ProjectFormSheet({ open, onClose }: ProjectFormSheetProps) {
  const { addProject } = useAppData()
  const [form, setForm] = useState({ ...BLANK_FORM })

  const set = (field: keyof typeof BLANK_FORM, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const toggleOds = (n: number) =>
    set('ods', form.ods.includes(n) ? form.ods.filter((o) => o !== n) : [...form.ods, n])

  const handleCategory = (label: string) => {
    const cat = CATEGORIES.find((c) => c.label === label)
    setForm((prev) => ({ ...prev, category: label, categoryColor: cat?.color ?? '#6366F1' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    addProject({ ...form })
    setForm({ ...BLANK_FORM })
    onClose()
  }

  const field = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500'
  const label = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5'

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-[520px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg font-bold text-slate-900">Novo Projeto</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ícone */}
          <div>
            <span className={label}>Ícone</span>
            <div className="flex flex-wrap gap-2">
              {ICONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => set('icon', ic)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-colors ${
                    form.icon === ic
                      ? 'bg-indigo-100 ring-2 ring-indigo-500'
                      : 'bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className={label} htmlFor="pname">
              Nome do projeto <span className="text-red-400">*</span>
            </label>
            <input
              id="pname"
              required
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Ex: Educação que Transforma"
              className={field}
            />
          </div>

          {/* Categoria */}
          <div>
            <span className={label}>Categoria</span>
            <select
              value={form.category}
              onChange={(e) => handleCategory(e.target.value)}
              className={field}
            >
              {CATEGORIES.map((c) => (
                <option key={c.label} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <span className={label}>Status</span>
            <select
              value={form.status}
              onChange={(e) => set('status', e.target.value as Project['status'])}
              className={field}
            >
              <option value="planejamento">Planejamento</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>

          {/* Descrição */}
          <div>
            <label className={label} htmlFor="pdesc">
              Descrição
            </label>
            <textarea
              id="pdesc"
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Descreva o objetivo e as atividades do projeto..."
              className={`${field} resize-none`}
            />
          </div>

          {/* Período */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label} htmlFor="pstart">
                Início
              </label>
              <input
                id="pstart"
                type="month"
                value={form.startDate}
                onChange={(e) => {
                  const [y, m] = e.target.value.split('-')
                  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
                  set('startDate', `${months[parseInt(m) - 1]} ${y}`)
                }}
                className={field}
              />
            </div>
            <div>
              <label className={label} htmlFor="pend">
                Término
              </label>
              <input
                id="pend"
                type="month"
                value={form.endDate}
                onChange={(e) => {
                  const [y, m] = e.target.value.split('-')
                  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
                  set('endDate', `${months[parseInt(m) - 1]} ${y}`)
                }}
                className={field}
              />
            </div>
          </div>

          {/* Métricas iniciais */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label} htmlFor="pbene">
                Beneficiários
              </label>
              <input
                id="pbene"
                type="number"
                min={0}
                value={form.beneficiaries}
                onChange={(e) => set('beneficiaries', Number(e.target.value))}
                className={field}
              />
            </div>
            <div>
              <label className={label} htmlFor="pact">
                Ações
              </label>
              <input
                id="pact"
                type="number"
                min={0}
                value={form.actions}
                onChange={(e) => set('actions', Number(e.target.value))}
                className={field}
              />
            </div>
            <div>
              <label className={label} htmlFor="praised">
                Arrecadado (R$)
              </label>
              <input
                id="praised"
                type="number"
                min={0}
                value={form.raised}
                onChange={(e) => set('raised', Number(e.target.value))}
                className={field}
              />
            </div>
          </div>

          {/* ODS */}
          <div>
            <span className={label}>ODS Alinhados (Objetivos de Desenvolvimento Sustentável)</span>
            <div className="grid grid-cols-9 gap-1.5">
              {Array.from({ length: 17 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggleOds(n)}
                  className={`h-8 text-xs font-semibold rounded transition-colors ${
                    form.ods.includes(n)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-slate-200 text-slate-600"
              onClick={() => { setForm({ ...BLANK_FORM }); onClose() }}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
              Criar projeto
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
