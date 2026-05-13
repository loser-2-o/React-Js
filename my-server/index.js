const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('Error:', err))

// Publication Schema
const publicationSchema = new mongoose.Schema({
  id: Number,
  title: String
})

const Publication = mongoose.model('Publication', publicationSchema)

// Route 1 - Home
app.get('/', (req, res) => {
  res.send('Server is running!')
})

// Route 2 - Profile
app.get('/profile', (req, res) => {
  res.json({
    name: 'Professor Anamur Rashid',
    department: 'CSE',
    email: 'muhammadanamurrashid@gmail.com'
  })
})

// Route 3 - Get all publications
app.get('/publications', async (req, res) => {
  const publications = await Publication.find()
  res.json(publications)
})

// Route 4 - Add new publication
app.post('/publications', async (req, res) => {
  const { id, title } = req.body
  const publication = new Publication({ id, title })
  await publication.save()
  res.json({ message: 'Publication added!', publication })
})

app.listen(process.env.PORT, () => {
  console.log('Server started on port', process.env.PORT)
})