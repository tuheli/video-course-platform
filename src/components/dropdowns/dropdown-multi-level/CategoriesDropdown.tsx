import { categoriesData } from './categoriesData';
import { MenuItems } from './MenuItems';
import { OuterMenuItemsList } from '../styled/OuterMenuItemsList';
import { TextDropdownOpener } from '../dropdown-openers/TextDropdownOpener';

export const CategoriesDropdown = () => {
  return (
    <TextDropdownOpener text="Categories">
      <OuterMenuItemsList>
        {categoriesData.map((menuItem, index) => {
          return <MenuItems key={index} menuItem={menuItem} depthLevel={1} />;
        })}
      </OuterMenuItemsList>
    </TextDropdownOpener>
  );
};
