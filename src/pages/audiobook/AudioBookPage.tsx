import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/ui/TopNav';
import { BottomNav } from '@/components/ui/BottomNav';
import AudioBookCard from '@/features/audiobook/AudioBookCard';
import CreateAudioBookButton from '@/features/audiobook/CreateAudioBookButton';
import sortIcon from '@/assets/icons/sort.svg';
import { useAudioBooks } from '@/hooks/queries/useAudioBook';
import LoadingModal from '@/components/ui/LoadingModal';

const AudioBook: React.FC = () => {
  const navigate = useNavigate();

  const { data: audiobookList = [], isLoading, isError } = useAudioBooks();

  if (isError) {
    return <div className='text-center mt-20'>오디오북을 불러오지 못했습니다.</div>;
  }

  return (
    <div className='w-full min-w-[360px] min-h-screen flex flex-col mx-auto bg-bg-purple-50 relative'>
      <TopNav className='bg-bg-purple-50' title='오디오북' />

      <div className='flex-1 px-[20px] pt-[67px] pb-[160px] overflow-y-auto'>
        <div className='flex items-center justify-between mb-[13px]'>
          <p className='ng-15-b text-fg-primary'>가장 최근 추가순</p>
          <img src={sortIcon} alt='정렬' className='w-5 h-5' />
        </div>

        {/* 오디오북 카드 리스트 */}
        <div className='w-full flex flex-col gap-[10px]'>
          {audiobookList.map((audiobook) => (
            <AudioBookCard
              key={audiobook.audiobookId}
              title={audiobook.audiobookName}
              tags={[audiobook.theme, audiobook.vibe]}
              character={audiobook.characterName}
              duration={audiobook.duration}
              imageSrc={audiobook.thumbnailUrl}
              onPlayClick={() => navigate(`/audiobook/${audiobook.audiobookId}`)}
            />
          ))}
        </div>
      </div>

      {/* 오디오북 생성 버튼 */}
      <div className='fixed bottom-[109px] left-1/2 -translate-x-1/2 z-50'>
        <CreateAudioBookButton onClick={() => navigate('/audiobook/create')} />
      </div>

      <BottomNav className='shadow-shadow-purple' />

      {/* 로딩 모달 */}
      <LoadingModal
        isOpen={isLoading}
        title='오디오북을 불러오는 중입니다'
        subtitle='잠시만 기다려주세요'
      />
    </div>
  );
};

export default AudioBook;
