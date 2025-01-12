import { type MenuItem } from '../../../../../../data/menuItemsData';
import { MainDropdownOpener } from '../../../dropdown-openers/MainDropdownOpener';
import { Opener } from './Opener';
import { Dropdown } from './Dropdown';

interface MenuItemProps {
  menuItem: MenuItem;
  listIndex: number;
}

export const CategoriesSubdropdownItem = ({
  menuItem,
  listIndex,
}: MenuItemProps) => {
  const customOffset = {
    top: -40 * listIndex,
    left: 0,
  };

  return (
    <MainDropdownOpener
      RenderComponent={({ isDropdownOpen }) => (
        <Opener
          text={menuItem.title}
          isDropdownOpen={isDropdownOpen}
          linkTo={menuItem.url}
        />
      )}
      forceOpen={false}
      usePortal={true}
      isMainDropdown={false}
      renderPosition="right"
      customOffset={customOffset}
      anchorpoint="top-right"
    >
      <>{menuItem.submenu ? <Dropdown menuItem={menuItem} /> : null}</>
    </MainDropdownOpener>
  );
};
