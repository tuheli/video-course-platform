import { ReactNode } from 'react';

// NOTE: The initial reason for creating
// this component was  was to give visual feedback
// about the new placement of drag and drop
// items

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
