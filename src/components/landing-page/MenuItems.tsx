import { forwardRef, useEffect, useRef, useState } from 'react';
import { type MenuItem } from './categoriesData';
import { listHeight, listWidth } from './CategoriesPopover';

interface MenuItemProps {
  menuItem: MenuItem;
}

export const MenuItems = forwardRef<HTMLUListElement, MenuItemProps>(
  ({ menuItem }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const itemRef = useRef<HTMLLIElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const buttonText = menuItem.submenu
      ? `${menuItem.title} >`
      : menuItem.title;
    const useHover = true;

    const position =
      ref && typeof ref === 'object' && ref.current
        ? {
            top: ref.current.offsetTop,
            left: ref.current.offsetLeft,
          }
        : null;

    const onClickButton = () => {
      setIsDropdownOpen((prev) => !prev);
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
      const handler = (event: any) => {
        if (
          isDropdownOpen &&
          itemRef.current &&
          !itemRef.current.contains(event.target)
        ) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);

      return () => {
        document.removeEventListener('mousedown', handler);
        document.removeEventListener('touchstart', handler);
      };
    }, [isDropdownOpen]);

    return (
      <li ref={itemRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {menuItem.submenu ? (
          <>
            <button
              type="button"
              onClick={onClickButton}
              style={{
                backgroundColor: isDropdownOpen ? 'khaki' : '',
              }}
            >
              {buttonText}
            </button>
            {isDropdownOpen && (
              <ul
                ref={listRef}
                style={{
                  listStyleType: 'none',
                  position: 'absolute',
                  top: position?.top,
                  left: position?.left,
                  padding: 0,
                  margin: 0,
                  height: listHeight,
                  width: listWidth,
                }}
              >
                {menuItem.submenu.map((submenu, index) => {
                  return <MenuItems key={index} menuItem={submenu} ref={ref} />;
                })}
              </ul>
            )}
          </>
        ) : (
          <button>{buttonText}</button>
        )}
      </li>
    );
  }
);
