import { useState, useMemo } from 'react'
import { Filter, UserPlus, X } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { StatCard } from '../components/StatCard'
import { InitialsAvatar } from '../components/InitialsAvatar'
import { BeneficiaryFormSheet } from '../components/BeneficiaryFormSheet'
import { Button } from '../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

const AGE_RANGES = ['0-12', '13-17', '18-29', '30-59', '60+']

export default function Beneficiarios() {
  const { beneficiaries } = useAppData()
  const [formOpen, setFormOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    gender: '',
    ageRange: '',
    city: '',
    project: '',
    search: '',
  })

  const setFilter = (field: keyof typeof filters, value: string) =>
    setFilters((prev) => ({ ...prev, [field]: value }))

  const clearFilters = () =>
    setFilters({ gender: '', ageRange: '', city: '', project: '', search: '' })

  const hasActiveFilters = Object.values(filters).some(Boolean)

  const cities = useMemo(
    () => [...new Set(beneficiaries.map((b) => b.city).filter(Boolean))].sort(),
    [beneficiaries]
  )

  const projectNames = useMemo(
    () => [...new Set(beneficiaries.map((b) => b.project).filter(Boolean))].sort(),
    [beneficiaries]
  )

  const filtered = useMemo(
    () =>
      beneficiaries.filter((b) => {
        if (filters.search && !b.name.toLowerCase().includes(filters.search.toLowerCase()))
          return false
        if (filters.gender && b.gender !== filters.gender) return false
        if (filters.ageRange && b.ageRange !== filters.ageRange) return false
        if (filters.city && b.city !== filters.city) return false
        if (filters.project && b.project !== filters.project) return false
        return true
      }),
    [beneficiaries, filters]
  )

  const select =
    'border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white'

  const stats = [
    { label: 'Total de beneficiários', value: beneficiaries.length.toLocaleString('pt-BR') },
    { label: 'Novos este mês', value: '96' },
    { label: 'Cidades atendidas', value: cities.length.toString() },
    { label: 'Faixa predominante', value: '0-12 anos' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Header da tabela */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-900">Beneficiários cadastrados</span>
            <span className="text-sm text-slate-500">{filtered.length} registros</span>
            {hasActiveFilters && (
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                Filtros ativos
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {/* Campo de busca */}
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Buscar por nome..."
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            />
            <Button
              variant="outline"
              size="sm"
              className={`border-slate-200 ${showFilters ? 'bg-indigo-50 text-indigo-700 border-indigo-300' : 'text-slate-600'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={14} className="mr-1.5" />
              Filtrar
              {hasActiveFilters && (
                <span className="ml-1.5 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
              )}
            </Button>
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => setFormOpen(true)}
            >
              <UserPlus size={14} className="mr-1.5" />
              Cadastrar
            </Button>
          </div>
        </div>

        {/* Painel de filtros */}
        {showFilters && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3 flex-wrap">
            <select
              value={filters.gender}
              onChange={(e) => setFilter('gender', e.target.value)}
              className={select}
            >
              <option value="">Todos os gêneros</option>
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
            </select>

            <select
              value={filters.ageRange}
              onChange={(e) => setFilter('ageRange', e.target.value)}
              className={select}
            >
              <option value="">Todas as faixas</option>
              {AGE_RANGES.map((r) => (
                <option key={r} value={r}>{r} anos</option>
              ))}
            </select>

            <select
              value={filters.city}
              onChange={(e) => setFilter('city', e.target.value)}
              className={select}
            >
              <option value="">Todas as cidades</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={filters.project}
              onChange={(e) => setFilter('project', e.target.value)}
              className={select}
            >
              <option value="">Todos os projetos</option>
              {projectNames.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors"
              >
                <X size={12} />
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {/* Tabela */}
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gênero</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Faixa Etária</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cidade</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Projeto</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-400 text-sm">
                  Nenhum beneficiário encontrado com os filtros aplicados.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((b) => (
                <TableRow key={b.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <InitialsAvatar initials={b.initials} color={b.color} />
                      <span className="font-medium text-slate-900">{b.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{b.gender}</TableCell>
                  <TableCell className="text-slate-600">{b.ageRange}</TableCell>
                  <TableCell className="text-slate-600">{b.city}</TableCell>
                  <TableCell>
                    {b.project && (
                      <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium">
                        {b.project}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium">{b.actions}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <BeneficiaryFormSheet open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  )
}
