import React from 'react';
import { useDrag } from 'react-dnd';

const VsStatItem = ({ name, type, isDropped }) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  return (
    !isDropped && (
      <div className="vsStatItem" ref={drag} style={{ opacity }}>
        {name}
      </div>
    )
  );
};

export default VsStatItem;
