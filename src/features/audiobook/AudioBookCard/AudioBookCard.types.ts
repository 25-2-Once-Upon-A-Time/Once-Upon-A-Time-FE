export interface AudioBookCardProps {
  title: string;
  tags: string[];
  character: string;
  duration: number;
  imageSrc?: string;
  onPlayClick?: () => void;
  className?: string;
}
