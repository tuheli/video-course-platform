import { Button, Popover } from '@mui/material';
import { useRef, useState } from 'react';
import { categoriesData } from './categoriesData';
import { MenuItems } from './MenuItems';

export const listWidth = 300;
export const listHeight = 240;
export const listItemHeight = 26;

export const CategoriesPopover = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  );
  const listRef = useRef<HTMLUListElement | null>(null);

  const onClickCategories = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  return (
    <>
      {/* <Button variant="text" onClick={onClickCategories}>
        Categories
      </Button> */}
      <ul
        ref={listRef}
        style={{
          listStyleType: 'none',
          position: 'relative',
          padding: 0,
          margin: 0,
          width: listWidth,
          height: listHeight,
        }}
      >
        {categoriesData.map((menuItem, index) => {
          return <MenuItems key={index} menuItem={menuItem} ref={listRef} />;
        })}
      </ul>
    </>
  );
};
