import { Box, Stack, Typography } from '@mui/material';
import {
  ICurriculumSection,
  deletedCurriculumSection,
  reorderedLectures,
  updatedCurriculumSectionText,
} from '../../../features/courseDraftsSlice';
import {
  ItemWithOrderIndex,
  getSortedByOrderIndexCopy,
} from '../../drag-and-drop-v2/utils';
import { Dropzone } from '../../drag-and-drop-v2/Dropzone';
import { useAppDispatch } from '../../../app/hooks';
import { ChangeEvent, memo, useState } from 'react';
import { InputFieldWithMaxCharacters } from '../../course-creation/course-creation-flow/InputFieldWithMaxCharacters';
import { SaveAndCancelButton } from '../SaveAndCancelButton';
import { EditableItemType } from '../../../contexts/CurriculumSectionContext';
import AddIcon from '@mui/icons-material/Add';
import { AddableItemOptionButton } from '../lecture/AddLectureButton';
import { AddItemButton } from '../AddItemButton';
import { EditSelector } from '../EditSelector';
import { Heading } from '../Heading';
import { MemoDraggableLecture } from '../lecture/DraggableLecture';
import { MemoDraghandle } from '../../drag-and-drop-v2/Draghandle';

export interface SectionProps {
  courseDraftId: number;
  curriculumSection: ICurriculumSection;
  index: number;
}

const Section = ({ courseDraftId, curriculumSection, index }: SectionProps) => {
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [isHeadingIconsVisible, setIsHeadingIconsVisible] = useState(false);
  const [activeEditType, setActiveEditType] = useState<EditableItemType | null>(
    null
  );
  const [isSelectionVisible, setIsSelectionVisible] = useState(false);
  const dispatch = useAppDispatch();

  const changeLecturesOrder = (newOrder: ItemWithOrderIndex[]) => {
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

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedCurriculumSectionText({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
        newValue: event.target.value,
        type: 'title',
      })
    );
  };

  const onChangeLearningObjective = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updatedCurriculumSectionText({
        courseDraftId,
        curriculumSectionId: curriculumSection.id,
        newValue: event.target.value,
        type: 'learningObjective',
      })
    );
  };

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

  const sortedLectures = getSortedByOrderIndexCopy(curriculumSection.lessons);

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
          onMouseDown={(event) => event.stopPropagation()}
          sx={{
            flexDirection: 'row',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            Section {index + 1}:
          </Typography>
          <Stack
            sx={{
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              gap: 1,
            }}
          >
            <InputFieldWithMaxCharacters
              onChange={onChangeTitle}
              maxInputLength={80}
              value={curriculumSection.title}
              placeholder="Enter a title"
              autofocus={true}
              fontSize={14}
              sx={{
                width: '100%',
                py: 0.5,
              }}
            />
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              What will students be able to do at the end of this section?
            </Typography>
            <InputFieldWithMaxCharacters
              onChange={onChangeLearningObjective}
              maxInputLength={80}
              value={curriculumSection.learningObjective}
              placeholder="Enter a learning objective"
              autofocus={true}
              fontSize={14}
              sx={{
                width: '100%',
                py: 0.5,
              }}
            />
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
          <Heading
            isHeadingIconsVisible={isHeadingIconsVisible}
            itemName="Section"
            index={index}
            title={curriculumSection.title}
            isTitleBold={true}
            setIsEditingHeading={setIsEditingHeading}
            onClickDeleteIcon={onClickDelete}
          />
          {isHeadingIconsVisible && <MemoDraghandle sx={{ mr: 1 }} />}
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
                <MemoDraggableLecture
                  allowedDropzoneTag="lecture"
                  courseDraftId={courseDraftId}
                  index={index}
                  lecture={lecture}
                  sectionId={curriculumSection.id}
                  changeOrder={changeLecturesOrder}
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
                width: 'fit-content',
              }}
            >
              <AddItemButton setOptionsVisibility={setIsSelectionVisible} />
            </Box>
          )}
        </>
      )}
      {activeEditType !== null && (
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
      )}
    </Stack>
  );
};

export const MemoSection = memo(Section);
