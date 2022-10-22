import React from 'react';
import { BaseProps } from '../type';
import { classNames } from '../uitl';

interface NavListProps extends BaseProps {
  children?: React.ReactNode;
}

export const NavList = (props: NavListProps) => {
  const { children, className } = props;
  const cls = classNames(className);
  return (
    <>
      <ul className={cls}>{children}</ul>
    </>
  );
};
