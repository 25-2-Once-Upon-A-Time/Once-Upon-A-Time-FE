import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import StoryPage from '@/pages/story/StoryPage';
import StoryDetailPage from '@/pages/story/StoryDetailPage';
import StoryCreatePage from '@/pages/story/StoryCreatePage';
import CharacterListPage from '@/pages/character/CharacterListPage';
import CharacterDetailPage from '@/pages/character/CharacterDetailPage';
import LoginPage from '@/pages/login/LoginPage';
import InfoSetupPage from './pages/login/InfoSetupPage';
import ParentalConsentPage from './pages/login/ParentalConsentPage';
import MyPage from '@/pages/mypage/MyPage';
import AudioBook from '@/pages/audiobook/AudioBookPage';
import AudioBookPlayPage from '@/pages/audiobook/AudioBookPlayPage';
import AudioBookCreatePage from '@/pages/audiobook/AudioBookCreatePage';
import KakaoCallbackPage from '@/pages/login/KakaoCallbackPage';

function App() {
  const { accessToken } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* 루트 경로: 인증 상태에 따라 분기 */}
        <Route
          path='/'
          element={
            accessToken ? <Navigate to='/story' replace /> : <Navigate to='/login' replace />
          }
        />

        <Route path='/story' element={<StoryPage />} />
        <Route path='/story/:id' element={<StoryDetailPage />} />
        <Route path='/story/create' element={<StoryCreatePage />} />
        <Route path='/character' element={<CharacterListPage />} />
        <Route path='/character/:id' element={<CharacterDetailPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/kakao/callback' element={<KakaoCallbackPage />} />
        <Route path='/info-setup' element={<InfoSetupPage />} />
        <Route path='/parental-consent' element={<ParentalConsentPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/audiobook' element={<AudioBook />} />
        <Route path='/audiobook/:id' element={<AudioBookPlayPage />} />
        <Route path='/audiobook/create' element={<AudioBookCreatePage />} />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
