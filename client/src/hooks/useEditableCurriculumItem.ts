import { useEffect, useState } from 'react';

export const useEditableCurriculumItem = () => {
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    setIsMouseOver(false);
  }, []);

  const onMouseEnter = () => {
    setIsMouseOver(true);
  };

  const onMouseLeave = () => {
    setIsMouseOver(false);
  };

  return {
    isEditingHeading,
    isMouseOver,
    onMouseEnter,
    onMouseLeave,
    setIsEditingHeading,
  };
};
