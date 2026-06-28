interface OdsBadgeProps {
  ods: number[]
}

export function OdsBadge({ ods }: OdsBadgeProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {ods.map((n) => (
        <span key={n} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
          ODS {n}
        </span>
      ))}
    </div>
  )
}
