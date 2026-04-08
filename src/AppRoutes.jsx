import { HashRouter, Route, Routes } from 'react-router-dom'

//Componentes Layouts
import { Content } from './features/layout/components/Content'
import { Footer } from './features/layout/components/Footer'
import { Header } from './features/layout/components/Header'

//Api
import { ApiRyc } from './shared/components/ApiRy'

// Login
import { Login } from './features/auth/components/Login'
import { ProtectedRoute } from './features/auth/components/ProtectedRoute'
import { ErrorGuard } from './features/auth/dashboard/components/ErrorGuard'

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path='/Api' element={<ProtectedRoute><ApiRyc /></ProtectedRoute>} />
        <Route path='/errors' element={<ProtectedRoute><ErrorGuard /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}
