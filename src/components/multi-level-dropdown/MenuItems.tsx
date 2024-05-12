import { useEffect, useRef, useState } from 'react';
import { type MenuItem } from './categoriesData';
import { listHeight, listWidth, paddingTop } from './CategoriesDropdown';

interface MenuItemProps {
  menuItem: MenuItem;
  closeMainDropdown: () => void;
}

const useHover = true;

export const MenuItems = ({ menuItem, closeMainDropdown }: MenuItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemRef = useRef<HTMLLIElement | null>(null);

  const onClickButton = () => {
    closeMainDropdown();
  };

  const onMouseEnter = () => {
    if (!useHover) return;
    setIsDropdownOpen(true);
  };

  const onMouseLeave = () => {
    if (!useHover) return;
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const clickAwayListener = (event: any) => {
      if (
        isDropdownOpen &&
        itemRef.current &&
        !itemRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (useHover) return;

    document.addEventListener('mousedown', clickAwayListener);
    document.addEventListener('touchstart', clickAwayListener);

    return () => {
      document.removeEventListener('mousedown', clickAwayListener);
      document.removeEventListener('touchstart', clickAwayListener);
    };
  }, [isDropdownOpen]);

  return (
    <li ref={itemRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {menuItem.submenu ? (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 4,
              paddingRight: 4,
            }}
          >
            <button
              type="button"
              onClick={onClickButton}
              style={{
                backgroundColor: isDropdownOpen ? 'khaki' : '',
              }}
            >
              {menuItem.title}
            </button>
            <div
              style={{
                flexGrow: 1,
              }}
            />
            <div>{`>`}</div>
          </div>
          {isDropdownOpen && (
            <ul
              style={{
                listStyleType: 'none',
                position: 'absolute',
                top: 0,
                left: listWidth,
                padding: 0,
                paddingTop: paddingTop,
                margin: 0,
                height: listHeight,
                width: listWidth,
                backgroundColor: 'lightblue',
              }}
            >
              {menuItem.submenu.map((submenu, index) => {
                return (
                  <MenuItems
                    key={index}
                    menuItem={submenu}
                    closeMainDropdown={closeMainDropdown}
                  />
                );
              })}
            </ul>
          )}
        </>
      ) : (
        <button onClick={onClickButton}>{menuItem.title}</button>
      )}
    </li>
  );
};
