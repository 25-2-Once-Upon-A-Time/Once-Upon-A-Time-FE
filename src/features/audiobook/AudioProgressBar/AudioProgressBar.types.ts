export interface AudioProgressBarProps {
  currentTime: number; // 현재 재생 시간 (초)
  totalTime: number; // 전체 재생 시간 (초)
  className?: string;
  onSeek?: (time: number) => void; // 시간 이동 콜백
}
