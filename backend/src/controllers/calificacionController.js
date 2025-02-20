import Calificacion from '../models/Calificacion.js'

export const createCalificacion = async (req, res) => {
  try {
    const calificacion = new Calificacion(req.body)
    await calificacion.save()
    res.status(201).json({ message: 'Evaluación guardada exitosamente' })
  } catch (error) {
    console.error('Error al guardar calificación:', error)
    res.status(500).json({ error: 'Error al guardar la evaluación' })
  }
}

export const getCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Calificacion.find().sort({ createdAt: -1 })
    res.status(200).json(calificaciones)
  } catch (error) {
    console.error('Error al obtener calificaciones:', error)
    res.status(500).json({ error: 'Error al obtener las evaluaciones' })
  }
} 