import express from 'express'
import { createCalificacion, getCalificaciones } from '../controllers/calificacionController.js'

const router = express.Router()

router.post('/calificaciones', createCalificacion)
router.get('/calificaciones', getCalificaciones)

export default router 