// hah om sai ram om bhaskarayaa namaha om namaha sivayaa

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(cors("*"))
app.use(express.json())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json("Pravin Kumar Palavalasa is selected for Internship at Plivo")
})

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`)
})
