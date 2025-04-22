import React from 'react';

import Aiuser from '@/assets/images/chat/deepseek.svg';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading: React.FC = () => {
  return (
    <div className="mt-[18px] flex items-start justify-start">
      <img
        src={Aiuser}
        className="mr-2 h-9 w-9 rounded-full border border-solid border-[#313131] p-1"
      ></img>
      <div className="border-radius-lg px-[10px] pb-[6px] pt-[10px]">
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    </div>
  );
};

export default Loading;
