import { useState } from 'react';
import { DragAndDropContext } from './DragAndDropContext';
import { Dropzone } from './Dropzone';
import { Draggable } from './Draggable';
import { ItemWithOrderIndex } from '../drag-and-drop/utils';

const dataIds = [
  { id: '1', orderIndex: 0, jotain: '123' },
  { id: '2', orderIndex: 1, jotain: '123' },
  { id: '3', orderIndex: 2, jotain: '123' },
];

export const DragDropV2 = () => {
  const [currentlyDraggedItemId, setCurrentlyDraggedItemId] = useState<
    string | null
  >(null);
  const [state, setState] = useState(dataIds);

  const changeOrder = (newOrder: ItemWithOrderIndex[]) => {
    try {
      const newState = newOrder.map((item) => {
        const oldItem = state.find((oldItem) => oldItem.id === item.id);

        if (!oldItem) {
          throw new Error();
        }

        return {
          ...oldItem,
          orderIndex: item.orderIndex,
        };
      });

      setState(newState);
    } catch (error) {}
  };

  const sortedState = state.sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <DragAndDropContext.Provider
      value={{
        currentlyDraggedItemId,
        setCurrentlyDraggedItemId,
        changeOrder,
      }}
    >
      <div
        style={{
          height: 'calc(100vh + 1000px)',
          backgroundColor: 'grey',
          margin: '100px',
          padding: '10px',
          justifyContent: 'space-around',
        }}
      >
        <Dropzone allowedDropzoneTag="lecture">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {sortedState.map(({ id }) => (
              <Draggable key={id} dataId={id} allowedDropzoneTag="lecture">
                <div>{id}</div>
              </Draggable>
            ))}
          </div>
        </Dropzone>
      </div>
    </DragAndDropContext.Provider>
  );
};
