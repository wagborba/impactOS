interface PeriodToggleProps {
  periods: string[]
  active: string
  onChange: (p: string) => void
}

export function PeriodToggle({ periods, active, onChange }: PeriodToggleProps) {
  return (
    <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            active === p
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  )
}
