import Button from '@/components/ui/Button';
import { TopNav } from '@/components/ui/TopNav';

const ButtonTestPage = () => {
  return (
    <div className='pt-[56px] p-[24px] space-y-[32px]'>
      <TopNav title='버튼 테스트' showBack />

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
        <h2 className='text-[18px] font-semibold mb-[12px]'>2. 클릭 이벤트</h2>
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
