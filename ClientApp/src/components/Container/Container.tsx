import { classNames } from '../uitl';
import React from 'react';
import { BaseProps } from '../type';

interface ContainerProps extends BaseProps {
  children?: React.ReactNode;
}

export const Container = ({ children, className }: ContainerProps) => {
  const cls = classNames({
    [`container`]: 1,
    [`${className}`]: !!className,
  });
  return (
    <>
      <div className={cls}>{children}</div>
    </>
  );
};
