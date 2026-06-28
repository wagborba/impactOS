export interface Organization {
  id: string
  name: string
  plan: string
  projectsUsed: number
  projectsLimit: number
}

export interface User {
  id: string
  name: string
  role: string
  initials: string
}

export interface Project {
  id: string
  name: string
  category: string
  categoryColor: string
  status: 'em_andamento' | 'planejamento' | 'concluido'
  archived?: boolean
  description: string
  beneficiaries: number
  actions: number
  raised: number
  ods: number[]
  startDate: string
  endDate: string
  icon: string
}

export interface Beneficiary {
  id: string
  name: string
  initials: string
  color: string
  gender: string
  ageRange: string
  city: string
  project: string
  actions: number
}

export interface Donor {
  id: string
  name: string
  initials: string
  email: string
  segment: 'Grande doador' | 'Recorrente' | 'Eventual'
  totalDonated: number
  lastDonation: string
  origin: string
  engagement: number
  atChurnRisk: boolean
}

export interface MonthlyRevenue {
  month: string
  value: number
  isCurrent: boolean
}

export interface AppData {
  org: Organization
  user: User
  projects: Project[]
  beneficiaries: Beneficiary[]
  donors: Donor[]
  monthlyRevenue: MonthlyRevenue[]
  retentionRate: number
  kpis: {
    totalRaised: number
    totalRaisedDelta: number
    beneficiaries: number
    beneficiariesDelta: number
    activeProjects: number
    activeProjectsDelta: number
    averageTicket: number
    averageTicketDelta: number
  }
}
