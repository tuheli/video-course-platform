import { useEffect, useState } from 'react';
import { AddItemButton } from './AddItemButton';
import { ItemOptions } from './ItemOptions';
import { useDragAndDropContext } from '../../hooks/useDragAndDropContext';
import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';

export const ItemSelection = () => {
  const [animateCloseIconBack, setAnimateCloseIconBack] = useState(false);
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);
  useState(false);
  const { setIsOptionsAnimationEnabled } = useCurriculumSectionContext();
  const { isSomethingDragged } = useDragAndDropContext();

  const onItemOptionsClose = () => {
    setAnimateCloseIconBack(true);
    setIsSelectionVisible(false);
  };

  useEffect(() => {
    if (!isSomethingDragged) return;
    setIsOptionsAnimationEnabled(false);
  }, [isSomethingDragged]);

  return (
    <>
      {!isSelectionVisible && (
        <AddItemButton
          animateIconBack={animateCloseIconBack}
          setOptionsVisibility={setIsSelectionVisible}
        />
      )}
      {isSelectionVisible && <ItemOptions setVisibility={onItemOptionsClose} />}
    </>
  );
};
