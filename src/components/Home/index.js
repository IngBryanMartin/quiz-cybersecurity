import React, { useState, useEffect } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import AnimatedLetters from '../AnimatedLetters';
import PhotoDev from '../../assets/images/bryanmdev.png';

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [letterClass, setLetterClass] = useState('text-animate');
  const first = [' ', 'D', 'E', ' ', 'P', 'O', 'N', 'E', 'R', ' ', 'A', ' ', 'P', 'R', 'U', 'E', 'B', 'A'];
  const second = ['T', 'U', 'S', ' ', 'C', 'O', 'N', 'O', 'C', 'I', 'M', 'I', 'E', 'N', 'T', 'O', 'S'];
  const third = [' ', 'E', 'N', ' ', 'C', 'I', 'B', 'E', 'R', 'S', 'E', 'G', 'U', 'R', 'I', 'D', 'A', 'D'];

  const handleImageClick = () => {
    window.location.href = 'https://ingbryanmartin.github.io/my-portfolio/#/';
  };

  const handleButtonClick = () => {
    window.location.href = 'https://www.google.com';
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      setLetterClass('text-animate-hover');
    }, 1550);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="App">
        <div className="content">
          {showContent && (
            <>
              <figure>
                <img
                  src={PhotoDev}
                  alt="BryanMDev"
                  onClick={handleImageClick}
                  style={{ cursor: 'pointer' }}
                />
                <figcaption>BryanM Dev</figcaption>
              </figure>
              <div className="title">
                <h1>
                  <span className={letterClass}>E</span>
                  <span className={`${letterClass} _12`}>S</span>
                  <span className={`${letterClass} _13.`}> </span>
                  <span className={`${letterClass} _14`}>H</span>
                  <span className={`${letterClass} _15`}>O</span>
                  <span className={`${letterClass} _16`}>R</span>
                  <span className={`${letterClass} _17`}>A</span>
                  <AnimatedLetters letterClass={letterClass} strArray={first} idx={15} />
                  <br />
                  <AnimatedLetters letterClass={letterClass} strArray={second} idx={17} />
                  <AnimatedLetters letterClass={letterClass} strArray={third} idx={17} />
                </h1>
              </div>
              <div className="subtitle">
                <h2>¿ESTÁS LISTO PARA EL DESAFÍO DE 40 PREGUNTAS?
                </h2>
              </div>
              <div className="buttons">
                <Link className="btn draw-border" to="/quiz">
                  ESTOY LISTO
                </Link>
                <span className="btn draw-border" onClick={handleButtonClick} style={{ cursor: 'pointer' }}>
                  VER CLASE
                </span>
                <Link className="btn draw-border" to="/ranking">
                  RANKING
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="loader">
        <span style={{ '--i': 1 }}></span>
        <span style={{ '--i': 2 }}></span>
        <span style={{ '--i': 3 }}></span>
        <span style={{ '--i': 4 }}></span>
        <span style={{ '--i': 5 }}></span>
        <span style={{ '--i': 6 }}></span>
        <span style={{ '--i': 7 }}></span>
        <span style={{ '--i': 8 }}></span>
        <span style={{ '--i': 9 }}></span>
        <span style={{ '--i': 10 }}></span>
      </div>
    </>
  );
};

export default Home;
