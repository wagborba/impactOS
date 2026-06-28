import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

type Mode = 'login' | 'signup'

const ROLES = [
  'Diretor(a) Executivo(a)',
  'Coordenador(a) de Projetos',
  'Analista de Captação',
  'Gestor(a) de Beneficiários',
  'Outro',
]

export default function Login() {
  const { user, login, signup, loginWithGoogle } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({ name: '', email: '', password: '', role: ROLES[0] })
  const set = (field: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [field]: value }))

  if (user) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        if (!form.name.trim()) throw new Error('Informe seu nome')
        if (form.password.length < 6) throw new Error('A senha deve ter ao menos 6 caracteres')
        await signup(form.name, form.email, form.password, form.role)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ocorreu um erro')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try { await loginWithGoogle() }
    catch (e) { setError(e instanceof Error ? e.message : 'Ocorreu um erro') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex">
      {/* Painel esquerdo */}
      <div className="hidden lg:flex w-[480px] bg-indigo-700 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="font-black text-sm">IO</span>
          </div>
          <span className="font-bold text-lg">ImpactOS</span>
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-tight mb-4">
            Gerencie seu impacto social com inteligência
          </h2>
          <p className="text-indigo-200 text-sm mb-8">
            A plataforma completa para ONGs e institutos que querem crescer com dados.
          </p>
          <ul className="space-y-3">
            {[
              'Dashboard executivo com KPIs em tempo real',
              'Relatórios automáticos para prestação de contas',
              'CRM de doadores com alertas de churn',
              'Assistente IA treinado nos seus dados',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-indigo-100">
                <span className="mt-0.5 text-indigo-300">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-indigo-300">
          Usado por mais de 200 organizações sociais no Brasil.
        </p>
      </div>

      {/* Painel direito */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">IO</span>
            </div>
            <span className="font-bold text-slate-900">ImpactOS</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            {mode === 'login' ? 'Bem-vindo de volta' : 'Criar conta'}
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            {mode === 'login'
              ? 'Entre na sua conta para continuar.'
              : 'Preencha os dados para criar sua conta.'}
          </p>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-slate-100 rounded-lg mb-6">
            {(['login', 'signup'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {m === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
            ))}
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-slate-200 bg-white rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 mb-4"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continuar com Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">ou</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
                  <Input
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Marina Alves"
                    required
                    className="border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cargo</label>
                  <select
                    value={form.role}
                    onChange={(e) => set('role', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="marina@institutosemear.org.br"
                required
                className="border-slate-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  placeholder={mode === 'signup' ? 'Mínimo 6 caracteres' : '••••••••'}
                  required
                  className="border-slate-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {loading
                ? <><Loader2 size={14} className="mr-2 animate-spin" />Aguarde...</>
                : mode === 'login' ? 'Entrar' : 'Criar conta'
              }
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
