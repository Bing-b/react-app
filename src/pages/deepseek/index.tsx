import { useSessionGroups } from '@/hooks/useSessionGroup';
import { message } from 'antd';
import OpenAI from 'openai';
import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import AiChat from './components/ai-chat';
import AiChatDefault from './components/ai-default';
import DeepseekInput from './components/deepseek-input';
import Loading from './components/loading';
import SliderBar from './components/slide-bar';
import UserChat from './components/user-chat';

interface Session {
  id: string;
  session_id: string;
  session_name: string;
  created_time: string;
  qalist: any[];
  // 其他字段...
}

const ADD_CHAT_ITEM = {
  answer: '',
  question: '',
  type: '',
  id: '',
  done: false, // 是否完成 默认是false
};

const DeepAi: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  // 会话数据
  const [sessions, setSessions] = useImmer<Session[]>([]);

  // 左侧会话列表
  const sessionGroups = useSessionGroups(sessions);

  // 当前会话id
  const [sessionId, setSessionId] = useState<string>('');

  // 添加询问问题
  // 接口处理 加载loading
  const [loading, setLoading] = useState(false);

  // 处理 流式状态
  const [answering, setAnswering] = useState(false);

  const [deepthinking, setDeepthinking] = useState(false);

  // 问答列表
  const [QA_LIST, SET_QA_LIST] = useImmer<any[]>([]);

  const currentCtrl = useRef<any>(null);

  const chatRef = useRef<HTMLDivElement>(null);

  // openai ref
  const openaiRef = useRef<any>(null);

  const getSesseionHistoryList = async (id: string) => {
    const currentSession = sessions.find((i) => i.id === sessionId);
    if (currentSession && currentSession.session_name === '新对话') {
      setSessions((draft) => {
        const session = draft.find((i) => i.id === sessionId);
        if (session) {
          session.session_name = QA_LIST[0].question;
          session.qalist = QA_LIST;
        }
      });
    }

    setSessionId(id);
    const session = sessions.find((i) => i.id === id);
    if (session) {
      SET_QA_LIST(session.qalist);
      goChatBottom();
    }
  };

  // 新建对话
  const newChat = () => {
    console.log(QA_LIST);
    if (QA_LIST.length === 0) return messageApi.warning('已是最新的对话');

    setSessions((draft) => {
      const session = draft.find((i) => i.id === sessionId);

      if (session) {
        session.session_name = QA_LIST[0].question;
        session.qalist = QA_LIST;
      }
    });

    const newSession: Session = {
      id: Date.now().toString(),
      session_id: Date.now().toString(),
      session_name: '新对话',
      created_time: new Date().toISOString(),
      qalist: [],
    };
    setSessions((prev) => {
      prev.push(newSession);
    }); // 新会话放在最前面
    setSessionId(newSession.session_id);
    SET_QA_LIST([]);
  };

  // 删除会话
  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((i) => i.id !== id));
  };

  // 添加询问
  const addQuestion = (q: string) => {
    if (sessions.length === 0) {
      const session = {
        id: Date.now().toString(),
        session_id: Date.now().toString(),
        session_name: '新对话',
        created_time: new Date().toISOString(),
        qalist: [],
      };
      setSessions((draft) => {
        draft.push(session);
      });

      setSessionId(session.id);
    }

    SET_QA_LIST((prevCount) => {
      prevCount.push({
        ...ADD_CHAT_ITEM,
        question: q.trim(),
      });
    });
  };

  // 聊天滚动底部
  const goChatBottom = async () => {
    const node = chatRef.current;
    if (node) {
      // 滚动到DOM节点的底部
      node.scroll({
        top: node.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const send = async (q: string) => {
    if (!q) return;
    // 加载中不允许再次提问
    if (loading || answering) {
      messageApi.warning('请等待上一个问题回答完成后再提问！');
      return false;
    }

    addQuestion(q);

    // 滚动底部
    setTimeout(() => {
      goChatBottom();
    }, 100);

    // 加载框
    setLoading(true);
    setAnswering(false);

    // 创建新的 AbortController 实例
    currentCtrl.current = new AbortController();

    const params = {
      messages: [{ role: 'user', content: q }],
      model: 'deepseek-ai/DeepSeek-V3',
      stream: true,
      signal: currentCtrl.current.signal, // 传递 AbortController 的 signal 属性
    };

    if (params.messages.length > 0) {
      try {
        const response =
          await openaiRef.current.chat.completions.create(params);
        for await (const part of response) {
          if (currentCtrl.current.signal.aborted) {
            break; // 手动终止循环
          }
          setLoading(false);
          setAnswering(true);
          //console.log(part);
          SET_QA_LIST((prevCount) => {
            prevCount[prevCount.length - 1].answer =
              prevCount[prevCount.length - 1].answer +
              part.choices[0].delta.content;
          });
          goChatBottom();
        }

        setLoading(false);
        setAnswering(false);
        SET_QA_LIST((prevCount) => {
          prevCount[prevCount.length - 1].done = true;
        });
      } catch (error) {
        setLoading(false);
        setAnswering(false);
      }
    }
  };

  // 手动停止流式返回的函数
  const stopStreaming = () => {
    if (currentCtrl.current) {
      currentCtrl.current.abort();
      SET_QA_LIST((prevCount) => {
        prevCount[prevCount.length - 1].done = true;
      });
      // 取消加载框
      setLoading(false);
      setAnswering(false);
      messageApi.success('已停止生成');
    }
  };

  const initOpenAI = () => {
    openaiRef.current = new OpenAI({
      baseURL: 'https://api.siliconflow.cn/v1',
      apiKey: import.meta.env.VITE_DEEPSEEK_KEY,
      dangerouslyAllowBrowser: true,
    });
  };

  useEffect(() => {
    initOpenAI();
  }, []);

  return (
    <div className="flex h-full w-full overflow-x-hidden">
      {contextHolder}
      <SliderBar
        sessionList={sessionGroups}
        changeSession={getSesseionHistoryList}
        newChat={newChat}
        deleteOk={deleteSession}
        activeKey={sessionId}
      ></SliderBar>
      <div className="flex h-full flex-1 flex-col justify-between p-4">
        <div
          className="min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-auto pb-24"
          ref={chatRef}
        >
          <AiChatDefault />
          {QA_LIST.map((i, idx) => {
            return (
              <div key={idx}>
                {i.question && <UserChat message={i} />}
                {i?.answer && <AiChat done={i?.done} message={i} />}
              </div>
            );
          })}
          {loading && !answering && <Loading></Loading>}
        </div>
        <DeepseekInput
          send={send}
          loading={loading || answering}
          deepthinking={deepthinking}
          changeDeepthinking={() => setDeepthinking(!deepthinking)}
          stopChat={stopStreaming}
        ></DeepseekInput>
      </div>
    </div>
  );
};

export default DeepAi;
