import { useState, useMemo } from 'react'
import { Plus, X } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { KpiCard } from '../components/KpiCard'
import { InitialsAvatar } from '../components/InitialsAvatar'
import { SegmentBadge } from '../components/SegmentBadge'
import { EngagementBar } from '../components/EngagementBar'
import { DonorFormSheet } from '../components/DonorFormSheet'
import { CampaignSheet } from '../components/CampaignSheet'
import { Button } from '../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

type FilterTab = 'todos' | 'recorrentes' | 'grandes' | 'risco'

const AVATAR_COLORS = [
  '#4F46E5', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#F97316', '#14B8A6', '#6366F1', '#0EA5E9', '#D946EF',
]

const ORIGINS = ['Evento', 'Indicação', 'Site', 'Redes Sociais', 'E-mail', 'Telefone']

export default function Doadores() {
  const { donors } = useAppData()
  const [activeTab, setActiveTab] = useState<FilterTab>('todos')
  const [formOpen, setFormOpen] = useState(false)
  const [campaignOpen, setCampaignOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [originFilter, setOriginFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const hasActiveFilters = search || originFilter

  const clearFilters = () => { setSearch(''); setOriginFilter('') }

  const filtered = useMemo(() => {
    return donors.filter((d) => {
      // Tab filter
      if (activeTab === 'recorrentes' && d.segment !== 'Recorrente') return false
      if (activeTab === 'grandes' && d.segment !== 'Grande doador') return false
      if (activeTab === 'risco' && !d.atChurnRisk) return false
      // Search filter
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) &&
          !d.email.toLowerCase().includes(search.toLowerCase())) return false
      // Origin filter
      if (originFilter && d.origin !== originFilter) return false
      return true
    })
  }, [donors, activeTab, search, originFilter])

  const churnCount = donors.filter((d) => d.atChurnRisk).length

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'recorrentes', label: 'Recorrentes' },
    { key: 'grandes', label: 'Grandes doadores' },
    { key: 'risco', label: 'Em risco', count: churnCount },
  ]

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

  const select =
    'border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white'

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard delta={18} deltaType="up" value="R$ 487.250" label="Total arrecadado" />
        <KpiCard delta={47} deltaLabel="+47" deltaType="up" value={donors.length.toString()} label="Doadores ativos" />
        <KpiCard delta={-4} deltaType="down" value="R$ 185" label="Ticket médio" />
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div />
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
              atenção
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{churnCount}</div>
          <div className="text-sm text-slate-500">Em risco de churn</div>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex gap-1">
            {tabs.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === key ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {label}
                {count !== undefined && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === key ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar doador..."
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44"
            />
            <Button
              variant="outline"
              size="sm"
              className={`border-slate-200 ${showFilters ? 'bg-indigo-50 text-indigo-700 border-indigo-300' : 'text-slate-600'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtros
              {hasActiveFilters && <span className="ml-1.5 w-1.5 h-1.5 bg-indigo-600 rounded-full" />}
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
              onClick={() => setFormOpen(true)}
            >
              <Plus size={14} className="mr-1.5" />
              Novo doador
            </Button>
          </div>
        </div>

        {/* Filtros extras */}
        {showFilters && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <select
              value={originFilter}
              onChange={(e) => setOriginFilter(e.target.value)}
              className={select}
            >
              <option value="">Todas as origens</option>
              {ORIGINS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors"
              >
                <X size={12} />
                Limpar
              </button>
            )}
            <span className="text-xs text-slate-400 ml-auto">{filtered.length} resultados</span>
          </div>
        )}

        {/* Botão campanha */}
        <div className="px-6 py-3 flex justify-end border-b border-slate-100">
          <Button variant="outline" size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600" onClick={() => setCampaignOpen(true)}>
            <Plus size={13} className="mr-1.5" />
            Campanha de reativação
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Doador</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Segmento</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Doado</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Última Doação</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Origem</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Engajamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-400 text-sm">
                  Nenhum doador encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((donor, i) => (
                <TableRow key={donor.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <InitialsAvatar
                        initials={donor.initials}
                        color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                      />
                      <div>
                        <div className="font-medium text-slate-900">{donor.name}</div>
                        <div className="text-xs text-slate-400">{donor.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><SegmentBadge segment={donor.segment} /></TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {formatCurrency(donor.totalDonated)}
                  </TableCell>
                  <TableCell className="text-slate-600">{donor.lastDonation}</TableCell>
                  <TableCell className="text-slate-600">{donor.origin}</TableCell>
                  <TableCell><EngagementBar score={donor.engagement} /></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DonorFormSheet open={formOpen} onClose={() => setFormOpen(false)} />
      <CampaignSheet open={campaignOpen} onClose={() => setCampaignOpen(false)} />
    </div>
  )
}
