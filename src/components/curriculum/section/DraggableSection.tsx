import { memo } from 'react';
import Draggable, { DraggableProps } from '../../drag-and-drop-v2/Draggable';
import Section, { SectionProps } from './Section';

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
    <Draggable
      allowedDropzoneTag={allowedDropzoneTag}
      dataId={dataId}
      changeOrder={changeOrder}
    >
      <Section
        courseDraftId={courseDraftId}
        curriculumSection={curriculumSection}
        index={index}
      />
    </Draggable>
  );
};

export default memo(DraggableSection);
