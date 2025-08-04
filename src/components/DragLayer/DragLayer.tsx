import React from 'react';
import { useDragLayer } from 'react-dnd';
import type { Elements } from '../../types/results.types.ts';

export default function CustomDragPreview() {
    const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem() as Elements | null,
        currentOffset: monitor.getClientOffset(),
    }));

    if (!isDragging || !currentOffset || !item) {
        return null;
    }

    const style: React.CSSProperties = {
        position: 'fixed',
        pointerEvents: 'none',
        top: currentOffset.y,
        left: currentOffset.x,
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        width: '100px',
    };

    return (
        <div style={style}>
            {item.image ? (
                <img src={item.image} alt={item.name} width={"100%"} height={"auto"} />
            ) : (
                <div>{item.name}</div>
            )}
        </div>
    );
}
