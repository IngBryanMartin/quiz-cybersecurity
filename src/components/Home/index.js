import React, { useState } from 'react';
import './index.scss';
import { firestore, collection, addDoc } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';


function Home() {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    if (name.length >= 8 && name.length <= 30) {
      // Guardar el nombre en la base de datos de Firebase
      addDoc(collection(firestore, 'participants'), { name })
        .then(() => {
          // La operación de guardado fue exitosa
          console.log('Nombre guardado en Firebase');
        })
        .catch((error) => {
          // Ocurrió un error al guardar el nombre
          console.error('Error al guardar el nombre en Firebase:', error);
        });
  
      // Redirige al participante a la siguiente página del cuestionario
       navigate('/quiz', { state: { participantName: name } });
    } else {
      setErrorMessage('Es necesario digitar un nombre válido');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };
  

  return (
    <div className="App">
      <div className="content">
        <div className="title">
          <h1>¡ES HORA DE PONER A<br />PRUEBA TUS CONOCIMIENTOS<br />EN CIBERSEGURIDAD!</h1>
        </div>
        <div className="subtitle">
          <h2>¿CREES ESTAR LISTO PARA EL DESAFIO?</h2>
        </div>
        <div className="name">
          <h3>Mi nombre es...</h3>
          <input
            type="text"
            placeholder="DIGITA TU NOMBRE COMPLETO"
            value={name}
            onChange={handleChange}
            required
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        <div className="buttons">
          {name.length >= 8 && name.length <= 30 ? (
            <Link className="start-btn" to="/quiz" onClick={handleSubmit}>ESTOY LISTO</Link>
          ) : (
            <button className="start-btn" disabled>ESTOY LISTO</button>
          )}
          <a className="goto-btn" href="https://www.google.com/">VER CLASE</a>
          <Link className="ranking-btn" to="/ranking" onClick={handleSubmit}>RANKING</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
