import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useAppData } from '../context/AppDataContext'

export function RevenueBarChart() {
  const { monthlyRevenue } = useAppData()

  const formatValue = (v: number) =>
    v >= 1000000
      ? `R$ ${(v / 1000000).toFixed(1)}M`
      : v >= 1000
      ? `R$ ${(v / 1000).toFixed(0)}k`
      : `R$ ${v}`

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-semibold text-slate-900">Receita mensal</div>
          <div className="text-xs text-slate-500">Arrecadação por mês · 2026</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-slate-900">R$ 487.250</div>
          <div className="text-xs text-emerald-600 font-semibold">+18,2% vs. ano anterior</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={monthlyRevenue} barSize={18}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
          />
          <Tooltip
            formatter={(v) => [formatValue(Number(v)), 'Arrecadado']}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {monthlyRevenue.map((entry, index) => (
              <Cell key={index} fill={entry.isCurrent ? '#4F46E5' : '#C7D2FE'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
