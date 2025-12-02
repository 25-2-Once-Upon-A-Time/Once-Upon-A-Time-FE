import React from 'react';

export interface MenuItemType {
  key: string;
  label: string;
  value: string;
}

interface UserInfoListProps {
  items: MenuItemType[];
}

const UserInfoList: React.FC<UserInfoListProps> = ({ items }) => {
  return (
    <div className='w-full flex flex-col px-[20px]'>
      {items.map((item) => (
        <div
          key={item.key}
          className='flex flex-row py-[12px] items-center justify-between text-fg-medium'
        >
          <span className='body-16-eb'>{item.label}</span>
          <span className='body-16-b'>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default UserInfoList;
