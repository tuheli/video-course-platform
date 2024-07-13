import { CategoriesSubdropdownItem } from './subdropdowns/CategoriesSubdropdownOpener';
import { getCourseCategoriesAsMenuItems } from '../../../../../data/menuItemsData';
import { Box, Paper } from '@mui/material';

export const Dropdown = () => {
  const menuItemsData = getCourseCategoriesAsMenuItems();

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: 'transparent',
      }}
    >
      <Paper
        sx={{
          height: 400,
          p: 0,
          m: 0,
          outline: 'none',
        }}
      >
        <ul
          style={{
            listStyleType: 'none',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            margin: 0,
            paddingLeft: 8,
          }}
        >
          {menuItemsData.map((menuItem, index) => {
            return (
              <CategoriesSubdropdownItem
                key={index}
                menuItem={menuItem}
                listIndex={index}
              />
            );
          })}
        </ul>
      </Paper>
    </Box>
  );
};
