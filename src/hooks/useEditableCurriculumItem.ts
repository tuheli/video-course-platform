import { useState } from 'react';

export const useEditableCurriculumItem = () => {
  const [isHeadingPartVisible, setIsHeadingPartVisible] = useState(true);
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const [isEditButtonVisible, setIsEditSectionButtonVisible] = useState(false);

  const onMouseEnter = () => {
    setIsDeleteButtonVisible(true);
    setIsEditSectionButtonVisible(true);
  };

  const onMouseLeave = () => {
    setIsDeleteButtonVisible(false);
    setIsEditSectionButtonVisible(false);
  };

  const changeHeadingVisibility = (isVisible: boolean) => {
    setIsHeadingPartVisible(isVisible);
  };

  return {
    isHeadingPartVisible,
    isDeleteButtonVisible,
    isEditButtonVisible,
    onMouseEnter,
    onMouseLeave,
    changeHeadingVisibility,
  };
};
