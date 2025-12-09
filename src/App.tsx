import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoryPage from '@/pages/Story/StoryPage';
import StoryDetailPage from '@/pages/Story/StoryDetailPage';
import StoryCreatePage from '@/pages/Story/StoryCreatePage';
import CharacterListPage from '@/pages/character/CharacterListPage';
import CharacterDetailPage from '@/pages/character/CharacterDetailPage';
import LoginPage from '@/pages/login/LoginPage';
import InfoSetupPage from './pages/login/InfoSetupPage';
import ParentalConsentPage from './pages/login/ParentalConsentPage';
import MyPage from '@/pages/mypage/MyPage';
import AudioBook from '@/pages/audiobook/AudioBookPage';
import AudioBookPlayPage from '@/pages/audiobook/AudioBookPlayPage';
import AudioBookCreatePage from '@/pages/audiobook/AudioBookCreatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/story' element={<StoryPage />} />
        <Route path='/story/:id' element={<StoryDetailPage />} />
        <Route path='/story/create' element={<StoryCreatePage />} />
        <Route path='/character' element={<CharacterListPage />} />
        <Route path='/character/:id' element={<CharacterDetailPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/info-setup' element={<InfoSetupPage />} />
        <Route path='/parental-consent' element={<ParentalConsentPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/audiobook' element={<AudioBook />} />
        <Route path='/audiobook/:id' element={<AudioBookPlayPage />} />
        <Route path='/audiobook/create' element={<AudioBookCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
