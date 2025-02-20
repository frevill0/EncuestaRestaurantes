import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://frevill02:Qtgc.2025@encuestaqtgc.3ddbz.mongodb.net/'
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'EncuestaQtgc'
    }

    await mongoose.connect(MONGODB_URI, options)
    console.log('✅ Conexión exitosa a MongoDB')
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message)
    process.exit(1)
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB desconectado')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ Error en MongoDB:', err.message)
})

export default connectDB
