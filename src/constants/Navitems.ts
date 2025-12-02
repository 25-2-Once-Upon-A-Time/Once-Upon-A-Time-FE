import StoryIcon from '@/assets/icons/story.svg?react';
import CharacterIcon from '@/assets/icons/character.svg?react';
import AudiobookIcon from '@/assets/icons/audiobook.svg?react';
import CommunityIcon from '@/assets/icons/community.svg?react';
import UserIcon from '@/assets/icons/user.svg?react';
import type { NavItem } from '@/components/BottomNav/BottomNav.types';

export const NAV_ITEMS: NavItem[] = [
  { label: '동화', to: '/story', icon: StoryIcon },
  { label: '캐릭터', to: '/character', icon: CharacterIcon },
  { label: '오디오북', to: '/audiobook', icon: AudiobookIcon },
  { label: '커뮤니티', to: '/community', icon: CommunityIcon },
  { label: '내 정보', to: '/mypage', icon: UserIcon },
];
