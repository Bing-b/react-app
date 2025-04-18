import React from 'react';

import MeUser from '@/assets/images/chat/me-user.svg';

interface MyComponentProps {
  message: any;
}

const UserChat: React.FC<MyComponentProps> = ({ message }) => {
  return (
    <div className="flex items-start justify-end text-[16px]">
      <div className="border-radius-lg px-[16px] py-[12px]">
        {message?.question?.trim()}
      </div>
      <img src={MeUser} className="bg ml-[8px] w-[36px]"></img>
    </div>
  );
};

export default UserChat;
