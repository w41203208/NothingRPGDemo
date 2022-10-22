import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { BaseProps } from '../type';
import { classNames } from '../uitl';
import { BackDrop } from './BackDrop';

interface ModalProps extends BaseProps {
  children?: React.ReactNode;
  size?: string;
  onClose: Function;
}

export const Modal = ({ children, className, size, onClose }: ModalProps) => {
  const cls = classNames(className);
  const modalSize =
    size === 'lg' ? '500px' : size === 'base' ? '400px' : '500px';
  const portalTarget = document.body;
  const modalRef = useRef<HTMLElement>(null);

  const handleBackdropClick = (e: any) => {
    if (modalRef.current !== null) {
      if (!modalRef.current.contains(e.target)) {
        onClose();
      }
    }
  };

  return ReactDOM.createPortal(
    <>
      <BackDrop position="center" onClick={(e: any) => handleBackdropClick(e)}>
        <section className={cls} style={{ minWidth: modalSize }} ref={modalRef}>
          {children}
        </section>
      </BackDrop>
    </>,
    portalTarget
  );
};
