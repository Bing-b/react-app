import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import PreWithCopy from './copycode.tsx';

import 'highlight.js/styles/github.css';
import rehypeHighlight from 'rehype-highlight'; // 代码高亮

interface MyComponentProps {
  done: boolean;
  markdownstr: string;
}

const MarkdownAi: React.FC<MyComponentProps> = ({ markdownstr }) => {
  // 自定义渲染器
  const components = {
    pre: PreWithCopy,
  };

  const parentRef = useRef(null);

  // 消除空格的 解决html 渲染的问题
  const removeExtraWhitespace = () => {
    return (tree: any) => {
      const removeWhitespace = (node: any) => {
        if (node.tagName === 'pre') {
          return;
        }
        if (node.type === 'text') {
          node.value = node.value.replace(/\s+/g, ' ');
        }
        if (node.children) {
          node.children = node.children.filter((child: any) => {
            if (child.type === 'text') {
              return child.value.trim() !== '';
            }
            removeWhitespace(child);
            return true;
          });
        }
      };
      removeWhitespace(tree);
      return tree;
    };
  };

  return (
    <div
      ref={parentRef}
      style={{ whiteSpace: 'pre-wrap' }}
      className="markdown-body markdown-body-dark rounded-lg bg-[#212121] px-3 py-2 text-sm text-white"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, removeExtraWhitespace]}
        components={components as any}
      >
        {markdownstr}
      </ReactMarkdown>
    </div>
  );
};
export default MarkdownAi;
