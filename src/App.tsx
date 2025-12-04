import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import StoryPage from '@/pages/StoryPage';
import StoryDetailPage from '@/pages/StoryDetailPage';
import StoryCreatePage from '@/pages/StoryCreatePage';

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
