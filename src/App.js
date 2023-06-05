import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Ranking from './components/Ranking';

function App() {
  return (
    <>
      <Routes>
          <Route index element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="ranking" element={<Ranking />} />
      </Routes>
    </>
  );
}

export default App;