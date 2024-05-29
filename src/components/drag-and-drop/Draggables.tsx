import { useContext } from 'react';
import { Draggable } from './Draggable';
import { DraggableContext } from './DraggableContext';

export const Draggables = () => {
  const { state } = useContext(DraggableContext);

  return (
    <>
      {state.map(({ id }) => (
        <Draggable key={id} id={id} />
      ))}
    </>
  );
};
