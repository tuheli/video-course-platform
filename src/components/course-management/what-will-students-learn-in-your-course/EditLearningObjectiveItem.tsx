import { useAppDispatch } from '../../../app/hooks';
import {
  TextWithId,
  updatedLearningObjective,
} from '../../../features/courseDraftsSlice';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { ChangeEvent } from 'react';

interface EditLearningObjectiveItemProps {
  courseDraftId: string;
  learningObjective: TextWithId;
}

export const EditLearningObjectiveItem = ({
  courseDraftId,
  learningObjective,
}: EditLearningObjectiveItemProps) => {
  const dispatch = useAppDispatch();

  const placeholder =
    learningObjective.text.length > 0
      ? learningObjective.text
      : 'Example: Define the roles and responsibilities of a project manager';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedLearningObjective({
        courseDraftId,
        learningObjectiveId: learningObjective.id,
        text: event.target.value,
      })
    );
  };

  return (
    <InputFieldWithMaxCharacters
      onChange={onChange}
      maxInputLength={160}
      placeholder={placeholder}
      value={learningObjective.text}
    />
  );
};
