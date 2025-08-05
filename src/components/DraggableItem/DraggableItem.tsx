import { useDrag } from "react-dnd";
import s from "./DraggableItem.module.css";
import type { Elements } from "../../types/results.types";

type DraggableProps = {
    element: Elements;
};

export default function Draggable({ element }: DraggableProps) {
    const [{ isDragging }, dragRef] = useDrag({
        type: "element",
        item: element,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            className={s.element}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
            // @ts-ignore
            ref={dragRef}
        >
            <div className={s.background}>
                <img src={element.image} alt={element.name} className={s.image} style={{ borderRadius: element.rounding ? "50%" : "0" }} />
            </div>
            <p className={s.name}>{element.name}</p>
        </div>
    );
}
