import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ButtonTestPage from '@/pages/ButtonTestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test/button' element={<ButtonTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
