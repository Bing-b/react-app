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
  background: '#212327',
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

  const [modal, contextHolder] = Modal.useModal();

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
        modal.confirm({
          title: '提升',
          content: '是否删除此会话',
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
      className={`transition-width h-full bg-[#212327] duration-75 ease-in-out ${open ? 'w-[280px' : 'w-[60px]'} ${open ? 'overflow-auto' : 'overflow-hidden'}`}
    >
      {/* 收起状态 */}
      {!open && (
        <div
          className={`flex h-full w-full flex-col items-center space-y-5 border-0 border-r border-solid border-[#313131] ${
            open && 'hidden'
          }`}
        >
          <Icon
            onClick={() => setOpen(true)}
            className="mt-5 cursor-pointer"
            icon="proicons:panel-left-expand"
            width="28"
            height="28"
            color="#767676"
          />
          <Divider />
          <Popover content="新对话" title={null} placement="right">
            <div
              onClick={newChat}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#4d6bfe]"
            >
              <Icon icon="tabler:message-plus" width="20" height="20" />
            </div>
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
            <Icon
              onClick={close}
              className="cursor-pointer"
              icon="proicons:panel-right-expand"
              width="28"
              height="28"
              color="#767676"
            />
            <div
              onClick={newChat}
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-[#4d6bfe] px-3 py-2 text-sm hover:!bg-[#4166d5]"
            >
              <Icon icon="tabler:message-plus" width="20" height="20" />
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
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              className="mt-32"
              description="暂无会话"
            />
          )}
        </div>
      )}
      {contextHolder}
    </div>
  );
};

export default SliderBar;
