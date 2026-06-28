import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Archive, Trash2, AlertTriangle } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import type { Project } from '../types'
import { StatusBadge } from './StatusBadge'
import { OdsBadge } from './OdsBadge'
import { Button } from './ui/button'
import { useAppData } from '../context/AppDataContext'

interface ProjectDrawerProps {
  project: Project | null
  open: boolean
  onClose: () => void
}

const formatCurrency = (v: number) => {
  if (v >= 1000000) return `R$ ${(v / 1000000).toFixed(1)}M`
  if (v >= 1000) return `R$ ${(v / 1000).toFixed(1)}k`
  return `R$ ${v}`
}

const RECENT_ACTIONS = [
  'Oficina realizada',
  'Entrega de materiais',
  'Reunião com parceiros',
  'Visita ao campo',
]

export function ProjectDrawer({ project, open, onClose }: ProjectDrawerProps) {
  const navigate = useNavigate()
  const { deleteProject, archiveProject } = useAppData()
  const [confirm, setConfirm] = useState<'delete' | 'archive' | null>(null)

  if (!project) return null

  const handleDelete = () => {
    deleteProject(project.id)
    setConfirm(null)
    onClose()
  }

  const handleArchive = () => {
    archiveProject(project.id)
    setConfirm(null)
    onClose()
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) { setConfirm(null); onClose() }
      }}
    >
      <SheetContent side="right" className="w-[480px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{project.icon}</div>
              <div>
                <SheetTitle className="text-lg font-bold text-slate-900">{project.name}</SheetTitle>
                <div className="flex items-center gap-1.5 mt-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.categoryColor }}
                  />
                  <span className="text-sm text-slate-500">{project.category}</span>
                </div>
              </div>
            </div>
            <StatusBadge status={project.status} />
          </div>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Descrição
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-slate-900">
                {project.beneficiaries.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Beneficiários</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-slate-900">{project.actions}</div>
              <div className="text-xs text-slate-500 mt-0.5">Ações</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-emerald-700">
                {formatCurrency(project.raised)}
              </div>
              <div className="text-xs text-emerald-600 mt-0.5">Arrecadado</div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              ODS Alinhados
            </h3>
            <OdsBadge ods={project.ods} />
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Período
            </h3>
            <span className="text-sm text-slate-700">
              {project.startDate} – {project.endDate}
            </span>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Ações Recentes
            </h3>
            <div className="space-y-0">
              {RECENT_ACTIONS.map((acao, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-2.5 border-b border-slate-100 last:border-0"
                >
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0" />
                  <span className="text-sm text-slate-700">{acao}</span>
                  <span className="text-xs text-slate-400 ml-auto">
                    {i + 1} dia{i !== 0 ? 's' : ''} atrás
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => { navigate('/relatorios'); onClose() }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <ExternalLink size={14} className="mr-2" />
            Ver relatório deste projeto
          </Button>

          {/* Zona de perigo */}
          <div className="border-t border-slate-100 pt-4">
            {confirm === null ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50"
                  onClick={() => setConfirm('archive')}
                >
                  <Archive size={13} className="mr-1.5" />
                  Arquivar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => setConfirm('delete')}
                >
                  <Trash2 size={13} className="mr-1.5" />
                  Excluir
                </Button>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">
                    {confirm === 'delete'
                      ? 'Tem certeza? O projeto será excluído permanentemente e não poderá ser recuperado.'
                      : 'O projeto será arquivado e ocultado da lista principal. Você poderá visualizá-lo ativando os filtros.'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-slate-200 text-slate-600"
                    onClick={() => setConfirm(null)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    className={`flex-1 text-white ${
                      confirm === 'delete'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-amber-600 hover:bg-amber-700'
                    }`}
                    onClick={confirm === 'delete' ? handleDelete : handleArchive}
                  >
                    {confirm === 'delete' ? 'Confirmar exclusão' : 'Confirmar arquivamento'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
