import { Box } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { Language, changedLanguage } from '../../features/languageSlice';

interface LanguageRenderComponentProps {
  language: Language;
  closeModal: () => void;
}

export const SelectLanguageButton = ({
  language,
  closeModal,
}: LanguageRenderComponentProps) => {
  const dispatch = useAppDispatch();

  const onClickLanguage = () => {
    dispatch(changedLanguage(language));
    closeModal();
  };

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
        {language.name}
      </Box>
    </a>
  );
};
