import { type MenuItem } from './categoriesData';
import { useRef, useState } from 'react';
import { InnerMenuItemsList } from './StyledMenuItemsList';
import { StyledMenuItemLink } from './StyledMenuItemLink';
import { Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { useHover } from './CategoriesDropdown';

interface MenuItemProps {
  menuItem: MenuItem;
  depthLevel: number;
  closeMainDropdown: () => void;
}

export const MenuItems = ({
  menuItem,
  depthLevel,
  closeMainDropdown,
}: MenuItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemRef = useRef<HTMLLIElement | null>(null);

  const onClickButton = () => {
    if (useHover) {
      closeMainDropdown();
    }

    if (menuItem.submenu) {
      setIsDropdownOpen(true);
    } else {
      closeMainDropdown();
    }
  };

  const onMouseEnter = () => {
    if (!useHover) return;
    setIsDropdownOpen(true);
  };

  const onMouseLeave = () => {
    if (!useHover) return;
    setIsDropdownOpen(false);
  };

  return (
    <li ref={itemRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {menuItem.submenu ? (
        <>
          <StyledMenuItemLink onClick={onClickButton}>
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1,
              }}
            >
              {menuItem.title}
            </Typography>
            <ChevronRight
              fontSize="small"
              sx={{
                color: 'black',
              }}
            />
          </StyledMenuItemLink>
          {isDropdownOpen && (
            <InnerMenuItemsList depthLevel={depthLevel}>
              {menuItem.submenu.map((submenu, index) => {
                return (
                  <MenuItems
                    key={index}
                    menuItem={submenu}
                    depthLevel={depthLevel + 1}
                    closeMainDropdown={closeMainDropdown}
                  />
                );
              })}
            </InnerMenuItemsList>
          )}
        </>
      ) : (
        <StyledMenuItemLink onClick={onClickButton}>
          <Typography variant="body2">{menuItem.title}</Typography>
        </StyledMenuItemLink>
      )}
    </li>
  );
};
