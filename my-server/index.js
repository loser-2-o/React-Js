const express = require('express')
const app = express()

app.use(express.json())

// Route 1 - Home
app.get('/', (req, res) => {
  res.send('Server is running!')
})

// Route 2 - Profile
app.get('/profile', (req, res) => {
  res.json({
    name: 'Professor Anamur  Rashid',
    department: 'CSE',
    email: 'muhammadanamurrashid@gmail.com'
  })
})

// Route 3 - Publications
app.get('/publications', (req, res) => {
  res.json([
    {
      id: 622,
      title: 'Generative Digital Twins for Adversarially Robust Beam Management in 6G mmWave Networks'
    },
    {
      id: 294,
      title: 'Multi-Task Deep Learning for Vitamin Deficiency Disease and Multiple-Deficiency Prediction with Risk Scoring and Data Mining Driven Pattern Discovery'
    }
  ])
})
// Route 4 - Add new publication
app.post('/publications', (req, res) => {
  const { id, title } = req.body
  res.json({
    message: 'Publication added successfully!',
    publication: { id, title }
  })
})
app.listen(3000, () => {
  console.log('Server started on port 3000')
})