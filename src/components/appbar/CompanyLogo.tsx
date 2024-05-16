import { Box } from '@mui/material';

export const CompanyLogo = () => {
  return (
    <a
      href="/"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        component="img"
        src="/company-logos/logoipsum-317.svg"
        sx={{
          maxHeight: '1.3rem',
          cursor: 'pointer',
        }}
      />
    </a>
  );
};
