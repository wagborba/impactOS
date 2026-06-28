import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Bell, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const routeMeta: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Dashboard Executivo',
    subtitle: 'Acompanhe o impacto e a captação do Instituto Semear',
  },
  '/projetos': {
    title: 'Projetos Sociais',
    subtitle: '8 projetos · 1.284 beneficiários impactados',
  },
  '/beneficiarios': {
    title: 'Beneficiários',
    subtitle: 'Pessoas impactadas pelas ações da organização',
  },
  '/doadores': {
    title: 'CRM de Doadores',
    subtitle: '312 doadores ativos · R$ 487.250 arrecadados',
  },
  '/relatorios': {
    title: 'Relatórios com IA',
    subtitle: 'Prestação de contas automática para financiadores',
  },
  '/assistente': {
    title: 'Assistente IA',
    subtitle: 'Converse com seus dados em linguagem natural',
  },
  '/configuracoes': {
    title: 'Configurações',
    subtitle: 'Conta, inteligência artificial e preferências',
  },
}

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const meta = routeMeta[location.pathname] ?? { title: 'ImpactOS', subtitle: '' }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{meta.title}</h1>
        {meta.subtitle && <p className="text-sm text-slate-500 mt-0.5">{meta.subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar..."
            className="pl-9 w-56 text-sm border-slate-200"
          />
        </div>
        <Button
          onClick={() => navigate('/assistente')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
        >
          <Sparkles size={14} className="mr-1.5" />
          Copiloto
        </Button>
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  )
}
