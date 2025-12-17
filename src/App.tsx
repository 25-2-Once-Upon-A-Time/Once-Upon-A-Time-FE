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
import AdminPage from '@/pages/Admin/AdminPage';

// 인증이 필요한 라우트를 감싸는 컴포넌트
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}

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

        {/* 보호된 라우트 */}
        <Route
          path='/story'
          element={
            <ProtectedRoute>
              <StoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/story/:id'
          element={
            <ProtectedRoute>
              <StoryDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/story/create'
          element={
            <ProtectedRoute>
              <StoryCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/character'
          element={
            <ProtectedRoute>
              <CharacterListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/character/:id'
          element={
            <ProtectedRoute>
              <CharacterDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/mypage'
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/audiobook'
          element={
            <ProtectedRoute>
              <AudioBook />
            </ProtectedRoute>
          }
        />
        <Route
          path='/audiobook/make'
          element={
            <ProtectedRoute>
              <AudioBookCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/audiobook/:id/playback'
          element={
            <ProtectedRoute>
              <AudioBookPlayPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* 공개 라우트 */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/kakao/callback' element={<KakaoCallbackPage />} />
        <Route path='/info-setup' element={<InfoSetupPage />} />
        <Route path='/parental-consent' element={<ParentalConsentPage />} />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
