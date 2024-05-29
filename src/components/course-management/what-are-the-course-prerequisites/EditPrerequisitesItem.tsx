import { Stack } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import {
  CourseDraft,
  TextWithId,
  updatedText,
} from '../../../features/courseDraftsSlice';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { ChangeEvent, useState } from 'react';
import { DeletePrerequisiteButton } from './DeletePrerequisiteButton';

interface EditPrerequisitesItemProps {
  courseDraft: CourseDraft;
  prerequisite: TextWithId;
}

export const EditPrerequisitesItem = ({
  courseDraft,
  prerequisite,
}: EditPrerequisitesItemProps) => {
  const [isDeleteIconVisible, setIsDeleteIconVisble] = useState(false);
  const dispatch = useAppDispatch();

  const placeholder =
    prerequisite.text.length > 0
      ? prerequisite.text
      : 'Example: No programming experience needed. You will learn everything you need to know';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedText({
        courseDraftId: courseDraft.id,
        itemId: prerequisite.id,
        newTextValue: event.target.value,
        type: 'prerequisites',
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
        value={prerequisite.text}
      />
      {isDeleteIconVisible && (
        <DeletePrerequisiteButton
          courseDraft={courseDraft}
          prerequisiteId={prerequisite.id}
        />
      )}
    </Stack>
  );
};
