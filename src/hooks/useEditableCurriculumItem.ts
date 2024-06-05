import { useState } from 'react';

export const useEditableCurriculumItem = () => {
  const [isHeadingVisible, setIsHeadingPartVisible] = useState(true);
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const [isEditButtonVisible, setIsEditSectionButtonVisible] = useState(false);
  const [areChildrenVisible, setAreChildrenVisible] = useState(false);

  const onMouseEnter = () => {
    setIsDeleteButtonVisible(true);
    setIsEditSectionButtonVisible(true);
    setAreChildrenVisible(true);
  };

  const onMouseLeave = () => {
    setIsDeleteButtonVisible(false);
    setIsEditSectionButtonVisible(false);
    setAreChildrenVisible(false);
  };

  const changeHeadingVisibility = (isVisible: boolean) => {
    setIsHeadingPartVisible(isVisible);
  };

  return {
    isHeadingVisible,
    isDeleteButtonVisible,
    isEditButtonVisible,
    areChildrenVisible,
    onMouseEnter,
    onMouseLeave,
    changeHeadingVisibility,
  };
};
