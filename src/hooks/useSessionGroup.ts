import { useEffect, useState } from 'react';

interface Session {
  id: string;
  session_name: string;
  created_time: string;
  // 其他字段...
}

interface SessionGroup {
  label: string; // "今天" | "7天内" | "30天内" | "2025年03月"
  list: Session[];
}

// 生成动态分类的 sessionGroups
export const useSessionGroups = (sessions: Session[]) => {
  const [sessionGroups, setSessionGroups] = useState<SessionGroup[]>([]);

  useEffect(() => {
    if (sessions.length === 0) {
      setSessionGroups([]);
      return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const groups: SessionGroup[] = [
      { label: '今天', list: [] },
      { label: '7天内', list: [] },
      { label: '30天内', list: [] },
    ];

    // 按月份存储的组（动态生成，如 "2025年03月"）
    const monthGroups: Record<string, SessionGroup> = {};

    sessions.forEach((session) => {
      const sessionDate = new Date(session.created_time);
      const sessionMonth = `${sessionDate.getFullYear()}年${(sessionDate.getMonth() + 1).toString().padStart(2, '0')}月`;

      if (sessionDate >= today) {
        groups[0].list.push(session); // 今天
      } else if (sessionDate >= sevenDaysAgo) {
        groups[1].list.push(session); // 7天内
      } else if (sessionDate >= thirtyDaysAgo) {
        groups[2].list.push(session); // 30天内
      } else {
        // 更早的按月份分组
        if (!monthGroups[sessionMonth]) {
          monthGroups[sessionMonth] = { label: sessionMonth, list: [] };
        }
        monthGroups[sessionMonth].list.push(session);
      }
    });

    // 合并所有分组（过滤空组 + 按时间倒序）
    const mergedGroups = [
      ...groups.filter((group) => group.list.length > 0),
      ...Object.values(monthGroups).sort((a, b) => {
        // 按月份倒序排列（最新的月份在前）
        return b.label.localeCompare(a.label);
      }),
    ];

    setSessionGroups(mergedGroups);
  }, [sessions]);

  return sessionGroups;
};
