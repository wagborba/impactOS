type Segment = 'Grande doador' | 'Recorrente' | 'Eventual'

interface SegmentBadgeProps {
  segment: Segment
}

const segmentConfig: Record<Segment, string> = {
  'Grande doador': 'bg-purple-100 text-purple-700',
  Recorrente: 'bg-emerald-100 text-emerald-700',
  Eventual: 'bg-slate-100 text-slate-600',
}

export function SegmentBadge({ segment }: SegmentBadgeProps) {
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${segmentConfig[segment]}`}>
      {segment}
    </span>
  )
}
