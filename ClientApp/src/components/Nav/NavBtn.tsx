import React from 'react';
import { NavLink } from 'react-router-dom';
import { BaseProps } from '../type';
import { classNames } from '../uitl';

import styles from './NavMenu.module.css';

interface NavButtonProps extends BaseProps {
  text: string;
  path: string;
  children?: React.ReactNode;
}

export const NavButton: React.FC<NavButtonProps> = ({
  text,
  path,
  children,
  className,
}) => {
  const cls = classNames(className);
  return (
    <>
      <NavLink to={path}>
        <li className={styles.NavLink}>
          {children}
          <p className={styles.NavLinkName}>{text}</p>
        </li>
      </NavLink>
    </>
  );
};
