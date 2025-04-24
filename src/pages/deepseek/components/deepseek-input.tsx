import deepThink from '@/assets/images/chat/deepthink.svg';
import deepThinkON from '@/assets/images/chat/deepthinking.svg';
import { Input, message, Popover } from 'antd';
import { useState } from 'react';

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

  const [active, setActive] = useState(false);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (loading) {
      message.warning('正在回答请稍后提问');
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault(); // 阻止默认的回车行为
      send(value);
      setActive(true);
      setValue('');
    }
  };

  const sendMessage = () => {
    if (loading) {
      message.warning('正在回答请稍后提问');
      return;
    }
    send(value);
    setActive(true);
    setValue('');
  };

  return (
    <div
      className={`min-h-30 mx-auto mb-5 flex flex-col justify-between rounded-[20px] bg-[#404045] px-3 py-2 duration-300 ease-in-out ${
        active ? 'w-[800px]' : 'w-[672px]'
      }`}
    >
      <div className="mb-2.5">
        <TextArea
          placeholder="给 Deepseek 发送消息"
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
                : 'border-[#9fa0a0]'
            }`}
            onClick={changeDeepthinking}
          >
            {deepthinking ? (
              <img src={deepThinkON} width={18} alt=""></img>
            ) : (
              <img src={deepThink} width={18} alt=""></img>
            )}

            <span
              className={`ml-1 text-xs ${
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
              <div
                onClick={stopChat}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#4166d5]"
              >
                <div className="h-3 w-3 rounded-sm bg-[#fff]"></div>
              </div>
            </Popover>
          ) : (
            <Popover content="请输入您的问题" title={null}>
              <span
                onClick={sendMessage}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${value.length ? 'bg-[#4166d5]' : 'bg-[#6f6f78]'} ${!value.length ? 'cursor-not-allowed' : 'cursor-pointer'} `}
              >
                <Icon
                  icon="material-symbols:arrow-upward-alt-rounded"
                  width="24"
                  height="24"
                />
              </span>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeepseekInput;
