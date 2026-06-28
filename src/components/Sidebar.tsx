import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderOpen, Users, Heart, FileText, MessageSquare, ChevronDown, Settings, LogOut } from 'lucide-react'
import { Progress } from './ui/progress'
import { useAppData } from '../context/AppDataContext'
import { useAuth } from '../context/AuthContext'

const gestaoLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projetos', icon: FolderOpen, label: 'Projetos' },
  { to: '/beneficiarios', icon: Users, label: 'Beneficiários' },
  { to: '/doadores', icon: Heart, label: 'Doadores' },
]

const inteligenciaLinks = [
  { to: '/relatorios', icon: FileText, label: 'Relatórios IA', badge: 'IA' },
  { to: '/assistente', icon: MessageSquare, label: 'Assistente', badge: 'IA' },
]

export function Sidebar() {
  const { org } = useAppData()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const progressPercent = (org.projectsUsed / org.projectsLimit) * 100

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayName = user?.name ?? 'Usuário'
  const displayRole = user?.role ?? ''
  const displayInitials = user?.initials ?? '?'

  return (
    <div className="w-60 min-h-screen bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">IO</span>
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">ImpactOS</div>
            <div className="text-xs text-slate-500">{org.name}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">Gestão</p>
          <ul className="space-y-0.5">
            {gestaoLinks.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">Inteligência</p>
          <ul className="space-y-0.5">
            {inteligenciaLinks.map(({ to, icon: Icon, label, badge }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} />
                    {label}
                  </span>
                  {badge && (
                    <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                      {badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Plan indicator */}
      <div className="mx-3 mb-3 p-3 bg-indigo-50 rounded-lg">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs font-semibold text-slate-700">{org.plan}</span>
        </div>
        <p className="text-xs text-slate-500 mb-2">
          {org.projectsUsed} de {org.projectsLimit} projetos usados neste mês.
        </p>
        <Progress value={progressPercent} className="h-1.5 bg-indigo-200 [&>div]:bg-indigo-600" />
      </div>

      {/* User section with dropdown */}
      <div className="px-3 pb-4 border-t border-slate-100 pt-3 relative" ref={menuRef}>
        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
            <button
              onClick={() => { navigate('/configuracoes'); setMenuOpen(false) }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Settings size={15} className="text-slate-400" />
              Configurações
            </button>
            <div className="h-px bg-slate-100 mx-2" />
            <button
              onClick={() => { logout(); navigate('/login') }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} />
              Sair
            </button>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-between w-full hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{displayInitials}</span>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-slate-900">{displayName}</div>
              <div className="text-xs text-slate-500">{displayRole}</div>
            </div>
          </div>
          <ChevronDown size={14} className={`text-slate-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  )
}
