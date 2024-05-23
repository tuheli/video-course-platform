import { MainDropdownOpener } from '../../dropdown-openers/MainDropdownOpener';
import { Opener } from './Opener';
import { Dropdown } from './Dropdown';

export const UserAvatarDropdown = () => {
  return (
    <MainDropdownOpener
      RenderComponent={Opener}
      forceOpen={true}
      usePortal={true}
      isMainDropdown={true}
      renderPosition="below"
      anchorpoint="bottom-right-end"
    >
      <Dropdown />
    </MainDropdownOpener>
  );
};
