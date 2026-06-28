import type { Project } from '../types'
import { StatusBadge } from './StatusBadge'
import { OdsBadge } from './OdsBadge'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

const formatCurrency = (v: number) => {
  if (v >= 1000000) return `R$ ${(v / 1000000).toFixed(1)}M`
  if (v >= 1000) return `R$ ${(v / 1000).toFixed(1)}k`
  return `R$ ${v}`
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{project.icon}</div>
          <div>
            <div className="font-semibold text-slate-900 text-sm">{project.name}</div>
            <div className="flex items-center gap-1 mt-0.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: project.categoryColor }}
              />
              <span className="text-xs text-slate-500">{project.category}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div>
          <div className="text-base font-bold text-slate-900">
            {project.beneficiaries.toLocaleString('pt-BR')}
          </div>
          <div className="text-xs text-slate-500">Beneficiários</div>
        </div>
        <div>
          <div className="text-base font-bold text-slate-900">{project.actions}</div>
          <div className="text-xs text-slate-500">Ações</div>
        </div>
        <div>
          <div className="text-base font-bold text-emerald-600">{formatCurrency(project.raised)}</div>
          <div className="text-xs text-slate-500">Arrecadado</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <OdsBadge ods={project.ods} />
        <span className="text-xs text-slate-400">
          {project.startDate} – {project.endDate}
        </span>
      </div>
    </div>
  )
}
