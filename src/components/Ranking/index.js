import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './index.scss';
import { firestore, addDoc } from '../../firebase';

const Ranking = () => {
    const [showContent, setShowContent] = useState(false);
    const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const db = getFirestore();
        const rankingCollectionRef = collection(db, 'rankings');
        const rankingQuery = query(rankingCollectionRef, orderBy('score', 'desc'), limit(10));
        const rankingSnapshot = await getDocs(rankingQuery);
        const rankingData = rankingSnapshot.docs.map((doc) => doc.data());
        setRankingData(rankingData);
      } catch (error) {
        console.error('Error al obtener datos del ranking:', error);
      }
    };

    fetchRankingData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1550);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ranking">
        {showContent && (
        <>
      <h2>Ranking</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puntaje</th>
            <th>Puesto</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((rankingItem, index) => (
            <tr key={index}>
              <td>{rankingItem.name}</td>
              <td>{rankingItem.score}</td>
              <td>{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="home-btn">Volver</Link>
      </>
        )}
      <div class="loader">
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
    </div>
  );
};

export default Ranking;
