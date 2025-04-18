import TwoCopy from '@/assets/images/chat/TwoCopy-normal.svg';
import { Popover, message } from 'antd';
import copy from 'copy-to-clipboard';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiContext } from './ai-chat';

const PreWithCopy = ({ children }: { children: any }) => {
  const preRef = useRef(null);

  const [language, setLanguage] = useState<string | null>(null);

  const { done } = useContext(AiContext);

  const handleCopy = () => {
    const code = (preRef.current as any).textContent || '';
    copy(code)
      ? message.success('代码已复制到剪贴板')
      : message.error('复制失败');
  };

  useEffect(() => {
    let detectedLang: string | null = null;
    if (React.isValidElement(children) && children.props) {
      const childClassName = (children.props as any).className;
      if (typeof childClassName === 'string') {
        const match = /language-(\w+)/.exec(childClassName);
        detectedLang = match ? match[1] : null;
      }
    }
    setLanguage(detectedLang);
  }, [children]);

  return (
    <div className="relative">
      <pre ref={preRef} className="code-pre !pt-[30px]">
        {children}
      </pre>
      {/* 完成后可以复制 */}
      {done && (
        <Popover content="复制" title={null}>
          <img
            alt="copy"
            src={TwoCopy}
            width={16}
            className="absolute right-2 top-2 cursor-pointer"
            onClick={handleCopy}
          ></img>
        </Popover>
      )}
      {language && (
        <span className="absolute left-3 top-1 text-gray-400">{language}</span>
      )}
    </div>
  );
};

export default PreWithCopy;
