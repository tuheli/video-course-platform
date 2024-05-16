import { categoriesData } from './categoriesData';
import { MenuItems } from './MenuItems';
import { OuterMenuItemsList } from '../styled/OuterMenuItemsList';
import { TextDropdownOpener } from '../dropdown-openers/TextDropdownOpener';

// FIX: I noticed a bug when zooming out enough on the page. Error margin increases in positioning the dropdown submenus and the hovering wont work properly. Potential fix is to use similiar positioning as in the newer broad selection of courses popover card.

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
