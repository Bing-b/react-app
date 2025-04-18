import React from 'react';

import Aiuser from '@/assets/images/chat/deepseek.svg';
import LoadIcon from '@/assets/images/chat/load.png';

const Loading: React.FC = () => {
  return (
    <div className="mt-[18px] flex items-start justify-start">
      <img
        src={Aiuser}
        width={44}
        height={44}
        className="mr-2 rounded-full border-[1px] border-solid border-[#eae7e7] p-1"
      ></img>
      <div className="border-radius-lg px-[10px] pb-[6px] pt-[10px]">
        <img src={LoadIcon} alt="" className="h-[30px]"></img>
      </div>
    </div>
  );
};

export default Loading;
