import { useDrag } from "react-dnd";
import type {Elements} from "../../types/results.types.ts";


type DraggableProps = {
    element: Elements;
}

export default function Draggable({element}: DraggableProps) {
    const [{isDragging}, dragRef] = useDrag({
        type: "element",
        item: element,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <div style={{width:'100px', cursor: "grab", opacity: isDragging ? "0.5" : "1"}} ref={dragRef}>
            <p>{element.name}</p>
            <p>{element.id}</p>
        </div>
    )
}