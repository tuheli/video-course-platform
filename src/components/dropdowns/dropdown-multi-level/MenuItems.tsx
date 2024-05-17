import { type MenuItem } from './categoriesData';
import { useRef, useState } from 'react';
import { InnerMenuItemsList } from '../styled/InnerMenuItemsList';
import { StyledMenuItemLink } from '../styled/StyledMenuItemLink';
import { Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { useClickAwayListener } from '../../../hooks/useClickAwayListener';
import { useHover } from '../dropdown-openers/MainDropdownOpener';
import { useDropdownContext } from '../../../hooks/useDropdownContext';

interface MenuItemProps {
  menuItem: MenuItem;
  depthLevel: number;
}

export const MenuItems = ({ menuItem, depthLevel }: MenuItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHoveringLastDepthLink, setIsHoveringLastDepthLink] = useState(false);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const { closeMainDropdown } = useDropdownContext();

  const onClickMenuItem = () => {
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

  const onClickAway = () => {
    setIsDropdownOpen(false);
  };

  const onMouseEnterLastDepthLink = () => {
    setIsHoveringLastDepthLink(true);
  };

  const onMouseLeaveLastDepthLink = () => {
    setIsHoveringLastDepthLink(false);
  };

  useClickAwayListener(itemRef, isDropdownOpen, useHover, onClickAway);

  return (
    <li ref={itemRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {menuItem.submenu ? (
        <>
          <StyledMenuItemLink
            onClick={onClickMenuItem}
            sx={{
              padding: '8px 16px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1,
                color: isDropdownOpen ? 'secondary.main' : 'text.secondary',
                '&:hover': {
                  color: 'secondary.main',
                },
              }}
            >
              {menuItem.title}
            </Typography>
            <ChevronRight
              fontSize="small"
              sx={{
                color: 'text.secondary',
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
                  />
                );
              })}
            </InnerMenuItemsList>
          )}
        </>
      ) : (
        <StyledMenuItemLink
          onClick={onClickMenuItem}
          onMouseEnter={onMouseEnterLastDepthLink}
          onMouseLeave={onMouseLeaveLastDepthLink}
          sx={{
            padding: '8px 16px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isHoveringLastDepthLink
                ? 'secondary.main'
                : 'text.secondary',
              '&:hover': {
                color: 'secondary.main',
              },
            }}
          >
            {menuItem.title}
          </Typography>
        </StyledMenuItemLink>
      )}
    </li>
  );
};
