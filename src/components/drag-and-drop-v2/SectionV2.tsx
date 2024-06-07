import { Paper, Stack } from '@mui/material';
import {
  ICurriculumSection,
  deletedCurriculumSection,
  reorderedLectures,
} from '../../features/courseDraftsSlice';
import { HeadingV2 } from './HeadingV2';
import { ItemWithOrderIndex, getSortedCopy } from '../drag-and-drop/utils';
import { Dropzone } from './Dropzone';
import { Draggable } from './Draggable';
import { useAppDispatch } from '../../app/hooks';
import { LectureV2 } from './LectureV2';

interface SectionProps {
  courseDraftId: string;
  curriculumSection: ICurriculumSection;
  index: number;
}

export const SectionV2 = ({
  courseDraftId,
  curriculumSection,
  index,
}: SectionProps) => {
  const dispatch = useAppDispatch();

  const changeOrder = (newOrder: ItemWithOrderIndex[]) => {
    dispatch(
      reorderedLectures({
        courseDraftId,
        sectionId: curriculumSection.id,
        newOrder,
      })
    );
  };

  const onClickDelete = () => {
    dispatch(
      deletedCurriculumSection({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
      })
    );
  };

  const sortedLectures = getSortedCopy(curriculumSection.lessons);

  return (
    <Paper
      sx={{
        bgcolor: 'background.paperDarker',
        border: '1px solid',
        borderRadius: 0,
        p: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <HeadingV2
          itemName="Section"
          index={index}
          title={curriculumSection.title}
          changeHeadingVisibility={() => {}}
          onClickDeleteIcon={onClickDelete}
          paperSx={{
            bgcolor: 'background.paperDarker',
            // Hides border but keeps size
            // consistent with editheading component
            borderColor: 'background.paperDarker',
          }}
          outerStackSx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          leftStackSx={{
            flexGrow: 1,
          }}
        />
        {sortedLectures.length > 0 && (
          <Dropzone allowedDropzoneTag="lecture">
            <Stack
              sx={{
                flexDirection: 'column',
                ml: 6,
                pr: 0,
                gap: 2,
              }}
            >
              {sortedLectures.map((lecture, index) => {
                return (
                  <Draggable
                    dataId={lecture.id}
                    allowedDropzoneTag="lecture"
                    key={lecture.id}
                    changeOrder={changeOrder}
                  >
                    <LectureV2 lecture={lecture} index={index} />
                  </Draggable>
                );
              })}
            </Stack>
          </Dropzone>
        )}
      </Stack>
    </Paper>
  );
};
