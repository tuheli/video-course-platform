import { useEffect, useState } from 'react';

export const useEditableCurriculumItem = (canReceiveMouseEvents: boolean) => {
  const [isHeadingVisible, setIsHeadingPartVisible] = useState(true);
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);
  const [isEditButtonVisible, setIsEditSectionButtonVisible] = useState(false);
  const [areChildrenVisible, setAreChildrenVisible] = useState(false);

  useEffect(() => {
    if (canReceiveMouseEvents) return;
    setIsDeleteButtonVisible(false);
    setIsEditSectionButtonVisible(false);
    setAreChildrenVisible(false);
  }, [canReceiveMouseEvents]);

  const onMouseEnter = () => {
    if (!canReceiveMouseEvents) return;
    setIsDeleteButtonVisible(true);
    setIsEditSectionButtonVisible(true);
    setAreChildrenVisible(true);
  };

  const onMouseLeave = () => {
    if (!canReceiveMouseEvents) return;
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
