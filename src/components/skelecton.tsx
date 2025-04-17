import { Skeleton } from 'antd';
import { FunctionComponent } from 'react';

// 骨架屏
const SkeletonFC: FunctionComponent = () => {
  return (
    <>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </>
  );
};

export default SkeletonFC;
