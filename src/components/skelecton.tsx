import { Skeleton } from 'antd';
import { FunctionComponent } from 'react';

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
