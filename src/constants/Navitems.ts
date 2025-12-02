import homeIcon from '@/assets/Nav/icons/home.png';
import homeActiveIcon from '@/assets/Nav/icons/home-active.png';
import characterIcon from '@/assets/Nav/icons/character.png';
import characterActiveIcon from '@/assets/Nav/icons/character-active.png';
import storyIcon from '@/assets/Nav/icons/story.png';
import storyActiveIcon from '@/assets/Nav/icons/story-active.png';
import communityIcon from '@/assets/Nav/icons/community.png';
import communityActiveIcon from '@/assets/Nav/icons/community-active.png';
import myPageIcon from '@/assets/Nav/icons/mypage.png';
import myPageActiveIcon from '@/assets/Nav/icons/mypage-active.png';
import type { NavItem } from '@/components/ui/BottomNav/BottomNav.types';

export const NAV_ITEMS: NavItem[] = [
  { label: '홈', to: '/', icon: homeIcon, activeIcon: homeActiveIcon },
  { label: '캐릭터', to: '/character', icon: characterIcon, activeIcon: characterActiveIcon },
  { label: '동화', to: '/story', icon: storyIcon, activeIcon: storyActiveIcon },
  { label: '커뮤니티', to: '/community', icon: communityIcon, activeIcon: communityActiveIcon },
  { label: '내정보', to: '/mypage', icon: myPageIcon, activeIcon: myPageActiveIcon },
];
