import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { seedData } from '../data/seed'
import type { Project, Beneficiary, Donor, Organization, User, MonthlyRevenue } from '../types'

interface AppContextValue {
  org: Organization
  user: User
  projects: Project[]
  beneficiaries: Beneficiary[]
  donors: Donor[]
  monthlyRevenue: MonthlyRevenue[]
  retentionRate: number
  kpis: typeof seedData.kpis
  addProject: (p: Omit<Project, 'id'>) => void
  deleteProject: (id: string) => void
  archiveProject: (id: string) => void
  addBeneficiary: (b: Omit<Beneficiary, 'id'>) => void
  addDonor: (d: Omit<Donor, 'id'>) => void
}

const AppDataContext = createContext<AppContextValue | null>(null)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(seedData.projects)
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(seedData.beneficiaries)
  const [donors, setDonors] = useState<Donor[]>(seedData.donors)

  const addProject = (p: Omit<Project, 'id'>) =>
    setProjects((prev) => [...prev, { ...p, id: Date.now().toString() }])

  const deleteProject = (id: string) =>
    setProjects((prev) => prev.filter((p) => p.id !== id))

  const archiveProject = (id: string) =>
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, archived: true } : p)))

  const addBeneficiary = (b: Omit<Beneficiary, 'id'>) =>
    setBeneficiaries((prev) => [...prev, { ...b, id: Date.now().toString() }])

  const addDonor = (d: Omit<Donor, 'id'>) =>
    setDonors((prev) => [...prev, { ...d, id: Date.now().toString() }])

  return (
    <AppDataContext.Provider
      value={{
        org: seedData.org,
        user: seedData.user,
        projects,
        beneficiaries,
        donors,
        monthlyRevenue: seedData.monthlyRevenue,
        retentionRate: seedData.retentionRate,
        kpis: seedData.kpis,
        addProject,
        deleteProject,
        archiveProject,
        addBeneficiary,
        addDonor,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be inside AppDataProvider')
  return ctx
}
