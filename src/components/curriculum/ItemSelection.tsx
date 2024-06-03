import { useState } from 'react';
import { AddItemButton } from './AddItemButton';
import { ItemOptions } from './ItemOptions';

export const ItemSelection = () => {
  const [animateCloseIconBack, setAnimateCloseIconBack] = useState(false);
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);

  const onItemOptionsClose = () => {
    setAnimateCloseIconBack(true);
    setIsSelectionVisible(false);
  };

  return (
    <>
      {!isSelectionVisible && (
        <AddItemButton
          setOptionsVisibility={setIsSelectionVisible}
          animateIconBack={animateCloseIconBack}
        />
      )}
      {isSelectionVisible && <ItemOptions setVisibility={onItemOptionsClose} />}
    </>
  );
};
