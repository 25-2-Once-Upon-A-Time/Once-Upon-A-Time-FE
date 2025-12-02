import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import MyPage from '@/pages/mypage/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
