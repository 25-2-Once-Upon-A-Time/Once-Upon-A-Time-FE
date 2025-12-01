import React from 'react';

const FontsTestPage: React.FC = () => {
  return (
    <div className='p-8 space-y-12'>
      <h1 className='nsr-34-eb mb-8'>Fonts Test Page</h1>

      {/* Typography */}
      <section>
        <h2 className='nsr-24-eb mb-4'>Typography</h2>
        <div className='space-y-6'>
          <div>
            <h3 className='nsr-20-eb mb-3'>Font Families</h3>
            <div className='space-y-2'>
              <p className='nsr-16-eb'>NanumSquareRoundOTF - 나눔스퀘어라운드</p>
              <p className='ng-16-r'>NanumGothic - 나눔고딕</p>
              <p className='nbp-16-b'>NanumBarunpenOTF - 나눔바른펜</p>
              <p className='inter-16-sb'>Inter - The quick brown fox</p>
              <p className='pre-16-43-r'>Pretendard - 프리텐다드 폰트</p>
            </div>
          </div>
          <div>
            <h3 className='nsr-20-eb mb-3'>Font Sizes</h3>
            <div className='space-y-2'>
              <p className='nsr-34-eb'>34px - Heading Extra Large</p>
              <p className='nsr-28-eb-uppercase'>28px - Heading Large</p>
              <p className='nsr-25-eb-center' style={{ textAlign: 'left' }}>
                25px - Heading Medium
              </p>
              <p className='nsr-24-eb'>24px - Heading Small</p>
              <p className='nsr-20-eb'>20px - Subtitle Large</p>
              <p className='pre-18-77-b' style={{ textAlign: 'left', textTransform: 'none' }}>
                18px - Subtitle Medium
              </p>
              <p className='nsr-16-eb'>16px - Body Large</p>
              <p className='nsr-15-eb-uppercase' style={{ textTransform: 'none' }}>
                15px - Body Medium
              </p>
              <p className='inter-14-r'>14px - Body Small</p>
              <p className='inter-12-r'>12px - Caption</p>
              <p className='pre-11-m'>11px - Caption Small</p>
            </div>
          </div>

          <div>
            <h3 className='nsr-20-eb mb-3'>Utility Classes</h3>
            <div className='space-y-2'>
              <p className='nsr-34-eb'>nsr-34-eb - 나눔스퀘어 34px ExtraBold</p>
              <p className='nsr-28-eb-uppercase'>nsr-28-eb-uppercase</p>
              <p className='nsr-24-eb'>nsr-24-eb - 나눔스퀘어 24px</p>
              <p className='nsr-20-eb'>nsr-20-eb - 나눔스퀘어 20px</p>
              <p className='inter-16-sb'>inter-16-sb - Inter 16px Semibold</p>
              <p className='inter-14-r'>inter-14-r - Inter 14px Regular</p>
              <p className='pre-16-43-r'>pre-16-43-r - Pretendard 16.43px</p>
              <p className='pre-14-m'>pre-14-m - Pretendard 14px Medium</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FontsTestPage;
