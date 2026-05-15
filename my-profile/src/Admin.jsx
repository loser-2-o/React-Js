import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Admin() {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [publications, setPublications] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchPublications()
  }, [])

  const fetchPublications = async () => {
    const res = await axios.get('http://localhost:3000/publications')
    setPublications(res.data)
  }

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:3000/publications',
        { id: Number(id), title },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Publication added successfully!')
      setId('')
      setTitle('')
      fetchPublications()
    } catch (err) {
      setMessage('Something went wrong!')
    }
  }

  const handleDelete = async (pubId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/publications/${pubId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Publication deleted!')
      fetchPublications()
    } catch (err) {
      setMessage('Delete failed!')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Admin Panel</h2>
          <div className="flex gap-2">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300"
              onClick={() => navigate('/')}
            >
              Back
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {message && <p className="text-green-600 mb-4">{message}</p>}

        <input
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          placeholder="Publication ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('title').focus()}
        />
        <input
          id="title"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          placeholder="Publication Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mb-8"
          onClick={handleAdd}
        >
          Add Publication
        </button>

        <h3 className="text-lg font-bold text-gray-700 mb-4">All Publications</h3>
        <ul className="space-y-3">
          {publications.map((pub) => (
            <li key={pub._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <span className="text-gray-700">{pub.title}</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 ml-4 shrink-0"
                onClick={() => handleDelete(pub._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Admin