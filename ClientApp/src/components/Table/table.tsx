import React from 'react';
import { BaseProps } from '../type';

interface TableProps extends BaseProps {
  children?: React.ReactNode;
  field?: Array<{}>;
}

export const Table: React.FC<TableProps> = ({
  children,
  className,
  field,
  ...restProps
}) => {
  return (
    <>
      <thead>
        <tr></tr>
      </thead>
    </>
  );
};
