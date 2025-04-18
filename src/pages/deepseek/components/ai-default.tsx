import Aiuser from '@/assets/images/chat/deepseek.svg';
import React from 'react';
const AiChat: React.FC = () => {
  return (
    <div
      className="text-normal mb-8 overflow-hidden"
      style={{ width: 'calc(100% - 52px)' }}
    >
      <div className="mt-[18px] flex w-full items-center justify-start">
        <img
          src={Aiuser}
          className="mr-[8px] w-[36px] rounded-full border-[1px] border-solid border-[#313131] p-1"
          alt=""
        ></img>
        <div className="ml-2 flex w-full flex-col font-bold text-[#fff]">
          您好，有什么问题可以帮您, 你可以要我生成表格、文字、代码
        </div>
      </div>
    </div>
  );
};

export default AiChat;
