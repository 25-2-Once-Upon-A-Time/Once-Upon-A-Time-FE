import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import StoryPage from '@/pages/Story/StoryPage';
import StoryDetailPage from '@/pages/Story/StoryDetailPage';
import StoryCreatePage from '@/pages/Story/StoryCreatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/story' element={<StoryPage />} />
        <Route path='/story/:id' element={<StoryDetailPage />} />
        <Route path='/story/create' element={<StoryCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
