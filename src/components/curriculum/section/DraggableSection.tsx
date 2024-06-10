import { memo } from 'react';
import { DraggableProps } from '../../drag-and-drop-v2/types';
import { MemoDraggable } from '../../drag-and-drop-v2/Draggable';
import { MemoSection, SectionProps } from './Section';

type DraggableSectionProps = Omit<SectionProps & DraggableProps, 'children'>;

const DraggableSection = ({
  allowedDropzoneTag,
  courseDraftId,
  curriculumSection,
  dataId,
  index,
  changeOrder,
}: DraggableSectionProps) => {
  return (
    <MemoDraggable
      allowedDropzoneTag={allowedDropzoneTag}
      dataId={dataId}
      changeOrder={changeOrder}
    >
      <MemoSection
        courseDraftId={courseDraftId}
        curriculumSection={curriculumSection}
        index={index}
      />
    </MemoDraggable>
  );
};

export const MemoDraggableSection = memo(DraggableSection);
