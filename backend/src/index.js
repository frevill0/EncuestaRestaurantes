import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

const MONGODB_URI = 'mongodb+srv://frevill02:Qtgc.2025@encuestaqtgc.3ddbz.mongodb.net/'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err))

const ratingSchema = new mongoose.Schema({
  organizacion: { type: Number, required: true },
  instalaciones: { type: Number, required: true },
  gastronomia: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

const Rating = mongoose.model('Calificaciones', ratingSchema)

app.post('/EncuestaQtgc/calificaciones', async (req, res) => {
  try {
    const rating = new Rating(req.body)
    await rating.save()
    res.status(201).json({ message: 'Evaluación guardada exitosamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la evaluación' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
