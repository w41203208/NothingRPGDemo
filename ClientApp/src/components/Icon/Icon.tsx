import React from 'react';
import { BaseProps } from '../type';
import styles from './Icon.module.css';

interface IconProps extends BaseProps {
  imgSrc?: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export const Icon: React.FC<IconProps> = ({
  width,
  height,
  children,
  className,
  imgSrc,
  ...restProps
}) => {
  if (!imgSrc && !children) {
    console.log('input imgsrc in the Icon component!');
    return <></>;
  }
  const cls = className || `${styles.ImgOuter}`;
  return (
    <>
      <div className={cls} style={{ width, height }} {...restProps}>
        {children ? (
          children
        ) : (
          <img className={styles.Img} src={imgSrc} alt="" />
        )}
      </div>
    </>
  );
};
