import React, { useState, useEffect } from 'react';
import './index.scss';
import { Link, useLocation } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [participantName, setParticipantName] = useState('');

  const questions = [
    {
      id: 1,
      question: '¿Qué es la ciberseguridad?',
      options: ['Es una medida', 'No lo sé', 'Es seguridad', 'Es una técnica'],
      correctOption: 'Es una medida',
    },
    // Agregar las demás preguntas aquí
    {
      id: 2,
      question: '¿Qué es la hacking?',
      options: ['Es una medida2', 'No lo sé3', 'Es seguridad4', 'Es una técnica5'],
      correctOption: 'Es una medida2',
    },
  ];

  const goToNextQuestion = () => {
    if (selectedOption !== null) {
      calculateScore();
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedOption(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const calculateScore = () => {
    const currentQuestionIndex = currentQuestion - 1;
    const selectedAnswer = selectedOption;
    const correctAnswer = questions[currentQuestionIndex].correctOption;

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
  };

  const totalQuestions = questions.length;

  const location = useLocation();
  const participantNameFromLocation = location.state?.participantName || '';

  useEffect(() => {
    setParticipantName(participantNameFromLocation);
  }, [participantNameFromLocation]);

  const handleQuizSubmit = () => {
    // Validar que se haya ingresado un nombre
    if (participantName.trim() === '') {
      alert('Por favor, ingresa tu nombre');
      return;
    }
    // Validar la longitud del nombre
  if (participantName.length < 8 || participantName.length > 30) {
    alert('El nombre debe tener entre 8 y 30 caracteres');
    return;
  }
    // Guardar el nombre y el resultado en Firebase
    const db = getFirestore();
  addDoc(collection(db, 'rankings'), {
    name: participantName,
    score: score,
  })
    .then(() => {
      alert('¡Nombre y resultado guardados en Firebase!');
      // Realizar cualquier redirección u otra acción que desees
    })
    .catch((error) => {
      console.error('Error al guardar en Firebase:', error);
      // Manejar el error de alguna manera adecuada
    });
  };

  return (
    <div className="quiz">
      {currentQuestion <= totalQuestions ? (
        <>
          <h2 className="quiz-title">
            {currentQuestion}. {questions[currentQuestion - 1].question}
          </h2>
          <div className="card-container">
            {questions[currentQuestion - 1].options.map((option, index) => (
              <div
                key={index}
                className={`card ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="buttons">
            {currentQuestion > 1 && (
              <button onClick={goToPreviousQuestion}>Retroceder</button>
            )}
            <button onClick={goToNextQuestion} disabled={selectedOption === null}>
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2 className="quiz-title">¡Quiz completado!</h2>
          <p>Tu nombre: {participantName}</p>
          <p>Tu puntaje: {score}/{totalQuestions}</p>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
          />
          {participantName.length >= 8 && participantName.length <= 30 ? (
            <Link className="ranking-btn" to="/ranking" onClick={handleQuizSubmit}>ENVIAR</Link>
          ) : (
            <button className="ranking-btn" disabled>ENVIAR</button>
          )}

        </div>
      )}
    </div>
  );
};

export default Quiz;
