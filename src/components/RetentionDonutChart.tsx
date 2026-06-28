import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useAppData } from '../context/AppDataContext'

export function RetentionDonutChart() {
  const { retentionRate } = useAppData()
  const data = [
    { name: 'Retidos', value: retentionRate },
    { name: 'Perdidos', value: 100 - retentionRate },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm w-72 flex-shrink-0">
      <div className="font-semibold text-slate-900 mb-0.5">Retenção de doadores</div>
      <div className="text-xs text-slate-500 mb-4">D30 · últimos 6 meses</div>
      <div className="relative flex justify-center">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill="#10B981" />
              <Cell fill="#E2E8F0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">{retentionRate}%</span>
          <span className="text-xs text-slate-500">retenção</span>
        </div>
      </div>
      <div className="flex justify-around mt-4 pt-4 border-t border-slate-100">
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">312</div>
          <div className="text-xs text-slate-500">Doadores</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-600">47</div>
          <div className="text-xs text-slate-500">Novos</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-500">38</div>
          <div className="text-xs text-slate-500">Em risco</div>
        </div>
      </div>
    </div>
  )
}
