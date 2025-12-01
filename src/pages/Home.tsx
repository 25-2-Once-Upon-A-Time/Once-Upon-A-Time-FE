import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import TextButton from '@/components/ui/TextButton';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='p-6'>
      <div className='text-2xl font-bold text-green-500 mb-4'>✅ 테스트</div>

      <div className='space-y-4'>
        <Button variant='primary' onClick={() => navigate('/test/button')}>
          버튼 테스트 페이지로 이동
        </Button>

        <Button variant='primary' onClick={() => navigate('/test/form')}>
          Form 테스트 페이지
        </Button>
      </div>
    </div>
  );
}
