import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ButtonTestPage from '@/pages/test/ButtonTestPage';
import ImageCardTestPage from '@/pages/test/ImageCardTestPage';
import ImageTestPage from '@/pages/test/ImageTestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test/button' element={<ButtonTestPage />} />
        <Route path='/test/image-card' element={<ImageCardTestPage />} />
        <Route path='/test/image' element={<ImageTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
