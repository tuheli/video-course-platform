import { MainDropdownOpener } from '../../dropdown-openers/MainDropdownOpener';
import { Opener } from './Opener';
import { Dropdown } from './Dropdown';

export const linkTo = '/teaching';

export const TeachDropdown = () => {
  return (
    <MainDropdownOpener
      RenderComponent={Opener}
      forceOpen={false}
      usePortal={true}
      renderPosition="below"
      anchorpoint="bottom-right-end"
    >
      <Dropdown />
    </MainDropdownOpener>
  );
};
