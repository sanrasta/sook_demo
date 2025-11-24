import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto-redirect to live page
    navigate('/live')
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Sook</h1>
        <p className="text-purple-200">Loading...</p>
      </div>
    </div>
  )
}

export default HomePage

