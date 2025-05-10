import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'investor' })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
      email: formData.email,
      role: formData.role,
      name: formData.role === 'investor' ? 'Demo Investor' : 'Demo Entrepreneur'
    })
    navigate(`/dashboard/${formData.role}`)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to Business Nexus</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          className="w-full px-3 py-2 border rounded-md"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Password</label>
        <input 
          type="password" 
          className="w-full px-3 py-2 border rounded-md"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">I am a</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              className="form-radio"
              name="role"
              value="investor"
              checked={formData.role === 'investor'}
              onChange={() => setFormData({...formData, role: 'investor'})}
            />
            <span className="ml-2">Investor</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              className="form-radio"
              name="role"
              value="entrepreneur"
              checked={formData.role === 'entrepreneur'}
              onChange={() => setFormData({...formData, role: 'entrepreneur'})}
            />
            <span className="ml-2">Entrepreneur</span>
          </label>
        </div>
      </div>
      
      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
        Login
      </button>
    </form>
  )
}

export default LoginForm