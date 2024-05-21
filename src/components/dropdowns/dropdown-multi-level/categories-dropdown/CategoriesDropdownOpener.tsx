import { MainDropdownOpener } from '../../dropdown-openers/MainDropdownOpener';
import { Dropdown } from './Dropdown';
import { Opener } from './Opener';

// FIX: I noticed a bug when zooming out enough on the page. Error margin increases in positioning the dropdown submenus and the hovering wont work properly. Potential fix is to use similiar positioning as in the newer broad selection of courses popover card.

// NOTE: Hovering works but positioning is still off (few pixels vertically) if zooming enough in or out.

export const CategoriesDropdownOpener = () => {
  return (
    <MainDropdownOpener
      RenderComponent={Opener}
      forceOpen={false}
      usePortal={true}
      renderPosition="right"
      anchorpoint="bottom-left"
    >
      <Dropdown />
    </MainDropdownOpener>
  );
};

export const MenuItemsDropdown = () => {
  return (
    <MainDropdownOpener
      RenderComponent={Opener}
      forceOpen={true}
      usePortal={true}
      renderPosition="below"
    >
      <Dropdown />
    </MainDropdownOpener>
  );
};
