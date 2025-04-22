import React from 'react';

import MeUser from '@/assets/images/chat/me-user.svg';

interface MyComponentProps {
  message: any;
}

const UserChat: React.FC<MyComponentProps> = ({ message }) => {
  return (
    <div className="flex items-start justify-end text-[16px]">
      <div className="rounded-lg bg-[#212121] px-4 py-3 text-sm text-white">
        {message?.question?.trim()}
      </div>
      <img
        src={MeUser}
        className="ml-[8px] w-[36px] rounded-full border border-solid border-[#313131] p-1"
      ></img>
    </div>
  );
};

export default UserChat;
