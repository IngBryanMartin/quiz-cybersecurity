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
      question: '¿Qué es el phishing?',
      options: ['Un programa malicioso que se propaga por correo electrónico.', 'El proceso de engañar a las personas para obtener información confidencial.', 'Un ataque de denegación de servicio.', 'Una técnica de cifrado de datos.'],
      correctOption: 'El proceso de engañar a las personas para obtener información confidencial.',
    },
    // Agregar las demás preguntas aquí
    {
      id: 2,
      question: '¿Qué es un cortafuegos (firewall)?',
      options: ['Un tipo de malware.', 'Un dispositivo de hardware o software que protege una red.', 'Un protocolo de comunicación utilizado en redes inalámbricas.', 'Una técnica de encriptación de datos.'],
      correctOption: 'Un dispositivo de hardware o software que protege una red.',
    },
    {
      "id": 3,
      "question": "¿Qué es la ciberseguridad?",
      "options": [
        "Un programa que busca y elimina virus en un sistema.",
        "Un conjunto de medidas para garantizar la seguridad física de los equipos informáticos.",
        "Un sistema de protección contra incendios en centros de datos.",
        "Un conjunto de prácticas y tecnologías para proteger los sistemas y datos contra amenazas cibernéticas."
      ],
      "correctOption": "Un conjunto de prácticas y tecnologías para proteger los sistemas y datos contra amenazas cibernéticas."
    },
    {
      "id": 4,
      "question": "¿Qué es el malware?",
      "options": [
        "Un tipo de software utilizado para proteger la información personal.",
        "Un programa que se utiliza para enviar correos electrónicos no deseados.",
        "Una técnica de autenticación en dos pasos.",
        "Software malicioso diseñado para dañar o acceder a un sistema sin autorización."
      ],
      "correctOption": "Software malicioso diseñado para dañar o acceder a un sistema sin autorización."
    },
    {
      "id": 5,
      "question": "¿Qué es una contraseña segura?",
      "options": [
        "Una contraseña que se comparte con otras personas.",
        "Una palabra fácil de recordar.",
        "Una combinación de letras, números y caracteres especiales.",
        "Una contraseña que se cambia cada mes."
      ],
      "correctOption": "Una combinación de letras, números y caracteres especiales."
    },
    {
      "id": 6,
      "question": "¿Qué es el ransomware?",
      "options": [
        "Un tipo de ataque de fuerza bruta.",
        "Un programa que permite el acceso remoto a una computadora.",
        "Un programa que encripta archivos y exige un rescate para desbloquearlos.",
        "Una técnica para eludir los sistemas de detección de intrusos."
      ],
      "correctOption": "Un programa que encripta archivos y exige un rescate para desbloquearlos."
    },
    {
      "id": 7,
      "question": "¿Qué es una copia de seguridad (backup)?",
      "options": [
        "Una técnica para proteger la privacidad en línea.",
        "Una réplica exacta de un sistema informático.",
        "Un tipo de ataque de ingeniería social.",
        "Una copia de los datos importantes almacenados en caso de pérdida o daño."
      ],
      "correctOption": "Una copia de los datos importantes almacenados en caso de pérdida o daño."
    },
    {
      "id": 8,
      "question": "¿Qué es el phishing por spear-phishing?",
      "options": [
        "Un tipo de ataque dirigido a una persona o grupo específico.",
        "Un programa malicioso que se propaga a través de las redes sociales.",
        "Una técnica de ataque que utiliza la manipulación psicológica.",
        "Una forma de malware que se propaga a través de dispositivos USB."
      ],
      "correctOption": "Un tipo de ataque dirigido a una persona o grupo específico."
    },
    {
      "id": 9,
      "question": "¿Qué es el robo de identidad (identity theft)?",
      "options": [
        "Una técnica de seguridad para proteger la identidad en línea.",
        "El proceso de crear una identidad falsa en línea.",
        "El acto de obtener y utilizar información personal de alguien sin su consentimiento.",
        "Una forma de ataque de denegación de servicio."
      ],
      "correctOption": "El acto de obtener y utilizar información personal de alguien sin su consentimiento."
    },
    {
      "id": 10,
      "question": "¿Qué es el cifrado de datos?",
      "options": [
        "Un proceso para desactivar los cortafuegos.",
        "La transformación de datos en un código ilegible para proteger su confidencialidad.",
        "Una técnica de ataque que utiliza fuerza bruta para descifrar contraseñas.",
        "Un tipo de ataque que utiliza software malicioso para obtener información personal."
      ],
      "correctOption": "La transformación de datos en un código ilegible para proteger su confidencialidad."
    },
    {
      "id": 11,
      "question": "¿Por qué no se debe confiar ciegamente en las URL?",
      "options": [
        "Las URL son siempre seguras y confiables.",
        "Las URL pueden ser fácilmente modificadas por los usuarios.",
        "Las URL solo contienen información básica sobre el sitio web.",
        "Las URL son solo identificadores únicos para los sitios web."
      ],
      "correctOption": "Las URL pueden ser fácilmente modificadas por los usuarios."
    },
    {
      "id": 12,
      "question": "¿Cuál de las siguientes contraseñas es más segura?",
      "options": [
        "123456",
        "Abcdef",
        "Password",
        "P@55w0rd"
      ],
      "correctOption": "P@55w0rd"
    },
    {
      "id": 13,
      "question": "¿Cuál de las siguientes prácticas aumenta la seguridad en línea?",
      "options": [
        "Usar la misma contraseña para todas las cuentas.",
        "Hacer clic en enlaces sospechosos recibidos por correo electrónico.",
        "Mantener el software y los sistemas operativos actualizados.",
        "Compartir información personal en redes sociales públicas."
      ],
      "correctOption": "Mantener el software y los sistemas operativos actualizados."
    },
    {
      "id": 14,
      "question": "¿Qué es un antivirus?",
      "options": [
        "Un tipo de software malicioso que roba información personal.",
        "Un dispositivo físico utilizado para proteger una red.",
        "Un programa informático diseñado para detectar y eliminar software malicioso.",
        "Una práctica que consiste en no compartir información en línea."
      ],
      "correctOption": "Un programa informático diseñado para detectar y eliminar software malicioso."
    },
    {
      "id": 15,
      "question": "¿Qué es un ataque de denegación de servicio (DDoS)?",
      "options": [
        "Un ataque que intenta obtener información personal mediante el engaño y la suplantación de identidad.",
        "Un ataque que utiliza software malicioso para acceder a un sistema sin autorización.",
        "Un ataque que busca inundar un sistema o red con solicitudes para interrumpir su funcionamiento.",
        "Un ataque que utiliza fuerza bruta para descifrar contraseñas."
      ],
      "correctOption": "Un ataque que busca inundar un sistema o red con solicitudes para interrumpir su funcionamiento."
    },
    {
      "id": 16,
      "question": "¿Cuál de las siguientes opciones es un ejemplo de autenticación multifactor?",
      "options": [
        "Ingresar solo un nombre de usuario y contraseña.",
        "Ingresar un código de verificación enviado por SMS después de ingresar un nombre de usuario y contraseña.",
        "Ingresar una contraseña seguida de un PIN de cuatro dígitos.",
        "Ingresar una dirección de correo electrónico y una contraseña."
      ],
      "correctOption": "Ingresar un código de verificación enviado por SMS después de ingresar un nombre de usuario y contraseña."
    },
    {
      "id": 17,
      "question": "¿Qué es la criptografía de extremo a extremo?",
      "options": [
      "Un método para ocultar información personal en línea.",
      "Un protocolo utilizado para proteger redes inalámbricas.",
      "Un sistema de encriptación que asegura la privacidad de los datos desde el emisor hasta el receptor.",
      "Una técnica de hacking utilizada para obtener acceso no autorizado a sistemas informáticos."
      ],
      "correctOption": "Un sistema de encriptación que asegura la privacidad de los datos desde el emisor hasta el receptor."
    },
    {
      "id": 18,
      "question": "¿Qué es una VPN (Red Privada Virtual)?",
      "options": [
        "Un programa antivirus que protege contra malware y virus.",
        "Un dispositivo que regula el flujo de datos entre redes para protegerlas de amenazas externas.",
        "Un protocolo de encriptación utilizado para proteger la confidencialidad de los datos.",
        "Una conexión segura que permite acceder a una red privada a través de una red pública, como Internet."
      ],
      "correctOption": "Una conexión segura que permite acceder a una red privada a través de una red pública, como Internet."
    },
    {
      "id": 19,
      "question": "¿Cuál de las siguientes opciones es un ejemplo de información confidencial?",
      "options": [
        "Una dirección de correo electrónico pública.",
        "El nombre de una ciudad famosa.",
        "El número de seguridad social de una persona.",
        "Una fecha de cumpleaños."
      ],
      "correctOption": "El número de seguridad social de una persona."
    },
    {
      "id": 20,
      "question": "¿Qué es la ingeniería social en el contexto de la seguridad informática?",
      "options": [
        "Un ataque que busca inundar un sistema o red con solicitudes para interrumpir su funcionamiento.",
        "Un ataque que utiliza fuerza bruta para descifrar contraseñas.",
        "Un programa malicioso diseñado para dañar, acceder o tomar el control de un sistema o red.",
        "Una táctica que aprovecha la manipulación psicológica para engañar a las personas y obtener información confidencial."
      ],
      "correctOption": "Una táctica que aprovecha la manipulación psicológica para engañar a las personas y obtener información confidencial."
    },
    {
      "id": 21,
      "question": "¿Qué es el ataque de desbordamiento de pila (stack overflow)?",
      "options": [
      "Un ataque que involucra el desbordamiento de la memoria de un dispositivo para ejecutar código malicioso.",
      "Un ataque que se dirige a la capa física de una red para interceptar y modificar datos.",
      "Un ataque que utiliza el poder de procesamiento de varios dispositivos para descifrar contraseñas.",
      "Un ataque que se basa en la manipulación de la comunicación entre dos partes para obtener información confidencial."
      ],
      "correctOption": "Un ataque que involucra el desbordamiento de la memoria de un dispositivo para ejecutar código malicioso."
    },
    {
      "id": 22,
      "question": "¿Qué es un ataque de inyección de código?",
      "options": [
      "Un método de hacking que implica insertar código malicioso en un sistema para obtener acceso no autorizado.",
      "Una táctica de defensa utilizada para prevenir el robo de información confidencial.",
      "Un tipo de ataque en el que se envían múltiples solicitudes de autenticación para comprometer un sistema.",
      "Un enfoque de hacking que se basa en el engaño de los usuarios para obtener información sensible."
      ],
      "correctOption": "Un método de hacking que implica insertar código malicioso en un sistema para obtener acceso no autorizado."
    },
    {
      "id": 23,
      "question": "¿Qué es el concepto de 'zero trust' en ciberseguridad?",
      "options": [
      "Un enfoque de seguridad que confía plenamente en los usuarios y dispositivos dentro de la red.",
      "Un principio de seguridad que asume que todas las solicitudes de acceso son maliciosas hasta que se demuestre lo contrario.",
      "Una técnica de encriptación que garantiza la confidencialidad de los datos en tránsito.",
      "Un método de detección de intrusiones que utiliza análisis comportamental para identificar actividades sospechosas."
      ],
      "correctOption": "Un principio de seguridad que asume que todas las solicitudes de acceso son maliciosas hasta que se demuestre lo contrario."
    },
    {
      "id": 24,
      "question": "¿Qué es un ataque de fuerza bruta?",
      "options": [
        "Un ataque que busca inundar un sistema o red con solicitudes para interrumpir su funcionamiento.",
        "Un programa malicioso que se propaga a través de archivos adjuntos de correo electrónico.",
        "Un ataque que utiliza múltiples intentos de prueba y error para descifrar contraseñas.",
        "Una táctica que utiliza correos electrónicos falsos y sitios web fraudulentos para engañar a las personas y obtener información confidencial."
      ],
      "correctOption": "Un ataque que utiliza múltiples intentos de prueba y error para descifrar contraseñas."
    },
    {
      "id": 25,
      "question": "¿Qué es la técnica de 'sandboxing' en ciberseguridad?",
      "options": [
      "Un método de encriptación que protege los datos almacenados en un dispositivo.",
      "Un enfoque de seguridad que utiliza una red aislada para ejecutar archivos y detectar posibles amenazas.",
      "Un proceso de copia de seguridad y almacenamiento de datos en un entorno seguro.",
      "Una práctica de autenticación que verifica la identidad de los usuarios en una red."
      ],
      "correctOption": "Un enfoque de seguridad que utiliza una red aislada para ejecutar archivos y detectar posibles amenazas."
    },
    {
      "id": 26,
      "question": "¿Qué es un 'honeypot' en ciberseguridad?",
      "options": [
      "Un dispositivo físico utilizado para proteger una red de ataques externos.",
      "Un tipo de software malicioso diseñado para robar información personal.",
      "Un sistema falso diseñado para atraer a los atacantes y recolectar información sobre sus técnicas y estrategias.",
      "Una técnica de encriptación que garantiza la confidencialidad de los datos en tránsito."
      ],
      "correctOption": "Un sistema falso diseñado para atraer a los atacantes y recolectar información sobre sus técnicas y estrategias."
    },
    {
      "id": 27,
      "question": "¿Qué es el principio de menor privilegio?",
      "options": [
      "Un enfoque de seguridad que otorga a los usuarios los privilegios necesarios para llevar a cabo sus tareas sin restricciones.",
      "Un enfoque de seguridad que restringe los privilegios de los usuarios a los mínimos necesarios para realizar sus funciones.",
      "Un método de autenticación que verifica la identidad de los usuarios antes de concederles acceso a un sistema.",
      "Una técnica de encriptación que protege la confidencialidad de los datos almacenados en un dispositivo."
      ],
      "correctOption": "Un enfoque de seguridad que restringe los privilegios de los usuarios a los mínimos necesarios para realizar sus funciones."
    },
    {
      "id": 28,
      "question": "¿Qué es la ingeniería social?",
      "options": [
        "Un método utilizado para verificar la identidad de una persona a través de la verificación de su huella digital.",
        "Una técnica de encriptación utilizada para proteger los datos transmitidos entre dos puntos.",
        "Un protocolo de seguridad utilizado para proteger las comunicaciones en línea.",
        "Una táctica que aprovecha la psicología humana para manipular a las personas y obtener información confidencial."
      ],
      "correctOption": "Una táctica que aprovecha la psicología humana para manipular a las personas y obtener información confidencial."
    },
    {
      "id": 29,
      "question": "¿Qué es un proxy?",
      "options": [
        "Un dispositivo que regula el flujo de datos entre redes para protegerlas de amenazas externas.",
        "Un programa que busca y elimina virus en un sistema.",
        "Un servidor que actúa como intermediario entre un dispositivo y el resto de Internet.",
        "Una medida de seguridad física utilizada para evitar el acceso no autorizado a un edificio."
      ],
      "correctOption": "Un servidor que actúa como intermediario entre un dispositivo y el resto de Internet."
    },
    {
      "id": 30,
      "question": "¿Qué es el keylogging?",
      "options": [
        "Un ataque que busca inundar un sistema o red con solicitudes para interrumpir su funcionamiento.",
        "Un programa malicioso que se propaga a través de archivos adjuntos de correo electrónico.",
        "Un ataque que registra las pulsaciones de teclado de un usuario para robar información confidencial.",
        "Una técnica de encriptación utilizada para proteger los datos transmitidos entre dos puntos."
      ],
      "correctOption": "Un ataque que registra las pulsaciones de teclado de un usuario para robar información confidencial."
    },
    {
      "id": 31,
      "question": "¿Qué es un ataque de 'man-in-the-middle'?",
      "options": [
      "Un ataque que redirige el tráfico de un sitio web legítimo a un sitio falso para robar información.",
      "Un ataque que utiliza software malicioso para cifrar los archivos de una víctima y exigir un rescate.",
      "Un ataque en el que un tercero intercepta y manipula la comunicación entre dos partes sin su conocimiento.",
      "Un ataque de suplantación de identidad que utiliza correos electrónicos falsos para engañar a los usuarios."
      ],
      "correctOption": "Un ataque en el que un tercero intercepta y manipula la comunicación entre dos partes sin su conocimiento."
    },
    {
      "id": 32,
      "question": "¿Qué es el cifrado asimétrico?",
      "options": [
        "Un protocolo de encriptación utilizado para proteger la confidencialidad de los datos.",
        "Un método de encriptación que utiliza la misma clave para cifrar y descifrar los datos.",
        "Un protocolo de seguridad utilizado para proteger las comunicaciones en línea.",
        "Un sistema de encriptación que utiliza dos claves diferentes, una pública y una privada."
      ],
      "correctOption": "Un sistema de encriptación que utiliza dos claves diferentes, una pública y una privada."
    },
    {
      "id": 33,
      "question": "¿Qué es un 'botnet' en ciberseguridad?",
      "options": [
      "Un sistema falso diseñado para atraer a los atacantes y recolectar información sobre sus técnicas y estrategias.",
      "Un enfoque de seguridad que utiliza una red aislada para ejecutar archivos y detectar posibles amenazas.",
      "Un grupo de dispositivos infectados controlados remotamente para realizar ataques en línea.",
      "Una técnica de encriptación que utiliza una clave única para cifrar y descifrar datos."
      ],
      "correctOption": "Un grupo de dispositivos infectados controlados remotamente para realizar ataques en línea."
    },
    {
      "id": 34,
      "question": "¿Qué es un ataque de suplantación de identidad (pharming)?",
      "options": [
        "Un ataque que busca inundar un sistema o red con solicitudes para interrumpir su funcionamiento.",
        "Un programa malicioso que se propaga a través de archivos adjuntos de correo electrónico.",
        "Un ataque que utiliza fuerza bruta para descifrar contraseñas.",
        "Una táctica que redirige el tráfico de un sitio web legítimo a un sitio falso con el objetivo de robar información personal."
      ],
      "correctOption": "Una táctica que redirige el tráfico de un sitio web legítimo a un sitio falso con el objetivo de robar información personal."
    },
    {
      "id": 35,
      "question": "¿Qué es la ingeniería inversa?",
      "options": [
        "Un ataque que busca inundar un sistema o red con solicitudes para interrumpir su funcionamiento.",
    "Un proceso utilizado para descompilar y analizar el código fuente de un programa.",
    "Un ataque que utiliza múltiples intentos de prueba y error para descifrar contraseñas.",
    "Una táctica que utiliza correos electrónicos falsos y sitios web fraudulentos para engañar a las personas."
      ],
      "correctOption": "Un proceso utilizado para descompilar y analizar el código fuente de un programa."
    },
    {
      "id": 36,
      "question": "¿Qué es un análisis de vulnerabilidades?",
      "options": [
      "Una técnica de encriptación que protege la confidencialidad de los datos almacenados en un dispositivo.",
      "Un proceso de identificación y evaluación de las debilidades en un sistema o red para determinar posibles puntos de ataque.",
      "Un enfoque de seguridad que confía plenamente en los usuarios y dispositivos dentro de la red.",
      "Un método de detección de intrusiones que utiliza análisis comportamental para identificar actividades sospechosas."
      ],
      "correctOption": "Un proceso de identificación y evaluación de las debilidades en un sistema o red para determinar posibles puntos de ataque."
    },
    {
      "id": 37,
      "question": "¿Qué es un ataque de envenenamiento de ARP?",
      "options": [
      "Un ataque que busca obtener información confidencial a través del envío de correos electrónicos fraudulentos.",
      "Un ataque que manipula las tablas de dirección MAC en una red para redirigir el tráfico hacia un atacante.",
      "Un ataque que intercepta y altera la comunicación entre dos partes en una red.",
      "Un ataque que utiliza mensajes de texto fraudulentos para engañar a los usuarios y obtener información confidencial."
      ],
      "correctOption": "Un ataque que manipula las tablas de dirección MAC en una red para redirigir el tráfico hacia un atacante."
    },
    {
      "id": 38,
      "question": "¿Qué es el enmascaramiento de direcciones IP?",
      "options": [
      "Un método de ocultar la dirección IP de un dispositivo para proteger su identidad en línea.",
      "Un ataque que busca explotar vulnerabilidades en el software para obtener acceso no autorizado a un sistema.",
      "Un ataque que interfiere con el funcionamiento normal de un sistema o red al inundarlo con una gran cantidad de tráfico malicioso.",
      "Un ataque que intercepta y altera la comunicación entre dos partes en una red."
      ],
      "correctOption": "Un método de ocultar la dirección IP de un dispositivo para proteger su identidad en línea."
    }, 
    {
      "id": 39,
      "question": "¿Qué es el análisis de comportamiento de red?",
      "options": [
      "Un enfoque de seguridad que confía plenamente en los usuarios y dispositivos dentro de la red.",
      "Un principio de seguridad que asume que todas las solicitudes de acceso son maliciosas hasta que se demuestre lo contrario.",
      "Un método de detección de intrusiones que utiliza análisis comportamental para identificar actividades sospechosas.",
      "Una técnica de encriptación que garantiza la confidencialidad de los datos en tránsito."
      ],
      "correctOption": "Un método de detección de intrusiones que utiliza análisis comportamental para identificar actividades sospechosas."
    },
    {
      "id": 40,
      "question": "¿Qué es la segmentación de red?",
      "options": [
      "Un enfoque de seguridad que confía plenamente en los usuarios y dispositivos dentro de la red.",
      "Un principio de seguridad que asume que todas las solicitudes de acceso son maliciosas hasta que se demuestre lo contrario.",
      "Una técnica de encriptación que garantiza la confidencialidad de los datos en tránsito.",
      "Una práctica que divide una red en segmentos más pequeños para limitar el acceso entre ellos y mejorar la seguridad."
      ],
      "correctOption": "Una práctica que divide una red en segmentos más pequeños para limitar el acceso entre ellos y mejorar la seguridad."
    }
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
          <div className="button-quiz">
            <button>
            <Link to="/"><span>MENÚ</span></Link>
            </button>
            {currentQuestion > 1 && (
              <button onClick={goToPreviousQuestion}>
                <span>RETROCEDER</span></button>
            )}
            <button onClick={goToNextQuestion} disabled={selectedOption === null}>
            <span>SIGUIENTE</span>
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2 className="quiz-title">Felicidades, has completado todas las preguntas</h2>
          <p>Necesitamos tu nombre para colocarte en nuestro ranking</p>
          <p>Tu nombre: {participantName}</p>
          <p>Tu puntaje es: {score}/{totalQuestions}</p>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
          />
          <div className="button-rank">
          {participantName.length >= 8 && participantName.length <= 30 ? (
            <button>
            <Link to="/ranking" onClick={handleQuizSubmit}><span>ENVIAR</span></Link>
            </button>
          ) : (
            <button disabled><span>ENVIAR</span></button>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
