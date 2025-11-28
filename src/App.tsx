import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ButtonTestPage from '@/pages/test/ButtonTestPage';
import ToastTestPage from '@/pages/test/ToastTestPage';
import DownloadToastTestPage from '@/pages/test/DownloadToastTestPage';
import ErrorToastTestPage from '@/pages/test/ErrorToastTestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test/button' element={<ButtonTestPage />} />
        <Route path='/test/toast' element={<ToastTestPage />} />
        <Route path='/test/download-toast' element={<DownloadToastTestPage />} />
        <Route path='/test/error-toast' element={<ErrorToastTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
