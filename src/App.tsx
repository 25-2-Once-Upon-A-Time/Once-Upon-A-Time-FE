import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import CharacterListPage from '@/pages/character/CharacterListPage';
import CharacterDetailPage from '@/pages/character/CharacterDetailPage';
import LoginPage from '@/pages/login/LoginPage';
import InfoSetupPage from './pages/login/InfoSetupPage';
import ParentalConsentPage from './pages/login/ParentalConsentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/character' element={<CharacterListPage />} />
        <Route path='/character/:id' element={<CharacterDetailPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/info-setup' element={<InfoSetupPage />} />
        <Route path='/parental-consent' element={<ParentalConsentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
