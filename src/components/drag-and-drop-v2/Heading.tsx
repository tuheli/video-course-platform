import { Box, Stack, Typography } from '@mui/material';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { DeleteButton } from '../curriculum/DeleteButton';
import { EditButton } from '../curriculum/EditButton';
import { MouseEvent } from 'react';

interface HeadingProps {
  itemName: 'Section' | 'Lecture';
  title: string;
  isTitleBold?: boolean;
  index: number;
  isHeadingIconsVisible: boolean;
  setIsEditingHeading: (isVisible: boolean) => void;
  onClickDeleteIcon: () => void;
}

export const Heading = ({
  itemName,
  title,
  isTitleBold,
  index,
  isHeadingIconsVisible,
  setIsEditingHeading,
  onClickDeleteIcon,
}: HeadingProps) => {
  const onClickEditIcon = (event: MouseEvent) => {
    event.stopPropagation();
    setIsEditingHeading(true);
  };

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 1,
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: isTitleBold ? 600 : 400,
          }}
        >
          {itemName} {index + 1}:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <NoteOutlinedIcon
            sx={{
              transform: 'scaleX(0.63)',
              fontSize: 21,
            }}
          />
        </Box>
        {title && <Typography>{title}</Typography>}
        {isHeadingIconsVisible && (
          <>
            <EditButton onClick={onClickEditIcon} />
            <Box
              sx={{
                marginRight: 'auto',
              }}
            >
              <DeleteButton onClick={onClickDeleteIcon} />
            </Box>
          </>
        )}
      </Stack>
    </Stack>
  );
};
