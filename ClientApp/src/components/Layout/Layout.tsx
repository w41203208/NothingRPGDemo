import React from 'react';
import { BaseProps } from '../type';
import { classNames } from '../uitl';

interface LayoutProps extends BaseProps {
  children?: React.ReactNode;
}

export const Layout = ({ children, className }: LayoutProps) => {
  const cls = classNames(className);
  return (
    <>
      <section className={cls}>{children}</section>
    </>
  );
};
