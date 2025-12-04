export interface UserInfoItem {
  key: string;
  value: string;
  placeholder?: string;
  type?: string;
}

export interface UserInfoListProps {
  items: UserInfoItem[];
  onChange?: (key: string, value: string) => void;
  isEditMode?: boolean;
}
