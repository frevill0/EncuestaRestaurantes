import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './database.js'
import calificacionRoutes from './routes/calificacionRoutes.js'

// Configuración inicial
dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Variables de entorno
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://frevill02:Qtgc.2025@encuestaqtgc.3ddbz.mongodb.net/'
const PORT = process.env.PORT || 3000

// Conexión a la base de datos
connectDB(MONGODB_URI)

// Rutas API
app.use('/EncuestaQtgc', calificacionRoutes)

app.use('/', (req, res) => {
  res.send('API Encuesta QTGC')
})

// Middleware de error
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API corriendo en puerto ${PORT}`)
})

export default app
