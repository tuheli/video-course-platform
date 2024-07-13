import { memo } from 'react';
import {
  DraggableProps,
  MemoDraggable,
} from '../../drag-and-drop-v2/Draggable';
import { LectureProps } from './types';
import { MemoLecture } from './Lecture';

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
    <MemoDraggable
      dataId={`${lecture.id}`}
      allowedDropzoneTag={allowedDropzoneTag}
      key={lecture.id}
      changeOrder={changeOrder}
    >
      <MemoLecture
        lecture={lecture}
        index={index}
        courseDraftId={courseDraftId}
        sectionId={sectionId}
      />
    </MemoDraggable>
  );
};

export const MemoDraggableLecture = memo(DraggableLecture);
