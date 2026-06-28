interface StatCardProps {
  label: string
  value: string
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="text-sm text-slate-500 mb-2">{label}</div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
    </div>
  )
}
