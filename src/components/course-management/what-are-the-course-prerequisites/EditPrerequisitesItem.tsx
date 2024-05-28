import { useAppDispatch } from '../../../app/hooks';
import {
  TextWithId,
  updatedPrerequisite,
} from '../../../features/courseDraftsSlice';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { ChangeEvent } from 'react';

interface EditPrerequisitesItemProps {
  courseDraftId: string;
  prerequisite: TextWithId;
}

export const EditPrerequisitesItem = ({
  courseDraftId,
  prerequisite,
}: EditPrerequisitesItemProps) => {
  const dispatch = useAppDispatch();

  const placeholder =
    prerequisite.text.length > 0
      ? prerequisite.text
      : 'Example: No programming experience needed. You will learn everything you need to know';

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedPrerequisite({
        courseDraftId,
        prerequisiteId: prerequisite.id,
        text: event.target.value,
      })
    );
  };

  return (
    <InputFieldWithMaxCharacters
      onChange={onChange}
      placeholder={placeholder}
      value={prerequisite.text}
    />
  );
};
