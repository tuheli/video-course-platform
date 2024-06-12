import { ReactNode } from 'react';

// NOTE: The initial reason for creating
// this component was  was to give visual feedback
// about the new placement of drag and drop
// items

// The animation timings are hard coded in the css
// file. In order for the borders to animate
// nicely with any rectangle the values need
// to be calulated using the elements size.
// Current durations are set for input fields
// used in course management page.
// If needed create a hook for dynamic durations.

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
