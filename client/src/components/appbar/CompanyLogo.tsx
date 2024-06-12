import { Box } from '@mui/material';

interface CompanyLogoProps {
  isWhite?: boolean;
}

export const CompanyLogo = ({ isWhite }: CompanyLogoProps) => {
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
          filter: isWhite ? 'brightness(10)' : 'none',
          WebkitFilter: isWhite ? 'brightness(10)' : 'none',
        }}
      />
    </a>
  );
};
