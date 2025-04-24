import React from 'react';

interface MyComponentProps {
  message: any;
}

const UserChat: React.FC<MyComponentProps> = ({ message }) => {
  return (
    <div className="flex items-start justify-end gap-4">
      <div className="rounded-lg bg-[#212121] px-3 py-2 text-sm text-white">
        {message?.question?.trim()}
      </div>
      <Icon icon="quill:user-neutral" width="24" height="24" color="#4d6bfe" />
    </div>
  );
};

export default UserChat;
