import React from 'react';
import { Input } from '@/components/ui/Input';
import { GenderSelect } from '@/components/ui/GenderSelect';
import type { UserInfoListProps } from './UserInfoList.types';

const UserInfoList: React.FC<UserInfoListProps> = ({ items, onChange, isEditMode = false }) => {
  const handleChange = (key: string, value: string) => {
    if (onChange) {
      onChange(key, value);
    }
  };

  return (
    <div className='w-full rounded-[5px] opacity-100'>
      <div className='space-y-6'>
        {items.map((item) => (
          <div key={item.key} className='w-full opacity-100'>
            <label className='block text-fg-primary pre-16-43-r mb-2'>{item.key}</label>
            {item.key === '성별' ? (
              <GenderSelect
                value={item.value}
                onChange={(value) => handleChange(item.key, value)}
                isEditMode={isEditMode}
                disabled={!isEditMode}
              />
            ) : (
              <Input
                className={`border-border-purple placeholder:text-fg-gray ${
                  isEditMode ? 'bg-bg-purple-300' : 'bg-bg-purple-600'
                }`}
                type={item.type || 'text'}
                placeholder={item.placeholder}
                value={item.value}
                onChange={(e) => handleChange(item.key, e.target.value)}
                disabled={!isEditMode}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfoList;
