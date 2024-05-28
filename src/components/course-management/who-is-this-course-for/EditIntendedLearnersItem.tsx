import { Stack } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  TextWithId,
  updatedIntendedLearners,
} from '../../../features/courseDraftsSlice';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { ChangeEvent, useState } from 'react';
import { DeleteIntendedLearnersButton } from './DeleteIndendedLearersButton';

interface EditIntendedLearnersItemProps {
  courseDraft: CourseDraft;
  intendedLearners: TextWithId;
}

export const EditIntendedLearnersItem = ({
  courseDraft,
  intendedLearners,
}: EditIntendedLearnersItemProps) => {
  const [isDeleteIconVisible, setIsDeleteIconVisble] = useState(false);
  const dispatch = useAppDispatch();

  const placeholder =
    intendedLearners.text.length > 0
      ? intendedLearners.text
      : 'Example: Beginner Python developers curious about data science';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedIntendedLearners({
        courseDraftId: courseDraft.id,
        intendedLearnersId: intendedLearners.id,
        text: event.target.value,
      })
    );
  };

  const onMouseEnter = () => {
    setIsDeleteIconVisble(true);
  };

  const onMouseLeave = () => {
    setIsDeleteIconVisble(false);
  };

  return (
    <Stack
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        flexDirection: 'row',
        width: 'fit-content',
      }}
    >
      <InputFieldWithMaxCharacters
        onChange={onChange}
        maxInputLength={160}
        placeholder={placeholder}
        value={intendedLearners.text}
      />
      {isDeleteIconVisible && (
        <DeleteIntendedLearnersButton
          courseDraft={courseDraft}
          intendedLearnersId={intendedLearners.id}
        />
      )}
    </Stack>
  );
};
