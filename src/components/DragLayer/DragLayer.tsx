import { useDragLayer } from 'react-dnd';
import type { Elements } from '../../types/results.types.ts';
import {useIsTouchDevice} from "../../hooks/useIsTouchDevice.tsx";

export default function CustomDragPreview() {
    const isTouch = useIsTouchDevice();

    const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
        item: monitor.getItem() as Elements | null,
        currentOffset: monitor.getClientOffset(),
    }));

    if (!isDragging || !currentOffset || !item) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            pointerEvents: 'none',
            top: currentOffset.y,
            left: currentOffset.x,
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            width: '100px',
        }}>
            {isTouch ? <img src={item.image} alt={item.name} style={{ width: '72px', height: '72px', borderRadius: item.rounding ? '50%' : "" }}/> : ""}
        </div>
    );
}
