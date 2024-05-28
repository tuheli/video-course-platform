import { Box, Stack, Typography, styled } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export interface SubmissionCheckItemProps {
  isReadyForSubmission: boolean;
}

interface SidebarItemProps extends SubmissionCheckItemProps {
  text: string;
  linkTo: string;
  locationEndsWith: string;
}

export const SidebarItem = ({
  text,
  linkTo,
  locationEndsWith,
  isReadyForSubmission,
}: SidebarItemProps) => {
  const [isActiveBarVisible, setIsActiveBarVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.endsWith(locationEndsWith)) {
      setIsActiveBarVisible(true);
      return;
    }

    setIsActiveBarVisible(false);
  }, [location]);

  return (
    <StyledRouterLink
      to={linkTo}
      sx={{
        display: 'flex',
        textDecoration: 'none',
        color: 'text.primary',
        width: '100%',
      }}
    >
      <Stack
        sx={{
          bgcolor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          pr: 1,
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: 4,
            height: '100%',
            bgcolor: isActiveBarVisible ? 'text.primary' : undefined,
          }}
        />
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            p: 1,
            pl: 0,
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            {isReadyForSubmission && <CheckCircleOutlineIcon />}
            {!isReadyForSubmission && <RadioButtonUncheckedIcon />}
          </Box>
          <Typography variant="body2">{text}</Typography>
        </Stack>
      </Stack>
    </StyledRouterLink>
  );
};

const StyledRouterLink = styled(Link)({});
