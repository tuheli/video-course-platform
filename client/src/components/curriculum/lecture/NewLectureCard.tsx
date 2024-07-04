import { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { useCreateLectureMutation } from '../../../features/apiSlice';
import { useSaveCurriculum } from '../../../hooks/useSaveCurriculum';
import { store } from '../../../app/store';
import { EditableItemType } from '../section/Section';

interface NewLectureCardProps {
  courseDraftId: number;
  curriculumSectionId: number;
  setEditingItemType: (type: EditableItemType | null) => void;
}

export const NewLectureCard = ({
  courseDraftId,
  curriculumSectionId,
  setEditingItemType,
}: NewLectureCardProps) => {
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const [title, setTitle] = useState('');
  const [createLecture] = useCreateLectureMutation();
  const { saveCurriculum } = useSaveCurriculum();

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onClickAddLecture = async () => {
    setIsProcessingRequest(true);
    try {
      const courseDraft = store
        .getState()
        .courseDrafts.find(({ id }) => id === courseDraftId);

      if (!courseDraft) {
        throw new Error('Course draft not found');
      }

      await saveCurriculum(courseDraft);
      await createLecture({
        courseDraftId,
        curriculumSectionId,
        lectureTitle: title,
      });
      setEditingItemType(null);
    } catch (error) {
      // TODO: Notify user on error
      console.log('error creating lecture', error);
    }
    setIsProcessingRequest(false);
  };

  const onClickCancel = () => {
    setEditingItemType(null);
  };

  return (
    <Stack
      onMouseDown={(event) => event.stopPropagation()}
      sx={{
        flexDirection: 'row',
        gap: 1,
        p: 1,
        border: '1px solid',
        borderColor: 'text.primary',
        bgcolor: 'background.default',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          gap: 1,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>New Lecture:</Typography>
          <InputFieldWithMaxCharacters
            onChange={onChangeTitle}
            maxInputLength={80}
            value={title}
            placeholder="Enter a title"
            autofocus={true}
            sx={{
              width: '80%',
            }}
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Stack
            onMouseDown={(event) => event.stopPropagation()}
            sx={{
              flexDirection: 'row',
              marginLeft: 'auto',
              gap: 1,
            }}
          >
            <Button
              onClick={onClickCancel}
              variant="text"
              color="primary"
              sx={{
                height: 32,
                p: 1,
                fontWeight: 600,
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={onClickAddLecture}
              variant="contained"
              color="primary"
              disabled={isProcessingRequest}
              sx={{
                height: 32,
                minWidth: 132,
                p: 1,
                fontWeight: 600,
                transition: 'none',
              }}
            >
              {isProcessingRequest ? (
                <Stack
                  sx={{
                    flexDirection: 'row',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Box>Adding</Box>
                  <CircularProgress size={16} />
                </Stack>
              ) : (
                'Add New Lecture'
              )}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
