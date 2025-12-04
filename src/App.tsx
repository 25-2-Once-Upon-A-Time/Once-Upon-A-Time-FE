import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import CharacterListPage from '@/pages/character/CharacterListPage';
import CharacterDetailPage from '@/pages/character/CharacterDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/character' element={<CharacterListPage />} />
        <Route path='/character/:id' element={<CharacterDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
