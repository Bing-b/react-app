import IconCloseNewchat from '@/assets/images/chat/history-close-newchat.svg';
import IconOpenNewchat from '@/assets/images/chat/history-new-newchat.svg';
import IconMenu from '@/assets/images/chat/menu.svg';
import { Conversations, type ConversationsProps } from '@ant-design/x';
import { Divider, Empty, GetProp, Modal, Popover, Space } from 'antd';
import React from 'react';

interface SliderProps {
  activeKey: string;
  sessionList: any[];
  changeSession: (sessionId: string) => void;
  newChat: () => void;
  deleteOk: (id: string) => void;
}

const style = {
  width: '100%',
  background: '#141414',
  borderRadius: '0px',
  paddingBottom: '8px',
  paddingTop: '8px',
};

const groupable: GetProp<typeof Conversations, 'groupable'> = {
  title: (group, { components: { GroupTitle } }) =>
    group && (
      <GroupTitle>
        <Space>
          <h6>{group}</h6>
        </Space>
      </GroupTitle>
    ),
};

const SliderBar: React.FC<SliderProps> = ({
  activeKey,
  sessionList,
  changeSession,
  newChat,
  deleteOk,
}) => {
  // 收展
  const [open, setOpen] = React.useState(true);

  const sessionItems = sessionList.flatMap((i) => {
    return i.list.map((j: any) => {
      return {
        ...j,
        group: i.label,
        key: j.session_id,
        label: j.session_name,
      };
    });
  });

  const menuConfig: ConversationsProps['menu'] = (conversation) => ({
    items: [
      {
        label: '删除',
        key: 'delete',
      },
    ],
    onClick: (menuInfo: any) => {
      menuInfo.domEvent.stopPropagation();
      if (menuInfo.key === 'delete') {
        Modal.confirm({
          title: '是否删除此对话',
          content: '', // 可以添加一些额外的提示内容
          okText: '确认',
          okType: 'primary',
          cancelText: '取消',
          onOk: () => deleteOk(conversation.key),
        });
      }
    },
  });

  // 传递给父组件 seeion id
  const itemsClick = (v: string) => {
    changeSession(v);
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <div
      className={`transition-width h-full duration-75 ease-in-out ${open ? 'w-[280px' : 'w-[60px]'} ${open ? 'overflow-auto' : 'overflow-hidden'}`}
    >
      {/* 收起状态 */}
      {!open && (
        <div
          className={`flex h-full w-full flex-col items-center space-y-5 border-0 border-r border-solid border-[#313131] ${
            open && 'hidden'
          }`}
        >
          <img
            src={IconMenu}
            className="mt-5 h-[24px] cursor-pointer"
            onClick={() => setOpen(true)}
          ></img>
          <Divider />
          <Popover content="新对话" title={null} placement="right">
            <img
              src={IconCloseNewchat}
              className="mt-4 h-[56px] cursor-pointer"
              onClick={newChat}
            ></img>
          </Popover>
        </div>
      )}

      {/* 展开状态 */}
      {open && (
        <div
          className={`flex h-full w-[280px] flex-col items-center border-0 border-r border-solid border-[#313131]`}
        >
          {/* 顶部新会话 */}
          <div className="mb-4 flex w-full items-center justify-between px-4 pt-5">
            <img
              src={IconMenu}
              className="h-[24px] cursor-pointer"
              onClick={close}
            ></img>
            <div className="h-[70%] w-[1px] bg-[#313131]"></div>
            <div
              onClick={newChat}
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#4d6bfe] px-3 py-2 hover:!bg-[#4166d5]"
            >
              <img
                src={IconOpenNewchat}
                className="h-[20px] cursor-pointer"
              ></img>
              开启新对话
            </div>
          </div>
          <Divider style={{ margin: 0 }} />
          {/* 会话记录 */}
          {sessionItems.length ? (
            <Conversations
              items={sessionItems as any}
              onActiveChange={(v) => itemsClick(v)}
              style={style}
              groupable={groupable}
              activeKey={activeKey}
              menu={menuConfig}
            />
          ) : (
            <Empty className="mt-32" description="暂无会话" />
          )}
        </div>
      )}
    </div>
  );
};

export default SliderBar;
