import React from 'react';
import { useDrop } from 'react-dnd';
import cn from 'classnames';

const VsStatDustbin = ({ accept, lastDroppedItem, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={cn(
        'vsStat_dnd_dustbin',
        { vsStat_dnd_dustbin_active: isActive },
        { vsStat_dnd_dustbin_canDrop: canDrop }
      )}
    >
      {canDrop
        ? '여기에 드래그&드롭 하세요'
        : lastDroppedItem == null
        ? accept[0] === 'home'
          ? '홈'
          : '어웨이'
        : lastDroppedItem && <p>{lastDroppedItem.name}</p>}
    </div>
  );
};
export default VsStatDustbin;
