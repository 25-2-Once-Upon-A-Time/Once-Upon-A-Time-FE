import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

const ButtonTestPage = () => {
  const navigate = useNavigate();

  return (
    <div className='p-[24px] space-y-[32px]'>
      {/* 뒤로가기 버튼 */}
      <Button
        variant='back'
        onClick={() => navigate(-1)}
        className='w-[40px] h-[40px] px-0 rounded-full text-[38px]'
      >
        {'<'}
      </Button>

      <h1 className='text-[24px] font-bold'>Button 테스트</h1>

      {/* 1. Variant + fullWidth */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>1. Full Width</h2>
        <div className='space-y-[12px]'>
          <Button variant='primary' fullWidth>
            로그인
          </Button>
          <Button variant='secondary' fullWidth>
            취소
          </Button>
        </div>
      </section>

      {/* 2. 클릭 이벤트 */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>3. 클릭 이벤트</h2>
        <div className='flex flex-wrap gap-[12px]'>
          <Button variant='primary' fullWidth onClick={() => alert('Primary 클릭!')}>
            클릭
          </Button>
        </div>
      </section>

      {/* 3. 실제 예시 */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>3. 실전 예시</h2>

        {/* 로그인 화면 */}
        <div className='mb-[24px] p-[16px] border rounded-[8px]'>
          <p className='text-[14px] text-gray-600 mb-[12px]'>로그인 화면</p>
          <div className='space-y-[12px]'>
            <Button variant='primary' fullWidth>
              로그인
            </Button>
            <Button variant='secondary' fullWidth>
              회원가입
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonTestPage;
