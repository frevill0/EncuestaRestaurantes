import mongoose from 'mongoose'

const calificacionSchema = new mongoose.Schema({
  servicio_terra: { 
    type: String, 
    required: true,
    enum: ['Excelente', 'Bueno', 'Aceptable', 'Deficiente', 'Muy deficiente']
  },
  satisfaccion_platos: { 
    type: String, 
    required: true,
    enum: ['Muy satisfecho(a)', 'Satisfecho(a)', 'Neutral', 'Insatisfecho(a)', 'Muy insatisfecho(a)']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  origen: {
    type: String,
    default: 'terra',
    required: true
  }
})

export default mongoose.model('Calificaciones', calificacionSchema) 