interface StatusBadgeProps {
  status: 'em_andamento' | 'planejamento' | 'concluido'
}

const statusConfig = {
  em_andamento: { label: 'Em andamento', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  planejamento: { label: 'Planejamento', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  concluido: { label: 'Concluído', className: 'bg-slate-100 text-slate-600 border-slate-200' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${config.className}`}>
      {config.label}
    </span>
  )
}
