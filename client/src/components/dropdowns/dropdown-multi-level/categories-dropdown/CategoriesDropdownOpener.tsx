import { MainDropdownOpener } from '../../dropdown-openers/MainDropdownOpener';
import { Dropdown } from './Dropdown';
import { Opener } from './Opener';

// FIX: I noticed a bug when zooming out enough on the page. Error margin increases in positioning the dropdown submenus and the hovering wont work properly. Potential fix is to use similiar positioning as in the newer broad selection of courses popover card.

// NOTE: Hovering works but positioning is still off (few pixels vertically) if zooming enough in or out.

// TODO: Maybe the context should pass positioning data? Check this later if necessary.

// This system is quite complex so I added an explanation.

// The categories button in the app bar is a render component "Opener" which is the visual part to open the categories menu.
// On hover the menus (passed as a child here) state changes to open and is shown as a portaled item (outside of child hierarchy into the dom root body).
// Each item in the dropdown itself is a dropdown opener aswell and will render a new dropdown if the items data contains one.
// The same logic continues recursively as long as the new dropdowns have submenu data.

// The child submenus can close this menu via context.
// This component has isMainDropdown boolean set to true and the child dropdowns dont.
// The boolean is used to prevent the recursive child dropdowns creating a new context for their children (essentially overriding the first one).

// As portaled items the dropdowns are positioned absolutely in relation to the element which "spawned" them.
// For this first menu it is the opener button.
// For the submenus it is the button which spawned them.
// That is why the submenus need custom offset upwards depending on their index to position them correctly alongside the first menu.

export const CategoriesDropdownOpener = () => {
  return (
    <MainDropdownOpener
      RenderComponent={Opener}
      forceOpen={false}
      usePortal={true}
      isMainDropdown={true}
      renderPosition="right"
      anchorpoint="bottom-left"
    >
      <Dropdown />
    </MainDropdownOpener>
  );
};
