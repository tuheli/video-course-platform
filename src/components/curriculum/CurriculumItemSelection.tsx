import { useState } from 'react';
import { AddCurriculumItemButton } from './AddCurriculumItemButton';
import { CurriculumItemOptions } from './CurriculumItemOptions';

export const CurriculumItemSelection = () => {
  const [animateCloseIconBack, setAnimateCloseIconBack] = useState(false);
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);

  const onItemOptionsClose = () => {
    setAnimateCloseIconBack(true);
    setIsSelectionVisible(false);
  };

  return (
    <>
      {!isSelectionVisible && (
        <AddCurriculumItemButton
          setOptionsVisibility={setIsSelectionVisible}
          animateIconBack={animateCloseIconBack}
        />
      )}
      {isSelectionVisible && (
        <CurriculumItemOptions setVisibility={onItemOptionsClose} />
      )}
    </>
  );
};
