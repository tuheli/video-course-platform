import { MainDropdownOpener } from '../../dropdowns/dropdown-openers/MainDropdownOpener';
import { Dropdown } from './Dropdown';
import { Opener } from './Opener';

export const SelectCourseOrder = () => {
  return (
    <MainDropdownOpener
      RenderComponent={Opener}
      forceOpen={false}
      usePortal={true}
      isMainDropdown={true}
      anchorpoint="bottom-left"
    >
      <Dropdown />
    </MainDropdownOpener>
  );
};
