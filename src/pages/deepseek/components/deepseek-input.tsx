import { Input, message, Popover } from 'antd';
import { useState } from 'react';

import loadingIcon from '@/assets/images/chat/loading.png';
import IconSend from '@/assets/images/chat/send.svg';

interface Props {
  send: (s: string) => void; // 发送消息
  loading: boolean; // 是否加载中 回复及流式回复
  deepthinking: boolean; // 是否开启深度思考
  changeDeepthinking: () => void; // 变更开启深度思考
  stopChat: () => void; // 停止聊天
}

const { TextArea } = Input;

const DeepseekInput: React.FC<Props> = ({
  send,
  loading,
  deepthinking,
  changeDeepthinking,
  stopChat,
}) => {
  // 回车 发送问题
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (loading) {
      message.warning('正在回答请稍后提问');
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault(); // 阻止默认的回车行为
      send(value);
      setValue('');
    }
  };

  const sendMessage = () => {
    if (loading) {
      message.warning('正在回答请稍后提问');
      return;
    }
    send(value);
    setValue('');
  };

  return (
    <div className="min-h-30 mx-auto mb-5 flex w-[70%] flex-col justify-between rounded-[30px] bg-[#404045] px-3 py-2">
      <div className="mb-2.5">
        <TextArea
          placeholder="有什么问题，我可以帮您"
          autoSize={{ minRows: 2, maxRows: 6 }}
          style={{
            border: 0,
            outline: 0,
            boxShadow: 'none',
            background: '#404045',
          }}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex justify-between">
        {/* 左侧按钮 */}
        <div>
          <div
            className={`flex cursor-pointer items-center rounded-full border-[1px] border-solid px-3 py-1 ${
              deepthinking
                ? 'border-transparent bg-[#4d6bfe66]'
                : 'border-[#E4E9ED]'
            }`}
            onClick={changeDeepthinking}
          >
            <span
              className={`ml-1 text-[14px] ${
                deepthinking ? 'text-[#a0b5f5]' : null
              }`}
            >
              深度思考(R1)
            </span>
          </div>
        </div>
        {/* 右侧发送 */}
        <div className="flex items-center">
          {/* 仅仅本地知识有文件上传 */}
          <div className={`flex h-full cursor-pointer items-center`}></div>
          {loading ? (
            <Popover content="停止问答" title={null}>
              <img
                src={loadingIcon}
                alt="loading"
                className="w-[36px] cursor-pointer"
                onClick={stopChat}
              ></img>
            </Popover>
          ) : (
            <span
              onClick={sendMessage}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${value.length ? 'bg-[#4166d5]' : 'bg-[#6f6f78]'} ${!value.length ? 'cursor-not-allowed' : 'cursor-pointer'} `}
            >
              <img src={IconSend} width={20} color="#fff" alt=""></img>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeepseekInput;
