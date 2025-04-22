import Aiuser from '@/assets/images/chat/deepseek.svg';
import { createContext } from 'react';
import MarkdownAi from './markdown-ai';

interface Props {
  message: any;
  done: boolean;
}

// 创建问答状态上下文
const AiContext = createContext({
  done: false,
});

const AiChat: React.FC<Props> = ({ message, done }) => {
  return (
    <div className="text-normal mb-8 overflow-hidden">
      <div className="mt-[18px] flex w-full items-start justify-start">
        <img
          src={Aiuser}
          className="mr-[8px] w-[36px] rounded-full border-[1px] border-solid border-[#313131] p-1"
          alt=""
        ></img>
        <div className="ml-2 flex max-w-[900px] flex-col">
          <AiContext.Provider value={{ done: message?.done }}>
            <MarkdownAi done={done} markdownstr={message?.answer} />
          </AiContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
export { AiContext };
