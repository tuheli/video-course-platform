import { memo } from 'react';
import Draggable, { DraggableProps } from './Draggable';
import Lecture, { LectureProps } from './Lecture';

type DraggableLectureProps = Omit<
  LectureProps & DraggableProps,
  'children' | 'dataId'
>;

const DraggableLecture = ({
  allowedDropzoneTag,
  courseDraftId,
  index,
  lecture,
  sectionId,
  changeOrder,
}: DraggableLectureProps) => {
  return (
    <Draggable
      dataId={lecture.id}
      allowedDropzoneTag={allowedDropzoneTag}
      key={lecture.id}
      changeOrder={changeOrder}
    >
      <Lecture
        lecture={lecture}
        index={index}
        courseDraftId={courseDraftId}
        sectionId={sectionId}
      />
    </Draggable>
  );
};

export default memo(DraggableLecture);
