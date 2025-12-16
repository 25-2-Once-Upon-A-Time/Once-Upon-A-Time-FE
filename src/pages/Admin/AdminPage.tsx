import React, { useState } from 'react';
import {
  useGetAllMembers,
  useGetAllStories,
  useGetAllAudioBooks,
  useDeleteMember,
} from '@/hooks/queries/useAdmin';

type Tab = 'members' | 'stories' | 'audiobooks';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('members');

  // React Query 훅
  const { data: members, isLoading: membersLoading } = useGetAllMembers();
  const { data: stories, isLoading: storiesLoading } = useGetAllStories();
  const { data: audiobooks, isLoading: audiobooksLoading } = useGetAllAudioBooks();
  const deleteMemberMutation = useDeleteMember();

  // 회원 삭제 핸들러
  const handleDeleteMember = (memberId: number, memberName: string) => {
    if (window.confirm(`정말로 "${memberName}" 회원을 탈퇴시키겠습니까?`)) {
      deleteMemberMutation.mutate(memberId, {
        onSuccess: () => {
          alert('회원이 성공적으로 탈퇴되었습니다.');
        },
        onError: (error: any) => {
          alert(`회원 탈퇴 실패: ${error.response?.data?.error?.message || '알 수 없는 오류'}`);
        },
      });
    }
  };

  // 탭 버튼 스타일
  const getTabButtonClass = (tab: Tab) => {
    return `px-6 py-3 font-semibold transition-colors ${
      activeTab === tab
        ? 'border-b-2 border-bg-purple-300 text-bg-purple-300'
        : 'text-fg-gray hover:text-fg-primary'
    }`;
  };

  return (
    <div className='w-full min-h-screen bg-gray-50'>
      {/* 헤더 */}
      <div className='bg-white shadow-sm'>
        <div className='max-w-[1200px] mx-auto px-6 py-6'>
          <h1 className='nsr-24-eb text-fg-primary'>관리자 페이지</h1>
          <p className='ng-14-r text-fg-gray mt-2'>회원, 동화, 오디오북을 관리할 수 있습니다</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className='bg-white border-b'>
        <div className='max-w-[1200px] mx-auto px-6'>
          <div className='flex gap-8'>
            <button
              type='button'
              onClick={() => setActiveTab('members')}
              className={getTabButtonClass('members')}
            >
              회원 관리
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('stories')}
              className={getTabButtonClass('stories')}
            >
              동화 관리
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('audiobooks')}
              className={getTabButtonClass('audiobooks')}
            >
              오디오북 관리
            </button>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className='max-w-[1200px] mx-auto px-6 py-8'>
        {/* 회원 관리 탭 */}
        {activeTab === 'members' && (
          <div className='bg-white rounded-[16px] shadow-sm overflow-hidden'>
            <div className='px-6 py-4 border-b'>
              <h2 className='nsr-20-eb'>전체 회원 목록</h2>
              <p className='ng-14-r text-fg-gray mt-1'>
                총 {members?.length || 0}명의 회원이 있습니다
              </p>
            </div>
            {membersLoading ? (
              <div className='px-6 py-12 text-center text-fg-gray'>로딩 중...</div>
            ) : members && members.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>ID</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>이름</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>닉네임</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>카카오 ID</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>역할</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>작업</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y'>
                    {members.map((member) => (
                      <tr key={member.memberId} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 ng-14-r'>{member.memberId}</td>
                        <td className='px-6 py-4 ng-14-r'>{member.name}</td>
                        <td className='px-6 py-4 ng-14-r'>{member.nickname}</td>
                        <td className='px-6 py-4 ng-14-r text-fg-gray'>{member.kakaoUserId}</td>
                        <td className='px-6 py-4'>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              member.role === 'ADMIN'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {member.role}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <button
                            type='button'
                            onClick={() => handleDeleteMember(member.memberId, member.name)}
                            disabled={member.role === 'ADMIN'}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                              member.role === 'ADMIN'
                                ? 'bg-gray-100 text-fg-disabled cursor-not-allowed'
                                : 'bg-red-500 text-white hover:bg-red-600'
                            }`}
                          >
                            탈퇴
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='px-6 py-12 text-center text-fg-gray'>회원이 없습니다</div>
            )}
          </div>
        )}

        {/* 동화 관리 탭 */}
        {activeTab === 'stories' && (
          <div className='bg-white rounded-[16px] shadow-sm overflow-hidden'>
            <div className='px-6 py-4 border-b'>
              <h2 className='nsr-20-eb'>전체 동화 목록</h2>
              <p className='ng-14-r text-fg-gray mt-1'>
                총 {stories?.length || 0}개의 동화가 있습니다
              </p>
            </div>
            {storiesLoading ? (
              <div className='px-6 py-12 text-center text-fg-gray'>로딩 중...</div>
            ) : stories && stories.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>ID</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>제목</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>작가</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>테마</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>생성일</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y'>
                    {stories.map((story) => (
                      <tr key={story.storyId} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 ng-14-r'>{story.storyId}</td>
                        <td className='px-6 py-4 ng-14-b'>{story.title}</td>
                        <td className='px-6 py-4 ng-14-r'>{story.writerName}</td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold'>
                            {story.theme}
                          </span>
                        </td>
                        <td className='px-6 py-4 ng-14-r text-fg-gray'>
                          {new Date(story.createdDate).toLocaleString('ko-KR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='px-6 py-12 text-center text-fg-gray'>동화가 없습니다</div>
            )}
          </div>
        )}

        {/* 오디오북 관리 탭 */}
        {activeTab === 'audiobooks' && (
          <div className='bg-white rounded-[16px] shadow-sm overflow-hidden'>
            <div className='px-6 py-4 border-b'>
              <h2 className='nsr-20-eb'>전체 오디오북 목록</h2>
              <p className='ng-14-r text-fg-gray mt-1'>
                총 {audiobooks?.length || 0}개의 오디오북이 있습니다
              </p>
            </div>
            {audiobooksLoading ? (
              <div className='px-6 py-12 text-center text-fg-gray'>로딩 중...</div>
            ) : audiobooks && audiobooks.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>ID</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>동화 제목</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>회원명</th>
                      <th className='px-6 py-3 text-left ng-14-b text-fg-gray'>캐릭터</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y'>
                    {audiobooks.map((audiobook) => (
                      <tr key={audiobook.audioBookId} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 ng-14-r'>{audiobook.audioBookId}</td>
                        <td className='px-6 py-4 ng-14-b'>{audiobook.storyTitle}</td>
                        <td className='px-6 py-4 ng-14-r'>{audiobook.memberName}</td>
                        <td className='px-6 py-4'>
                          <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold'>
                            {audiobook.characterName}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='px-6 py-12 text-center text-fg-gray'>오디오북이 없습니다</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
