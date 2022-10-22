import React from 'react';
import { BaseProps } from '../type';
import { classNames } from '../uitl';

interface ModalContentProps extends BaseProps {
  children?: React.ReactNode;
}

export const ModalContent = ({ children, className }: ModalContentProps) => {
  const cls = classNames(className);
  return (
    <>
      <section className={cls}>{children}</section>
    </>
  );
};
