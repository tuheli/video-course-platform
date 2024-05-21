import { MainDropdownOpener } from '../../dropdown-openers/MainDropdownOpener';
import { Dropdown } from './Dropdown';
import { Opener } from './Opener';

export const CartDropdownOpener = () => {
  return (
    <MainDropdownOpener
      RenderComponent={Opener}
      forceOpen={true}
      usePortal={true}
      anchorpoint="bottom-right-end"
    >
      <Dropdown />
    </MainDropdownOpener>
  );
};
