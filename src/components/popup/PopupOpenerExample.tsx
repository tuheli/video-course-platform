import { Box } from '@mui/material';
import { PopupOpener } from './PopupOpener';
import '../../components/dropdowns/animations/fadeAnimation.css';

const childSize = {
  width: 300,
  height: 300,
};

const openerSize = {
  width: 100,
  height: 100,
};

const openerOffset = {
  top: 200,
  left: 300,
};

export const PopupOpenerExample = () => {
  return (
    <PopupOpener
      childSize={{
        width: childSize.width,
        height: childSize.height,
      }}
      sx={{
        top: openerOffset.top,
        left: openerOffset.left,
        width: openerSize.width,
        height: openerSize.height,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'gray',
          width: childSize.width,
          height: childSize.height,
          animation: 'fadeIn 0.5s',
        }}
      >
        1 Hey Im the child thing that opens ie. the dropdown content
      </Box>
    </PopupOpener>
  );
};
