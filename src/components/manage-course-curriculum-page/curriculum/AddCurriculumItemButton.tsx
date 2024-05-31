import { useEnableActionTimer } from '../../../hooks/useEnableActionTimer';
import { AddMoreButton } from '../../manage-course-goals-page/AddMoreButton';
import { animationDurationSeconds } from './common';

interface AddCurriculumItemButtonProps {
  setOptionsVisibility: (isVisible: boolean) => void;
  animateIconBack: boolean;
}

export const AddCurriculumItemButton = ({
  animateIconBack,
  setOptionsVisibility,
}: AddCurriculumItemButtonProps) => {
  const { isEnabled } = useEnableActionTimer(animationDurationSeconds * 1000);

  const isClickAllowed = animateIconBack ? isEnabled : true;

  const onClick = () => {
    if (!isClickAllowed) return;
    setOptionsVisibility(true);
  };

  return (
    <AddMoreButton
      addIconContainerSx={
        animateIconBack
          ? {
              animation: `closeIconMoveAnimation ${animationDurationSeconds}s ease-in forwards`,
              animationDirection: 'reverse',
            }
          : {}
      }
      addIconSx={
        animateIconBack
          ? {
              animation: `closeIconRollAnimation ${animationDurationSeconds}s ease-in forwards`,
              animationDirection: 'reverse',
            }
          : {}
      }
      text="Curriculum item"
      onClick={onClick}
      sx={{
        pl: 1,
        border: '1px solid',
        borderColor: 'text.primary',
        color: 'text.primary',
        bgcolor: 'background.default',
        '&:hover': {
          bgcolor: 'background.paperDarker',
          cursor: 'pointer',
        },
      }}
    />
  );
};
