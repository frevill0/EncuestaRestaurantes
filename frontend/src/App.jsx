import { useState } from 'react'
import './App.css'

function App() {
  const API_URL = import.meta.env.VITE_API_URL
  const ORIGEN = import.meta.env.VITE_ORIGEN || 'terra'

  const [ratings, setRatings] = useState({
    servicio_terra: '',
    satisfaccion_platos: '',
    origen: ORIGEN
  })
  const [submitted, setSubmitted] = useState(false)

  const emojis = [
    { face: '😊', text: 'Excelente' },
    { face: '🙂', text: 'Bueno' },
    { face: '😐', text: 'Aceptable' },
    { face: '😕', text: 'Deficiente' },
    { face: '😠', text: 'Muy deficiente' }
  ]

  const satisfactionLevels = [
    { face: '😊', text: 'Muy satisfecho(a)' },
    { face: '🙂', text: 'Satisfecho(a)' },
    { face: '😐', text: 'Neutral' },
    { face: '😕', text: 'Insatisfecho(a)' },
    { face: '😠', text: 'Muy insatisfecho(a)' }
  ]

  const handleRating = (category, value, options) => {
    setRatings(prev => ({
      ...prev,
      [category]: options[value - 1].text
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
      const response = await fetch(`${API_URL}/EncuestaQtgc/calificaciones`, {
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
          servicio_terra: '',
          satisfaccion_platos: '',
          origen: ORIGEN
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
      id: 'servicio_terra',
      text: '¿Cómo calificarías el servicio recibido en los restaurantes del Quito Tenis y Golf Club?',
      options: emojis
    },
    {
      id: 'satisfaccion_platos',
      text: '¿Qué tan satisfecho(a) estás con la calidad de platos ofrecidos en los restaurantes del club?',
      options: satisfactionLevels
    }
  ]

  return (
    <div className="page-container">
      <div className="rating-container">
        <h1>Evaluación de Servicios - Restaurante Terra</h1>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {questions.map((question) => (
              <div key={question.id} className="question-container">
                <p className="rating-text">{question.text}</p>
                <div className="faces-container">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`face ${ratings[question.id] === option.text ? 'active' : ''}`}
                      onClick={() => handleRating(question.id, index + 1, question.options)}
                    >
                      <span className="emoji">{option.face}</span>
                      <span className="emoji-text">{option.text}</span>
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
