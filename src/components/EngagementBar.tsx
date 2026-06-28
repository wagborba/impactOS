import { cn } from '../lib/utils'

interface EngagementBarProps {
  score: number
}

export function EngagementBar({ score }: EngagementBarProps) {
  const color = score >= 70 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-medium text-slate-700">{score}</span>
    </div>
  )
}
