import { MainDropdownOpener } from '../../dropdown-openers/MainDropdownOpener';
import { Dropdown } from './Dropdown';
import { Opener } from './Opener';

export const linkTo = '/';

export const BusinessDropdown = () => {
  return (
    <MainDropdownOpener
      RenderComponent={Opener}
      forceOpen={false}
      usePortal={true}
      isMainDropdown={true}
      renderPosition="below"
      anchorpoint="bottom-right-end"
    >
      <Dropdown />
    </MainDropdownOpener>
  );
};
