import mongoose from 'mongoose'

const calificacionSchema = new mongoose.Schema({
  organizacion: { 
    type: String, 
    required: true,
    enum: ['Excelente', 'Buena', 'Aceptable', 'Deficiente', 'Muy deficiente']
  },
  instalaciones: { 
    type: String, 
    required: true,
    enum: ['Excelente', 'Buena', 'Aceptable', 'Deficiente', 'Muy deficiente']
  },
  gastronomia: { 
    type: String, 
    required: true,
    enum: ['Excelente', 'Buena', 'Aceptable', 'Deficiente', 'Muy deficiente']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
})

export default mongoose.model('Calificaciones', calificacionSchema) 