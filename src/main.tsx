import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AppDataProvider } from './context/AppDataContext'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppLayout } from './layouts/AppLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Projetos from './pages/Projetos'
import Beneficiarios from './pages/Beneficiarios'
import Doadores from './pages/Doadores'
import RelatoriosIA from './pages/RelatoriosIA'
import Assistente from './pages/Assistente'
import Configuracoes from './pages/Configuracoes'
import './index.css'

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'projetos', element: <Projetos /> },
      { path: 'beneficiarios', element: <Beneficiarios /> },
      { path: 'doadores', element: <Doadores /> },
      { path: 'relatorios', element: <RelatoriosIA /> },
      { path: 'assistente', element: <Assistente /> },
      { path: 'configuracoes', element: <Configuracoes /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppDataProvider>
        <RouterProvider router={router} />
      </AppDataProvider>
    </AuthProvider>
  </StrictMode>
)
