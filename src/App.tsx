import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoryPage from '@/pages/Story/StoryPage';
import StoryDetailPage from '@/pages/Story/StoryDetailPage';
import StoryCreatePage from '@/pages/Story/StoryCreatePage';
import CharacterListPage from '@/pages/character/CharacterListPage';
import CharacterDetailPage from '@/pages/character/CharacterDetailPage';
import MyPage from '@/pages/mypage/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/story' element={<StoryPage />} />
        <Route path='/story/:id' element={<StoryDetailPage />} />
        <Route path='/story/create' element={<StoryCreatePage />} />
        <Route path='/character' element={<CharacterListPage />} />
        <Route path='/character/:id' element={<CharacterDetailPage />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
