import { useCurriculumSectionContext } from '../../hooks/useCurriculumSectionContext';
import { useEnableActionTimer } from '../../hooks/useEnableActionTimer';
import { AddMoreButtonDarkVariant } from '../manage-course-goals-page/AddMoreButtonDarkVariant';
import { animationDurationSeconds } from './common';

interface AddItemButtonProps {
  setOptionsVisibility: (isVisible: boolean) => void;
  animateIconBack: boolean;
}

export const AddItemButton = ({
  animateIconBack,
  setOptionsVisibility,
}: AddItemButtonProps) => {
  const { isEnabled } = useEnableActionTimer(animationDurationSeconds * 1000);
  const { setEditingItemType, setIsOptionsAnimationEnabled } =
    useCurriculumSectionContext();

  const isClickAllowed = animateIconBack ? isEnabled : true;

  const onClick = () => {
    if (!isClickAllowed) return;
    setEditingItemType(undefined);
    setIsOptionsAnimationEnabled(true);
    setOptionsVisibility(true);
  };

  return (
    <AddMoreButtonDarkVariant
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
    />
  );
};
