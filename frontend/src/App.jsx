import { useState } from 'react'
import './App.css'

function App() {
  const [ratings, setRatings] = useState({
    organizacion: '',
    instalaciones: '',
    gastronomia: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  const emojis = [
    { face: '😊', text: 'Excelente' },
    { face: '🙂', text: 'Buena' },
    { face: '😐', text: 'Aceptable' },
    { face: '😕', text: 'Deficiente' },
    { face: '😠', text: 'Muy deficiente' }
  ]

  const handleRating = (category, value) => {
    const calificaciones = ['Excelente', 'Buena', 'Aceptable', 'Deficiente', 'Muy deficiente']
    setRatings(prev => ({
      ...prev,
      [category]: calificaciones[value - 1]
    }))
  }

  const isFormValid = () => {
    return Object.values(ratings).every(rating => rating !== '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      alert('Por favor, complete todas las preguntas')
      return
    }

    try {
      const response = await fetch(`${API_URL}/calificaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratings)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitted(true)
        setRatings({
          organizacion: '',
          instalaciones: '',
          gastronomia: ''
        })
      } else {
        alert(data.error || 'Error al enviar la evaluación')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión. Por favor, intente nuevamente.')
    }
  }

  const questions = [
    {
      id: 'organizacion',
      text: '¿Cómo calificarías la organización general de los juegos internos?'
    },
    {
      id: 'instalaciones',
      text: '¿Cómo calificarías el estado de las instalaciones (estado de las canchas, señalización, accesibilidad)?'
    },
    {
      id: 'gastronomia',
      text: '¿Cómo calificarías la calidad y variedad de la oferta gastronómica durante los juegos?'
    }
  ]

  return (
    <div className="page-container">
      <div className="rating-container">
        <h1>Evaluación de Servicios QTGC</h1>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {questions.map((question) => (
              <div key={question.id} className="question-container">
                <p className="rating-text">{question.text}</p>
                <div className="faces-container">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`face ${ratings[question.id] === emoji.text ? 'active' : ''}`}
                      onClick={() => handleRating(question.id, index + 1)}
                    >
                      <span className="emoji">{emoji.face}</span>
                      <span className="emoji-text">{emoji.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={!isFormValid()}
            >
              Enviar Evaluación
            </button>
          </form>
        ) : (
          <div className="thank-you">
            <div className="thank-you-emoji">🙏</div>
            <h2>¡Gracias por su evaluación!</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
