import { useState } from 'react'
import { useAppData } from '../context/AppDataContext'
import { KpiCard } from '../components/KpiCard'
import { PeriodToggle } from '../components/PeriodToggle'
import { RevenueBarChart } from '../components/RevenueBarChart'
import { RetentionDonutChart } from '../components/RetentionDonutChart'

export default function Dashboard() {
  const { kpis } = useAppData()
  const [period, setPeriod] = useState('Mês')

  const kpiCards = [
    {
      icon: '💰',
      delta: kpis.totalRaisedDelta,
      deltaType: 'up' as const,
      value: 'R$ 487k',
      label: 'Total arrecadado',
    },
    {
      icon: '🤝',
      delta: kpis.beneficiariesDelta,
      deltaType: 'up' as const,
      value: '1.284',
      label: 'Beneficiários',
    },
    {
      icon: '📋',
      delta: kpis.activeProjectsDelta,
      deltaLabel: `+${kpis.activeProjectsDelta}`,
      deltaType: 'up' as const,
      value: String(kpis.activeProjects),
      label: 'Projetos ativos',
    },
    {
      icon: '❤️',
      delta: kpis.averageTicketDelta,
      deltaType: 'down' as const,
      value: `R$ ${kpis.averageTicket}`,
      label: 'Ticket médio',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-700">Visão geral</h2>
        <PeriodToggle periods={['Mês', 'Trimestre', 'Ano']} active={period} onChange={setPeriod} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <KpiCard key={card.label} {...card} />
        ))}
      </div>

      <div className="flex gap-4">
        <RevenueBarChart />
        <RetentionDonutChart />
      </div>
    </div>
  )
}
