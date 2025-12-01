import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import RadioButton from '@/components/ui/RadioButton';

const FormTestPage = () => {
  const navigate = useNavigate();

  // Checkbox 상태
  const [checkboxes, setCheckboxes] = useState({
    action: false,
    romance: false,
    comedy: false,
  });

  // Radio 상태
  const [gender, setGender] = useState('');
  const [plan, setPlan] = useState('');

  const handleCheckboxChange = (key: keyof typeof checkboxes) => {
    setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

      <h1 className='text-[24px] font-bold'>Form Components 테스트</h1>

      {/* 1. Checkbox 기본 */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>1. Checkbox (체크박스)</h2>

        {/* space-y 제거 → flex + gap 추가 */}
        <div className='flex gap-[24px]'>
          <Checkbox
            label='액션'
            checked={checkboxes.action}
            onChange={() => handleCheckboxChange('action')}
          />
          <Checkbox
            label='로맨스'
            checked={checkboxes.romance}
            onChange={() => handleCheckboxChange('romance')}
          />
          <Checkbox
            label='코미디'
            checked={checkboxes.comedy}
            onChange={() => handleCheckboxChange('comedy')}
          />
        </div>

        <p className='text-[14px] text-gray-600 mt-[12px]'>
          선택된 장르:{' '}
          {Object.entries(checkboxes)
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(', ') || '없음'}
        </p>
      </section>

      {/* 2. RadioButton 기본 */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>2. RadioButton (라디오 버튼)</h2>
        <div className='flex gap-[24px]'>
          <RadioButton
            label='여성'
            name='gender'
            value='female'
            checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
          />
          <RadioButton
            label='남성'
            name='gender'
            value='male'
            checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <p className='text-[14px] text-gray-600 mt-[12px]'>선택된 성별: {gender || '없음'}</p>
      </section>

      {/* 3. 예시 - 약관 동의 */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>3. 예시 - 약관 동의</h2>
        <div className='p-[16px] border rounded-[8px] space-y-[12px]'>
          <Checkbox label='전체 동의' />
          <div className='pl-[28px] space-y-[8px]'>
            <Checkbox label='[필수] 이용약관 동의' />
            <Checkbox label='[필수] 개인정보 수집 및 이용 동의' />
            <Checkbox label='[선택] 마케팅 정보 수신 동의' />
          </div>
          <Button variant='primary' fullWidth className='mt-[16px]'>
            가입하기
          </Button>
        </div>
      </section>

      {/* 4. 예시 - 요금제 선택 */}
      <section>
        <h2 className='text-[18px] font-semibold mb-[12px]'>4. 예시 - 요금제 선택</h2>
        <div className='space-y-[12px]'>
          <div
            className={`p-[16px] border-[2px] rounded-[8px] cursor-pointer ${
              plan === 'basic' ? 'border-[#3C3C5E] bg-[#F5F5F5]' : 'border-[#DCE3E8]'
            }`}
            onClick={() => setPlan('basic')}
          >
            <RadioButton
              label='베이직 - 월 9,900원'
              name='plan'
              value='basic'
              checked={plan === 'basic'}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>
          <div
            className={`p-[16px] border-[2px] rounded-[8px] cursor-pointer ${
              plan === 'pro' ? 'border-[#3C3C5E] bg-[#F5F5F5]' : 'border-[#DCE3E8]'
            }`}
            onClick={() => setPlan('pro')}
          >
            <RadioButton
              label='프로 - 월 19,900원'
              name='plan'
              value='pro'
              checked={plan === 'pro'}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>
          <div
            className={`p-[16px] border-[2px] rounded-[8px] cursor-pointer ${
              plan === 'enterprise' ? 'border-[#3C3C5E] bg-[#F5F5F5]' : 'border-[#DCE3E8]'
            }`}
            onClick={() => setPlan('enterprise')}
          >
            <RadioButton
              label='엔터프라이즈 - 월 49,900원'
              name='plan'
              value='enterprise'
              checked={plan === 'enterprise'}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>
        </div>
        <p className='text-[14px] text-gray-600 mt-[12px]'>선택된 요금제: {plan || '없음'}</p>
      </section>
    </div>
  );
};

export default FormTestPage;
