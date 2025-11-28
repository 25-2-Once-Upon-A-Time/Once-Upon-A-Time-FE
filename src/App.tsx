import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ButtonTestPage from '@/pages/test/ButtonTestPage';
import InputTestPage from '@/pages/test/InputTestPage';
import SearchInputTestPage from '@/pages/test/SearchInputTestPage';
import TagTestPage from '@/pages/test/TagTestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test/button' element={<ButtonTestPage />} />
        <Route path='/test/input' element={<InputTestPage />} />
        <Route path='/test/search' element={<SearchInputTestPage />} />
        <Route path='/test/tag' element={<TagTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
