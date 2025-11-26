import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ButtonTestPage from '@/pages/test/ButtonTestPage';
import TextButtonTestPage from '@/pages/test/TextButtonTestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test/button' element={<ButtonTestPage />} />
        <Route path='/test/textbutton' element={<TextButtonTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
