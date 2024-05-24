import { MainDropdownOpener } from '../../dropdown-openers/MainDropdownOpener';
import { Opener } from './Opener';
import { Dropdown } from './Dropdown';
import { UserAvatarProps } from '../../../me/UserAvatar';

export const UserAvatarDropdown = ({ sx }: UserAvatarProps) => {
  return (
    <MainDropdownOpener
      RenderComponent={() => Opener({ sx })}
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
