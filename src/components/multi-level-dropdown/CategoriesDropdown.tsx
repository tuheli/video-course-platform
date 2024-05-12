import { useRef, useState } from 'react';
import { categoriesData } from './categoriesData';
import { MenuItems } from './MenuItems';
import './fadeAnimation.css';

export const listWidth = 240;
export const listHeight = 240;
export const listItemHeight = 26;
export const paddingTop = 10;
const topOffset = 46;

export const CategoriesDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const onMouseEnterCategories = () => {
    setIsDropdownOpen(true);
  };

  const onMouseLeaveDropdown = () => {
    setIsDropdownOpen(false);
  };

  const closeMainDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      ref={divRef}
      onMouseLeave={onMouseLeaveDropdown}
      style={{
        position: 'relative',
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        height: 50,
      }}
    >
      <button onMouseEnter={onMouseEnterCategories}>Categories</button>
      {isDropdownOpen && (
        <ul
          style={{
            listStyleType: 'none',
            position: 'absolute',
            top: topOffset,
            left: 0,
            padding: 0,
            paddingTop: paddingTop,
            margin: 0,
            width: listWidth,
            height: listHeight,
            backgroundColor: 'lightblue',
            animation: 'fadeIn 0.2s',
            outline: '1px solid black',
          }}
        >
          {categoriesData.map((menuItem, index) => {
            return (
              <MenuItems
                key={index}
                menuItem={menuItem}
                closeMainDropdown={closeMainDropdown}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
