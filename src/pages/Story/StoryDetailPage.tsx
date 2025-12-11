import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image/Image';
import BackButton from '@/components/ui/BackButton/BackButton';
import LikeButton from '@/components/ui/LikeButton/LikeButton';
import { useStoryDetail } from '@/hooks/queries/useStories';

const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const storyId = id ? Number(id) : null;
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);

  // API로 상세 조회
  const { data: story, isLoading, isError } = useStoryDetail(storyId!);

  if (!story) {
    return <div>동화를 찾을 수 없습니다.</div>;
  }

  // 🚀 로딩 처리
  if (isLoading) {
    return <div className='text-center mt-20 text-white'>동화를 불러오는 중...</div>;
  }

  // 🚀 서버 에러 처리
  if (isError || !story) {
    return <div className='text-center mt-20 text-white'>동화를 찾을 수 없습니다.</div>;
  }

  const handleLikeChange = (liked: boolean) => {
    setIsLiked(liked);
  };

  return (
    <div className='max-w-[480px] min-w-[360px] h-screen mx-auto bg-bg-purple-700 flex flex-col overflow-hidden'>
      {/* 동화 이미지 + 버튼들 */}
      <div className='relative w-full flex-shrink-0'>
        <Image src={story.thumbnailUrl} alt={story.title} className='w-full aspect-square' />

        {/* 뒤로가기 버튼 - 왼쪽 위 */}
        <div className='absolute top-[18px] left-[20px]'>
          <BackButton onClick={() => navigate(-1)} />
        </div>

        {/* 하트 버튼 - 오른쪽 위 */}
        <div className='absolute top-[18px] right-[20px]'>
          <LikeButton isLiked={isLiked} onClick={handleLikeChange} />
        </div>
      </div>

      {/* 동화 정보 */}
      <div className='flex-1 flex flex-col px-6 py-4 gap-4 overflow-hidden'>
        {/* 제목 */}
        <h1 className='nsr-24-eb text-white flex-shrink-0'>{story.title}</h1>

        {/* 한 줄 요약 */}
        <p className='nbp-16-b text-gray-300 flex-shrink-0'>{story.description}</p>

        {/* 테마 & 분위기 태그 */}
        <div className='flex gap-2 flex-shrink-0'>
          <span className='px-3 py-1 bg-white/20 text-white text-[12px] rounded-full nbp-16-b'>
            {story.theme}
          </span>
          <span className='px-3 py-1 bg-white/20 text-white text-[12px] rounded-full nbp-16-b'>
            {story.vibe}
          </span>
        </div>

        {/* 동화 내용 */}
        <div
          className='flex-1 bg-white/10 rounded-[12px] p-4 overflow-y-auto mb-4'
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <p className='nbp-16-b text-white'>{story.content}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;
