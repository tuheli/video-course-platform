import { memo } from 'react';
import Draggable, { DraggableProps } from './Draggable';
import SectionV2, { SectionProps } from './SectionV2';

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
      <SectionV2
        courseDraftId={courseDraftId}
        curriculumSection={curriculumSection}
        index={index}
      />
    </Draggable>
  );
};

export default memo(DraggableSection);
