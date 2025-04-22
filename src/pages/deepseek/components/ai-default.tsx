import Aiuser from '@/assets/images/chat/deepseek.svg';
import React from 'react';
const AiChat: React.FC = () => {
  return (
    <div
      className="text-normal mb-8 overflow-hidden"
      style={{ width: '500px' }}
    >
      <div className="mt-[18px] flex w-full items-center justify-start">
        <img
          src={Aiuser}
          className="mr-2 w-[36px] rounded-full border border-solid border-[#313131] p-1"
          alt=""
        ></img>
        <div className="ml-2 inline-flex w-full flex-col rounded-lg bg-[#414158] px-4 py-3 text-sm text-white">
          您好，有什么问题可以帮您, 你可以要我生成表格、文字、代码
        </div>
      </div>
    </div>
  );
};

export default AiChat;
