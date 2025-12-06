import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import CharacterListPage from '@/pages/character/CharacterListPage';
import CharacterDetailPage from '@/pages/character/CharacterDetailPage';
import MyPage from '@/pages/mypage/MyPage';
import LoginPage from '@/pages/login/LoginPage';
import InfoSetupPage from './pages/login/InfoSetupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/character' element={<CharacterListPage />} />
        <Route path='/character/:id' element={<CharacterDetailPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/info-setup' element={<InfoSetupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
