import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './index.scss';

const Ranking = () => {
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

  return (
    <div className="ranking">
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
    </div>
  );
};

export default Ranking;
