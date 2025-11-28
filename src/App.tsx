import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ButtonTestPage from '@/pages/test/ButtonTestPage';
import { BottomNav } from '@/components/BottomNav';

function App() {
  return (
    <BrowserRouter>
      <div className='pb-[80px]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test/button' element={<ButtonTestPage />} />
          <Route path='/character' element={<div className='text-white p-4'>캐릭터 페이지</div>} />
          <Route path='/story' element={<div className='text-white p-4'>동화 페이지</div>} />
          <Route
            path='/community'
            element={<div className='text-white p-4'>커뮤니티 페이지</div>}
          />
          <Route path='/mypage' element={<div className='text-white p-4'>내정보 페이지</div>} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
