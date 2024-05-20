import { useAppSelector } from '../../app/hooks';
import { OpenLanguageModalButton } from '../language-selection/OpenLanguageModalButton';

export const FooterSelectLanguageButton = () => {
  const text = useAppSelector((state) => state.language.language.text);

  return (
    <OpenLanguageModalButton
      text={text}
      sx={{
        width: 130,
        color: 'white',
        background: 'none',
        outline: '1px solid white',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.05)',
        },
      }}
    />
  );
};
