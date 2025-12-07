import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/ui/TopNav';
import { BottomNav } from '@/components/ui/BottomNav';
import AudioBookCard from '@/features/audiobook/AudioBookCard';
import CreateAudioBookButton from '@/features/audiobook/CreateAudioBookButton';
import sortIcon from '@/assets/icons/sort.svg';
import { audiobooks } from '@/constants/audiobooks';

const AudioBook: React.FC = () => {
  const navigate = useNavigate();
  // load any locally-created audiobooks (saved during creation) and show most-recent-first
  const [audiobookList, setAudiobookList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('localAudiobooks') || '[]');
      return Array.isArray(stored) ? [...stored, ...audiobooks] : [...audiobooks];
    } catch (e) {
      return [...audiobooks];
    }
  });

  useEffect(() => {
    // ensure list is kept up-to-date on mount (in case storage changed)
    try {
      const stored = JSON.parse(localStorage.getItem('localAudiobooks') || '[]');
      const combined = Array.isArray(stored) ? [...stored, ...audiobooks] : [...audiobooks];
      combined.sort((a, b) => b.id - a.id);
      setAudiobookList(combined);
    } catch (e) {
      setAudiobookList([...audiobooks]);
    }
  }, []);

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
              key={audiobook.id}
              title={audiobook.title}
              tags={audiobook.tags}
              character={audiobook.character}
              time={audiobook.time}
              imageSrc={audiobook.imageSrc}
              onPlayClick={() => navigate(`/audiobook/${audiobook.id}`)}
            />
          ))}
        </div>
      </div>

      {/* 오디오북 생성 버튼 - BottomNav 위 29px 고정 */}
      <div className='fixed bottom-[109px] left-1/2 -translate-x-1/2 z-50'>
        <CreateAudioBookButton onClick={() => navigate('/audiobook/create')} />
      </div>

      <BottomNav className='shadow-shadow-purple' />
    </div>
  );
};

export default AudioBook;
