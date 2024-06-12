import { MainDropdownOpener } from '../../dropdown-openers/MainDropdownOpener';
import { Dropdown } from './Dropdown';
import { Opener } from './Opener';

export const StudentDropdown = () => {
  return (
    <MainDropdownOpener
      RenderComponent={Opener}
      forceOpen={false}
      usePortal={true}
      isMainDropdown={true}
      renderPosition="below"
      anchorpoint="bottom-right-end"
      openerContainerSx={{
        display: 'flex',
        height: 40,
      }}
    >
      <Dropdown />
    </MainDropdownOpener>
  );
};
