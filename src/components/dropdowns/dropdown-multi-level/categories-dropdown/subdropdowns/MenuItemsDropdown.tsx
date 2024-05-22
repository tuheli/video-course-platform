import { MainDropdownOpener } from '../../../dropdown-openers/MainDropdownOpener';
import { Dropdown } from '../Dropdown';
import { Opener } from '../Opener';

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
