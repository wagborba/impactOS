import { cn } from '../lib/utils'

interface KpiCardProps {
  icon?: string
  delta: number
  deltaLabel?: string
  deltaType: 'up' | 'down' | 'attention'
  value: string
  label: string
}

export function KpiCard({ icon, delta, deltaLabel, deltaType, value, label }: KpiCardProps) {
  const badgeClass =
    deltaType === 'up'
      ? 'bg-emerald-50 text-emerald-600'
      : deltaType === 'down'
      ? 'bg-red-50 text-red-500'
      : 'bg-red-50 text-red-600 border border-red-200'

  const deltaText =
    deltaLabel ??
    (deltaType !== 'attention' ? `${delta > 0 ? '+' : ''}${delta}%` : String(delta))

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        {icon ? <span className="text-2xl">{icon}</span> : <div />}
        <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', badgeClass)}>
          {deltaText}
        </span>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  )
}
