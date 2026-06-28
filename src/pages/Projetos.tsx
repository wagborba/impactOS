import { useState } from 'react'
import { Plus, FolderOpen } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import type { Project } from '../types'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectDrawer } from '../components/ProjectDrawer'
import { ProjectFormSheet } from '../components/ProjectFormSheet'
import { Button } from '../components/ui/button'

type FilterStatus = 'todos' | 'em_andamento' | 'planejamento' | 'concluido'

const filterTabs: { key: FilterStatus; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'em_andamento', label: 'Em andamento' },
  { key: 'planejamento', label: 'Planejamento' },
  { key: 'concluido', label: 'Concluído' },
]

export default function Projetos() {
  const { projects } = useAppData()
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('todos')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [showArchived, setShowArchived] = useState(false)

  const active = projects.filter((p) => !p.archived)
  const archived = projects.filter((p) => p.archived)
  const pool = showArchived ? archived : active

  const filtered =
    activeFilter === 'todos' ? pool : pool.filter((p) => p.status === activeFilter)

  const countByStatus = (key: FilterStatus) =>
    key === 'todos' ? active.length : active.filter((p) => p.status === key).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {filterTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setActiveFilter(key); setShowArchived(false) }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === key && !showArchived
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {label} · {countByStatus(key)}
            </button>
          ))}
          {archived.length > 0 && (
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                showArchived
                  ? 'bg-amber-100 text-amber-700'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <FolderOpen size={13} />
              Arquivados · {archived.length}
            </button>
          )}
        </div>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => setFormOpen(true)}
        >
          <Plus size={14} className="mr-1.5" />
          Novo projeto
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <FolderOpen size={40} className="mb-3 opacity-40" />
          <p className="text-sm">Nenhum projeto encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => {
                setSelectedProject(project)
                setDrawerOpen(true)
              }}
            />
          ))}
        </div>
      )}

      <ProjectDrawer
        project={selectedProject}
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelectedProject(null) }}
      />

      <ProjectFormSheet open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  )
}
