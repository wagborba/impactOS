import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { useAppData } from '../context/AppDataContext'

const AVATAR_COLORS = [
  '#4F46E5', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#F97316', '#14B8A6', '#6366F1', '#0EA5E9', '#D946EF',
]

const AGE_RANGES = ['0-12', '13-17', '18-29', '30-59', '60+']

function getInitials(name: string) {
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function pickColor(name: string) {
  const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return AVATAR_COLORS[sum % AVATAR_COLORS.length]
}

const BLANK = {
  name: '',
  gender: 'Feminino',
  ageRange: '0-12',
  city: '',
  project: '',
  actions: 0,
}

interface BeneficiaryFormSheetProps {
  open: boolean
  onClose: () => void
}

export function BeneficiaryFormSheet({ open, onClose }: BeneficiaryFormSheetProps) {
  const { addBeneficiary, projects } = useAppData()
  const [form, setForm] = useState({ ...BLANK })

  const set = (field: keyof typeof BLANK, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const activeProjects = projects.filter((p) => !p.archived && p.status === 'em_andamento')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    addBeneficiary({
      ...form,
      initials: getInitials(form.name),
      color: pickColor(form.name),
    })
    setForm({ ...BLANK })
    onClose()
  }

  const field =
    'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500'
  const lbl = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5'

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-[440px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg font-bold text-slate-900">Cadastrar Beneficiário</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div>
            <label className={lbl} htmlFor="bname">
              Nome completo <span className="text-red-400">*</span>
            </label>
            <input
              id="bname"
              required
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Ex: Ana Clara Souza"
              className={field}
            />
          </div>

          {/* Gênero */}
          <div>
            <span className={lbl}>Gênero</span>
            <div className="flex gap-2">
              {['Feminino', 'Masculino'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => set('gender', g)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    form.gender === g
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Faixa etária */}
          <div>
            <span className={lbl}>Faixa Etária</span>
            <div className="flex gap-2 flex-wrap">
              {AGE_RANGES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => set('ageRange', r)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    form.ageRange === r
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Cidade */}
          <div>
            <label className={lbl} htmlFor="bcity">
              Cidade
            </label>
            <input
              id="bcity"
              value={form.city}
              onChange={(e) => set('city', e.target.value)}
              placeholder="Ex: São Paulo"
              className={field}
            />
          </div>

          {/* Projeto */}
          <div>
            <label className={lbl} htmlFor="bproject">
              Projeto vinculado
            </label>
            <select
              id="bproject"
              value={form.project}
              onChange={(e) => set('project', e.target.value)}
              className={field}
            >
              <option value="">— Selecionar projeto —</option>
              {activeProjects.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Número de ações */}
          <div>
            <label className={lbl} htmlFor="bactions">
              Número de ações participadas
            </label>
            <input
              id="bactions"
              type="number"
              min={0}
              value={form.actions}
              onChange={(e) => set('actions', Number(e.target.value))}
              className={field}
            />
          </div>

          {/* Preview do avatar */}
          {form.name.trim() && (
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: pickColor(form.name) }}
              >
                {getInitials(form.name)}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">{form.name}</div>
                <div className="text-xs text-slate-500">
                  {form.gender} · {form.ageRange} anos · {form.city || 'cidade não informada'}
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
