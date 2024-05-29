import { useState } from 'react';
import { IDraggable, getDraggableData } from './draggableData';
import { DraggableContext } from './DraggableContext';
import { DroppableArea } from './DroppableArea';
import { Draggables } from './Draggables';

export interface ReorderableByYPosition {
  yPosition: number;
}

export const DragAndDropTest = () => {
  const draggableData = getDraggableData();

  const [state, setState] = useState<IDraggable[]>(draggableData);

  const changeOrder = (items: IDraggable[]) => {
    const newState = [...items];
    newState.sort((a, b) => a.yPosition - b.yPosition);
    setState(newState);
  };

  return (
    <>
      <DraggableContext.Provider value={{ state, changeOrder }}>
        <DroppableArea>
          <Draggables />
        </DroppableArea>
      </DraggableContext.Provider>
    </>
  );
};
