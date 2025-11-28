import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ButtonTestPage from '@/pages/test/ButtonTestPage';
import CharacterPage from '@/pages/CharacterPage';
import StoryPage from '@/pages/StoryPage';
import CommunityPage from '@/pages/CommunityPage';
import MyPage from '@/pages/MyPage';
import { BottomNav } from '@/components/BottomNav';

function App() {
  return (
    <BrowserRouter>
      <div className='pb-[80px]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test/button' element={<ButtonTestPage />} />
          <Route path='/character' element={<CharacterPage />} />
          <Route path='/story' element={<StoryPage />} />
          <Route path='/community' element={<CommunityPage />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
