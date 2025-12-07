export interface AudioBookCardProps {
  title: string;
  tags: string[];
  character: string;
  time: string;
  imageSrc?: string;
  onPlayClick?: () => void;
  className?: string;
}
