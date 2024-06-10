import { Box, Stack, Typography } from '@mui/material';
import {
  ICurriculumSection,
  deletedCurriculumSection,
  reorderedLectures,
} from '../../features/courseDraftsSlice';
import { HeadingV2 } from './HeadingV2';
import { ItemWithOrderIndex, getSortedCopy } from '../drag-and-drop/utils';
import { Dropzone } from './Dropzone';
import { useAppDispatch } from '../../app/hooks';
import { memo, useState } from 'react';
import DraggableLecture from './DraggableLecture';
import { InputFieldWithMaxCharacters } from '../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { SaveAndCancelButton } from '../curriculum/SaveAndCancelButton';
import DraghandleV2 from './DraghandleV2';
import { EditableItemType } from '../../contexts/CurriculumSectionContext';
import AddIcon from '@mui/icons-material/Add';
import { AddableItemOptionButton } from '../curriculum/lecture/AddLectureButton';
import { AddItemButton } from '../curriculum/AddItemButton';
import { EditSelector } from '../curriculum/EditSelector';

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
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [isHeadingIconsVisible, setIsHeadingIconsVisible] = useState(false);
  const [activeEditType, setActiveEditType] = useState<EditableItemType | null>(
    null
  );
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);
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

  const onChangeTitle = () => {};

  const onClickCancelHeadingEdit = () => {
    setIsHeadingIconsVisible(false);
    setIsEditingHeading(false);
  };

  const onClickSaveHeadingEdit = () => {
    setIsHeadingIconsVisible(false);
    setIsEditingHeading(false);
  };

  const onMouseEnter = () => {
    setIsHeadingIconsVisible(true);
  };

  const onMouseLeave = () => {
    setIsHeadingIconsVisible(false);
  };

  const sortedLectures = getSortedCopy(curriculumSection.lessons);

  return (
    <Stack
      sx={{
        bgcolor: 'background.paperDarker',
        border: '1px solid',
        flexDirection: 'column',
        gap: 2,
        px: 1,
        py: 2,
      }}
    >
      {isEditingHeading ? (
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 1,
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
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Section {index + 1}:
              </Typography>
              <InputFieldWithMaxCharacters
                onChange={onChangeTitle}
                maxInputLength={80}
                value={curriculumSection.title}
                placeholder="Enter a title"
                autofocus={true}
                sx={{
                  width: '80%',
                }}
              />
            </Stack>
            <SaveAndCancelButton
              saveButtonText="Save Section"
              onClickCancel={onClickCancelHeadingEdit}
              onClickSave={onClickSaveHeadingEdit}
            />
          </Stack>
        </Stack>
      ) : (
        <Stack
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <HeadingV2
            isHeadingIconsVisible={isHeadingIconsVisible}
            itemName="Section"
            index={index}
            title={curriculumSection.title}
            isTitleBold={true}
            setIsEditingHeading={setIsEditingHeading}
            onClickDeleteIcon={onClickDelete}
          />
          {isHeadingIconsVisible && <DraghandleV2 />}
        </Stack>
      )}
      {sortedLectures.length > 0 && (
        <Dropzone allowedDropzoneTag="lecture">
          <Stack
            sx={{
              flexDirection: 'column',
              gap: 2,
              ml: 4,
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
      {isSelectionVisible && activeEditType === null ? (
        <>
          <Box
            onMouseDown={(event) => event.stopPropagation()}
            sx={{
              position: 'relative',
              ml: 4,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'translate(-50%, -50%) rotate(45deg)',
              }}
            >
              <Box
                onClick={() => setIsSelectionVisible(false)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                <AddIcon />
              </Box>
            </Box>
            <Stack
              sx={{
                flexDirection: 'row',
                gap: 1,
                border: '1px dashed',
                borderColor: 'text.primary',
              }}
            >
              <AddableItemOptionButton
                text="Lecture"
                type="addLecture"
                setEditingItemType={setActiveEditType}
                closeEditOptions={() => setIsSelectionVisible(false)}
              />
              {/** Just for displaying more options - these dont do anything */}
              <AddableItemOptionButton
                text="Quiz"
                type={null}
                setEditingItemType={setActiveEditType}
                closeEditOptions={() => setIsSelectionVisible(false)}
              />
              <AddableItemOptionButton
                text="Coding Exercise"
                type={null}
                setEditingItemType={setActiveEditType}
                closeEditOptions={() => setIsSelectionVisible(false)}
              />
              <AddableItemOptionButton
                text="Assignment"
                type={null}
                setEditingItemType={setActiveEditType}
                closeEditOptions={() => setIsSelectionVisible(false)}
              />
            </Stack>
          </Box>
        </>
      ) : (
        <>
          {activeEditType === null && (
            <Box
              onMouseDown={(event) => event.stopPropagation()}
              sx={{
                ml: 4,
              }}
            >
              <AddItemButton setOptionsVisibility={setIsSelectionVisible} />
            </Box>
          )}
        </>
      )}
      <Box
        sx={{
          ml: 4,
        }}
      >
        <EditSelector
          activeEditType={activeEditType}
          courseDraftId={courseDraftId}
          curriculumSectionId={curriculumSection.id}
          setEditingItemType={setActiveEditType}
        />
      </Box>
    </Stack>
  );
};

export default memo(SectionV2);
