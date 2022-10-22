import { BaseProps } from '../type';
import { classNames } from '../uitl';

interface BackDropProps extends BaseProps {
  children?: React.ReactNode;
  position?: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export const BackDrop = ({
  children,
  className,
  position,
  onClick,
}: BackDropProps) => {
  const cls = classNames(className);
  const align =
    position === 'top'
      ? 'items-start'
      : position === 'center'
      ? 'items-center'
      : '';
  return (
    <>
      <section
        className={`top-0 absolute flex justify-center h-full w-full ${align} bg-black bg-opacity-50`}
        onClick={onClick}
      >
        {children}
      </section>
    </>
  );
};
