import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import InvestorDashboard from './pages/InvestorDashboard'
import EntrepreneurDashboard from './pages/EntrepreneurDashboard'
import InvestorProfile from './pages/InvestorProfile'
import EntrepreneurProfile from './pages/EntrepreneurProfile'
import ChatPage from './pages/ChatPage'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()
  
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/investor" element={
              <ProtectedRoute allowedRoles={['investor']}>
                <InvestorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/entrepreneur" element={
              <ProtectedRoute allowedRoles={['entrepreneur']}>
                <EntrepreneurDashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile/investor/:id" element={<InvestorProfile />} />
            <Route path="/profile/entrepreneur/:id" element={<EntrepreneurProfile />} />
            <Route path="/chat/:userId" element={<ChatPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App