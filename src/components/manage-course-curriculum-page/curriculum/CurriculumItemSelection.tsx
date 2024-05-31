import { useState } from 'react';
import { AddCurriculumItemButton } from './AddCurriculumItemButton';
import { CurriculumItemOptions } from './CurriculumItemOptions';

export const CurriculumItemSelection = () => {
  const [animateIconBack, setAnimateIconBack] = useState(false);
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);

  const onItemOptionsClose = () => {
    setAnimateIconBack(true);
    setIsSelectionVisible(false);
  };

  return (
    <>
      {!isSelectionVisible && (
        <AddCurriculumItemButton
          setOptionsVisibility={setIsSelectionVisible}
          animateIconBack={animateIconBack}
        />
      )}
      {isSelectionVisible && (
        <CurriculumItemOptions setVisibility={onItemOptionsClose} />
      )}
    </>
  );
};
