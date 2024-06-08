import { Box, Paper, Stack } from '@mui/material';
import {
  ICurriculumSection,
  deletedCurriculumSection,
  reorderedLectures,
} from '../../features/courseDraftsSlice';
import { HeadingV2 } from './HeadingV2';
import { ItemWithOrderIndex, getSortedCopy } from '../drag-and-drop/utils';
import { Dropzone } from './Dropzone';
import { useAppDispatch } from '../../app/hooks';
import { memo } from 'react';
import DraggableLecture from './DraggableLecture';

export interface SectionProps {
  courseDraftId: string;
  curriculumSection: ICurriculumSection;
  index: number;
}

const SectionV2 = ({
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        ></Box>
        <HeadingV2
          itemName="Section"
          index={index}
          title={curriculumSection.title}
          changeHeadingVisibility={() => {}}
          onClickDeleteIcon={onClickDelete}
          paperSx={{
            bgcolor: 'background.paperDarker',
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
                  <DraggableLecture
                    allowedDropzoneTag="lecture"
                    courseDraftId={courseDraftId}
                    index={index}
                    lecture={lecture}
                    sectionId={curriculumSection.id}
                    changeOrder={changeOrder}
                    key={lecture.id}
                  />
                );
              })}
            </Stack>
          </Dropzone>
        )}
      </Stack>
    </Paper>
  );
};

export default memo(SectionV2);
