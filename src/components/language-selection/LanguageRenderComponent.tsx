import { Box } from '@mui/material';

interface LanguageRenderComponentProps {
  language: string;
}
export const LanguageRenderComponent = ({
  language,
}: LanguageRenderComponentProps) => {
  // Language buttons dont need to know about the modal closing
  // Do something to change language settings
  const onClickLanguage = () => {};

  return (
    <a onClick={onClickLanguage}>
      <Box
        sx={{
          width: 140,
          py: 1,
          cursor: 'pointer',
          '&:hover': {
            color: 'secondary.main',
          },
        }}
      >
        {language}
      </Box>
    </a>
  );
};
