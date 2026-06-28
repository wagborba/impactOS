import { useState } from 'react'
import { Sparkles, FileText, Download, Users, Activity, DollarSign, FolderOpen, AlertTriangle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { generateReport } from '../services/claudeApi'
import ReactMarkdown from 'react-markdown'
import { useAppData } from '../context/AppDataContext'

type ReportType = 'Relatório Mensal' | 'Relatório Anual' | 'Relatório por Projeto'
type ToneOption = 'Institucional' | 'Financiadores' | 'Redes sociais'
type Status = 'idle' | 'loading' | 'done' | 'error'

const REPORT_TYPES: ReportType[] = ['Relatório Mensal', 'Relatório Anual', 'Relatório por Projeto']
const TONE_OPTIONS: ToneOption[] = ['Institucional', 'Financiadores', 'Redes sociais']

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function fmt(v: number) {
  if (v >= 1000) return `R$ ${(v / 1000).toFixed(0)}k`
  return `R$ ${v}`
}

function fmtFull(v: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
}

function buildExportHTML(data: {
  type: string; project: string; projects: ReturnType<typeof useAppData>['projects']
  totalBenef: number; totalRaised: number; totalActions: number
  donors: ReturnType<typeof useAppData>['donors']; retentionRate: number; aiContent: string
}): string {
  const churnCount = data.donors.filter(d => d.atChurnRisk).length
  const sorted = [...data.projects].sort((a, b) => b.raised - a.raised)
  const maxRaised = sorted[0]?.raised ?? 1

  const barRows = sorted.map(p => `
    <div class="bar-row">
      <span class="bar-label">${p.icon} ${p.name}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.round((p.raised / maxRaised) * 100)}%"></div></div>
      <span class="bar-value">${fmt(p.raised)}</span>
    </div>`).join('')

  const projectCards = sorted.map(p => `
    <div class="project-card">
      <div class="project-header">
        <span class="project-icon">${p.icon}</span>
        <div>
          <div class="project-name">${p.name}</div>
          <div class="project-cat">${p.category}</div>
        </div>
      </div>
      <div class="project-metrics">
        <div class="metric"><div class="metric-value">${p.beneficiaries.toLocaleString('pt-BR')}</div><div class="metric-label">Beneficiários</div></div>
        <div class="metric"><div class="metric-value">${p.actions}</div><div class="metric-label">Ações</div></div>
        <div class="metric"><div class="metric-value" style="color:#4338ca">${fmt(p.raised)}</div><div class="metric-label">Investimento</div></div>
      </div>
      <div class="ods-pills">${p.ods.map(o => `<span class="ods-pill">ODS ${o}</span>`).join('')}</div>
    </div>`).join('')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Relatório de Impacto Social - Instituto Semear</title>
<style>
  body{font-family:Arial,sans-serif;font-size:11pt;line-height:1.5;max-width:820px;margin:0 auto;padding:20mm;color:#1e293b}
  h1{font-size:22pt;font-weight:bold;margin:0 0 4px}
  h2{font-size:13pt;font-weight:bold;color:#4338ca;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin:20px 0 10px}
  .subtitle{color:#64748b;font-size:10pt;margin-bottom:16px}
  .badge{background:#eef2ff;color:#4338ca;font-size:8pt;font-weight:bold;padding:3px 10px;border-radius:20px;display:inline-block;margin-bottom:12px}
  .kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 0}
  .kpi-card{border:1px solid #e2e8f0;border-radius:8px;padding:14px;text-align:center}
  .kpi-value{font-size:18pt;font-weight:bold;color:#1e293b}
  .kpi-label{font-size:8pt;color:#64748b;margin-top:2px}
  .kpi-delta{font-size:8pt;color:#059669;font-weight:600;margin-top:2px}
  .bar-row{display:flex;align-items:center;gap:8px;margin:5px 0}
  .bar-label{width:200px;font-size:9pt;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bar-track{flex:1;height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden}
  .bar-fill{height:100%;background:#4f46e5;border-radius:4px}
  .bar-value{width:55px;text-align:right;font-size:9pt;font-weight:600}
  .project-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0}
  .project-card{border:1px solid #e2e8f0;border-radius:8px;padding:14px}
  .project-header{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px}
  .project-icon{font-size:22px}
  .project-name{font-weight:700;font-size:10pt;margin-bottom:2px}
  .project-cat{font-size:8pt;color:#64748b}
  .project-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:10px 0}
  .metric{text-align:center;padding:6px;background:#f8fafc;border-radius:6px}
  .metric-value{font-size:12pt;font-weight:bold}
  .metric-label{font-size:7pt;color:#64748b;margin-top:1px}
  .ods-pills{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}
  .ods-pill{background:#f1f5f9;color:#475569;font-size:7pt;padding:2px 7px;border-radius:4px;font-weight:600}
  .donor-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:12px 0}
  .donor-stat{border:1px solid #e2e8f0;border-radius:8px;padding:14px;text-align:center}
  .donor-value{font-size:18pt;font-weight:bold}
  .donor-label{font-size:8pt;color:#64748b;margin-top:2px}
  .churn-alert{background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:10px 14px;font-size:9pt;color:#92400e;margin:10px 0}
  .ai-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:16px 0}
  .ai-label{font-size:8pt;font-weight:700;color:#4338ca;letter-spacing:.05em;text-transform:uppercase;margin-bottom:8px}
  strong{font-weight:700}
  ul{margin:6px 0;padding-left:18px}
  li{margin:4px 0;font-size:10pt}
  @media print{body{padding:12mm}h2{page-break-before:auto}}
</style>
</head>
<body>
  <div class="badge">${data.type.toUpperCase()} · JUNHO 2026</div>
  <h1>Relatório de Impacto Social</h1>
  <p class="subtitle">Instituto Semear &middot; Período de 01 a 30 de junho de 2026</p>
  <div class="kpi-grid">
    <div class="kpi-card"><div class="kpi-value">${data.totalBenef.toLocaleString('pt-BR')}</div><div class="kpi-label">Beneficiários</div><div class="kpi-delta">+96 este mês</div></div>
    <div class="kpi-card"><div class="kpi-value">${fmt(data.totalRaised)}</div><div class="kpi-label">Arrecadado</div><div class="kpi-delta">+18% vs. anterior</div></div>
    <div class="kpi-card"><div class="kpi-value">${data.totalActions}</div><div class="kpi-label">Ações realizadas</div></div>
    <div class="kpi-card"><div class="kpi-value">${data.projects.length}</div><div class="kpi-label">Projetos ativos</div></div>
  </div>
  <h2>Investimento por Projeto</h2>
  ${barRows}
  <h2>Projetos Sociais</h2>
  <div class="project-grid">${projectCards}</div>
  <h2>Doadores &amp; Captação</h2>
  <div class="donor-grid">
    <div class="donor-stat"><div class="donor-value">${data.retentionRate}%</div><div class="donor-label">Retenção D30</div></div>
    <div class="donor-stat"><div class="donor-value">${data.donors.length}</div><div class="donor-label">Doadores ativos</div></div>
    <div class="donor-stat"><div class="donor-value">R$ 185</div><div class="donor-label">Ticket médio</div></div>
  </div>
  ${churnCount > 0 ? `<div class="churn-alert">⚠ ${churnCount} doadores em risco de churn — campanha de reativação recomendada.</div>` : ''}
  <h2>Análise da IA</h2>
  <div class="ai-box">${data.aiContent.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/^## (.+)$/gm, '<strong>$1</strong>').replace(/^- (.+)$/gm, '<li>$1</li>').replace(/<li>/g, '<ul><li>').replace(/<\/li>(?!<li>)/g, '</li></ul>')}</div>
</body>
</html>`
}

export default function RelatoriosIA() {
  const { projects, donors, retentionRate } = useAppData()
  const [selectedType, setSelectedType] = useState<ReportType>('Relatório Mensal')
  const [selectedProject, setSelectedProject] = useState('Todos os projetos')
  const [selectedTones, setSelectedTones] = useState<ToneOption[]>(['Institucional'])
  const [status, setStatus] = useState<Status>('idle')
  const [aiContent, setAiContent] = useState('')
  const [error, setError] = useState('')

  const reportProjects = selectedProject === 'Todos os projetos'
    ? projects.filter((p) => !p.archived && p.status === 'em_andamento')
    : projects.filter((p) => p.name === selectedProject && !p.archived)

  const totalBenef = reportProjects.reduce((s, p) => s + p.beneficiaries, 0)
  const totalRaised = reportProjects.reduce((s, p) => s + p.raised, 0)
  const totalActions = reportProjects.reduce((s, p) => s + p.actions, 0)
  const churnCount = donors.filter((d) => d.atChurnRisk).length
  const sortedByRaised = [...reportProjects].sort((a, b) => b.raised - a.raised)
  const maxRaised = sortedByRaised[0]?.raised ?? 1

  const toggleTone = (tone: ToneOption) =>
    setSelectedTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone]
    )

  const handleGenerate = async () => {
    setStatus('loading')
    setError('')
    try {
      const result = await generateReport({ reportType: selectedType, project: selectedProject, tone: selectedTones })
      setAiContent(result)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      setStatus('error')
    }
  }

  const handleExportPDF = () => {
    const html = buildExportHTML({ type: selectedType, project: selectedProject, projects: reportProjects, totalBenef, totalRaised, totalActions, donors, retentionRate, aiContent })
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(html)
    w.document.close()
    setTimeout(() => { w.focus(); w.print() }, 600)
  }

  const handleExportDOCX = () => {
    const html = buildExportHTML({ type: selectedType, project: selectedProject, projects: reportProjects, totalBenef, totalRaised, totalActions, donors, retentionRate, aiContent })
    const blob = new Blob([html], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'relatorio-impacto-social.doc'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* Formulário */}
      <div className="w-80 flex-shrink-0">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={16} className="text-indigo-600" />
            <span className="font-semibold text-slate-900">Gerar relatório</span>
          </div>

          <div className="mb-5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Tipo de Relatório</label>
            <div className="space-y-2">
              {REPORT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                    selectedType === type
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {type}
                    {selectedType === type && <span className="text-indigo-600">✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Projeto</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Todos os projetos</option>
              {projects.filter((p) => p.status === 'em_andamento').map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Tom da Narrativa</label>
            <div className="flex flex-wrap gap-2">
              {TONE_OPTIONS.map((tone) => (
                <button
                  key={tone}
                  onClick={() => toggleTone(tone)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    selectedTones.includes(tone)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={status === 'loading'} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-auto">
            {status === 'loading'
              ? <span className="flex items-center gap-2"><Spinner />Gerando...</span>
              : <><Sparkles size={14} className="mr-2" />Gerar Relatório</>
            }
          </Button>
        </div>
      </div>

      {/* Painel direito */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
        {status === 'idle' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles size={28} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Relatório com Inteligência Artificial</h3>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Selecione o tipo, projeto e tom da narrativa, depois clique em Gerar Relatório para criar uma prestação de contas visual pronta para financiadores.
            </p>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-slate-500">Gerando relatório com IA...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-sm bg-red-50 border border-red-200 rounded-lg p-4 w-full max-w-md text-red-600">
              <strong>Erro ao gerar relatório:</strong> {error}
            </div>
          </div>
        )}

        {status === 'done' && (
          <>
            {/* Barra fixa do topo */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 flex-shrink-0">
              <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
                {selectedType.toUpperCase()} · JUNHO 2026
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-slate-600 border-slate-200 text-xs" onClick={handleExportPDF}>
                  <Download size={13} className="mr-1.5" />PDF
                </Button>
                <Button variant="outline" size="sm" className="text-slate-600 border-slate-200 text-xs" onClick={handleExportDOCX}>
                  <FileText size={13} className="mr-1.5" />DOCX
                </Button>
              </div>
            </div>

            {/* Corpo do relatório scrollável */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Título */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Relatório de Impacto Social</h2>
                <p className="text-sm text-slate-500 mt-1">Instituto Semear · Período de 01 a 30 de junho de 2026</p>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: Users,      value: totalBenef.toLocaleString('pt-BR'), label: 'Beneficiários',    delta: '+96 este mês',     color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { icon: DollarSign, value: fmtFull(totalRaised),               label: 'Arrecadado',       delta: '+18% vs. anterior', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { icon: Activity,   value: totalActions.toString(),             label: 'Ações realizadas', delta: null,                color: 'text-amber-600',   bg: 'bg-amber-50' },
                  { icon: FolderOpen, value: reportProjects.length.toString(),    label: 'Projetos ativos',  delta: null,                color: 'text-slate-600',   bg: 'bg-slate-50' },
                ].map(({ icon: Icon, value, label, delta, color, bg }) => (
                  <div key={label} className={`${bg} rounded-xl p-4`}>
                    <Icon size={18} className={`${color} mb-2`} />
                    <div className="text-2xl font-bold text-slate-900 leading-tight">{value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                    {delta && <div className="text-xs text-emerald-600 font-semibold mt-1">{delta}</div>}
                  </div>
                ))}
              </div>

              {/* Investimento por projeto */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Investimento por Projeto</h3>
                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                  {sortedByRaised.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="text-base w-6 text-center flex-shrink-0">{p.icon}</span>
                      <span className="text-sm text-slate-600 w-40 truncate flex-shrink-0">{p.name}</span>
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${Math.round((p.raised / maxRaised) * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 w-16 text-right flex-shrink-0">
                        {fmt(p.raised)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projetos cards */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Projetos Sociais</h3>
                <div className="grid grid-cols-2 gap-3">
                  {sortedByRaised.map((p) => (
                    <div key={p.id} className="border border-slate-200 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl leading-none mt-0.5">{p.icon}</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 text-sm leading-tight">{p.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{p.category}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                          { v: p.beneficiaries.toLocaleString('pt-BR'), l: 'Benef.', c: 'text-slate-900' },
                          { v: p.actions.toString(), l: 'Ações', c: 'text-slate-900' },
                          { v: fmt(p.raised), l: 'Invest.', c: 'text-indigo-700' },
                        ].map(({ v, l, c }) => (
                          <div key={l} className="text-center bg-slate-50 rounded-lg py-2">
                            <div className={`text-base font-bold leading-tight ${c}`}>{v}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{l}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {p.ods.map((o) => (
                          <span key={o} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            ODS {o}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doadores */}
              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Doadores & Captação</h3>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[
                    { value: `${retentionRate}%`, label: 'Retenção D30',   color: 'text-emerald-700' },
                    { value: donors.length.toString(), label: 'Doadores ativos', color: 'text-slate-900' },
                    { value: 'R$ 185',            label: 'Ticket médio',   color: 'text-slate-900' },
                  ].map(({ value, label, color }) => (
                    <div key={label} className="border border-slate-200 rounded-xl p-4 text-center">
                      <div className={`text-3xl font-bold ${color}`}>{value}</div>
                      <div className="text-xs text-slate-500 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
                {churnCount > 0 && (
                  <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                    <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />
                    <span>
                      <strong>{churnCount} doadores em risco de churn</strong> — campanha de reativação recomendada para julho.
                    </span>
                  </div>
                )}
              </div>

              {/* Análise da IA */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Análise da IA</h3>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 rounded-xl p-5">
                  <div className="prose prose-sm prose-slate max-w-none prose-headings:text-indigo-700 prose-strong:text-slate-900">
                    <ReactMarkdown>{aiContent}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
