import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import Admin from './Admin'

function Home() {
  const [profile, setProfile] = useState(null)
  const [publications, setPublications] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/profile')
      .then(res => setProfile(res.data))

    axios.get('http://localhost:3000/publications')
      .then(res => setPublications(res.data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Professor Profile</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            onClick={() => navigate('/login')}
          >
            Admin Login
          </button>
        </div>

        {profile && (
          <div className="bg-blue-50 rounded-xl p-6 mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600 mt-2">Department: {profile.department}</p>
            <p className="text-gray-600">Email: {profile.email}</p>
          </div>
        )}

        <h2 className="text-xl font-bold text-gray-700 mb-4">Publications</h2>
        <ul className="space-y-3">
          {publications.map((pub) => (
            <li key={pub._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700">
              {pub.title}
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App