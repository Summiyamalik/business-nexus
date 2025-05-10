import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const DashboardLayout = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">Business Nexus</h1>
          <p className="text-sm text-gray-500">Welcome, {user.name}</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to={`/dashboard/${user.role}`} 
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to={`/profile/${user.role}/me`} 
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              >
                My Profile
              </Link>
            </li>
            <li>
              <button 
                onClick={() => {
                  localStorage.removeItem('business_nexus_user')
                  navigate('/login')
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout