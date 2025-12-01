import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import TextButton from '@/components/ui/TextButton';

const TextButtonTestPage = () => {
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

      <h1 className='text-[24px] font-bold'>TextButton 테스트</h1>

      {/* 1. Variant (크기) */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>1. Variant (크기)</h2>
        <div className='space-y-[8px]'>
          <div>
            <TextButton variant='title' onClick={() => alert('Title 클릭!')}>
              회원가입
            </TextButton>
          </div>
          <div>
            <TextButton variant='subtitle' onClick={() => alert('Subtitle 클릭!')}>
              로그인
            </TextButton>
          </div>
          <div>
            <TextButton variant='body' onClick={() => alert('Body 클릭!')}>
              비밀번호를 잃어버리셨나요?
            </TextButton>
          </div>
          <div>
            <TextButton variant='caption' onClick={() => alert('Caption 클릭!')}>
              아이디를 잃어버리셨나요?
            </TextButton>
          </div>
          <div>
            <TextButton variant='link' onClick={() => alert('Link 클릭!')}>
              여기
            </TextButton>
          </div>
        </div>
      </section>

      {/* 2. Color */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>2. Color (색상)</h2>
        <div className='space-y-[8px]'>
          <div>
            <TextButton color='black' onClick={() => alert('Black 클릭!')}>
              Black 색상
            </TextButton>
          </div>
          <div>
            <TextButton color='gray' onClick={() => alert('Gray 클릭!')}>
              Gray 색상
            </TextButton>
          </div>
        </div>
      </section>

      {/* 3. Variant + Color 조합 */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>3. Variant + Color 조합</h2>
        <div className='space-y-[8px]'>
          <div>
            <TextButton variant='title' color='black'>
              Title + Black
            </TextButton>
          </div>
          <div>
            <TextButton variant='subtitle' color='gray'>
              Subtitle + Gray
            </TextButton>
          </div>
          <div>
            <TextButton variant='link' color='black'>
              Link + Black
            </TextButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextButtonTestPage;
