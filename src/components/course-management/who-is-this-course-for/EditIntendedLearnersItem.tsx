import { useAppDispatch } from '../../../app/hooks';
import {
  TextWithId,
  updatedIntendedLearners,
} from '../../../features/courseDraftsSlice';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { ChangeEvent } from 'react';

interface EditIntendedLearnersItemProps {
  courseDraftId: string;
  intendedLearners: TextWithId;
}

export const EditIntendedLearnersItem = ({
  courseDraftId,
  intendedLearners,
}: EditIntendedLearnersItemProps) => {
  const dispatch = useAppDispatch();

  const placeholder =
    intendedLearners.text.length > 0
      ? intendedLearners.text
      : 'Example: Beginner Python developers curious about data science';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedIntendedLearners({
        courseDraftId,
        intendedLearnersId: intendedLearners.id,
        text: event.target.value,
      })
    );
  };

  return (
    <InputFieldWithMaxCharacters
      onChange={onChange}
      placeholder={placeholder}
      value={intendedLearners.text}
    />
  );
};
