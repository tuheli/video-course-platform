import { ReactNode } from 'react';

interface BorderAnimationWrapperProps {
  children: ReactNode;
}

export const BorderAnimationWrapper = ({
  children,
}: BorderAnimationWrapperProps) => {
  return (
    <div className="border-animation-parent">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </div>
  );
};
