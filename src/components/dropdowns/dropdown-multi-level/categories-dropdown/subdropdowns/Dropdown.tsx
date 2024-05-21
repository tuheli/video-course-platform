import { type MenuItem } from '../../../../../../data/menuItemsData';
import { Paper } from '@mui/material';
import { CategoriesSubdropdownItem } from './CategoriesSubdropdownOpener';

export const Dropdown = ({ menuItem }: { menuItem: MenuItem }) => {
  return (
    <Paper
      sx={{
        p: 0,
        m: 0,
        width: 240,
        height: 400,
      }}
    >
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {menuItem.submenu?.map((submenu, index) => {
          return (
            <CategoriesSubdropdownItem
              key={index}
              menuItem={submenu}
              listIndex={index}
            />
          );
        })}
      </ul>
    </Paper>
  );
};
