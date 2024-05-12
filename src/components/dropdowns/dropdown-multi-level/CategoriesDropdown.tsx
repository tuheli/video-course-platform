import { categoriesData } from './categoriesData';
import { MenuItems } from './MenuItems';
import { MainDropdownOpener } from '../MainDropdownOpener';
import { OuterMenuItemsList } from '../styled/OuterMenuItemsList';

export const CategoriesDropdown = () => {
  return (
    <MainDropdownOpener text="Categories">
      <OuterMenuItemsList>
        {categoriesData.map((menuItem, index) => {
          return <MenuItems key={index} menuItem={menuItem} depthLevel={1} />;
        })}
      </OuterMenuItemsList>
    </MainDropdownOpener>
  );
};
