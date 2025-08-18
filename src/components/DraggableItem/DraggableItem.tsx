import { useDrag } from "react-dnd";
import { useState } from "react";
import { useFloating, offset, flip, shift, useHover, useInteractions, useRole } from "@floating-ui/react-dom-interactions";
import type { Elements } from "../../types/results.types";
import s from "./DraggableItem.module.css";

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

    // Floating UI
    const [open, setOpen] = useState(false);
    const { x, y, reference, floating, strategy, context } = useFloating({
        placement: "top",
        open,
        onOpenChange: setOpen,
        middleware: [offset(15), flip(), shift()],
    });

    const hover = useHover(context);
    const role = useRole(context, { role: "tooltip" });
    const interactions = useInteractions([hover, role]);

    return (
        <>
            <div
                className={s.element}
                ref={(node) => {
                    dragRef(node);
                    reference(node);
                }}
                {...interactions.getReferenceProps()}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                }}
            >
                <div className={s.background}>
                    <img
                        src={element.image}
                        alt={element.name}
                        className={s.image}
                        style={{ borderRadius: element.rounding ? "50%" : "0" }}
                    />
                </div>
                <p className={s.name}>{element.name}</p>
            </div>

            {open && (
                <div
                    ref={floating}
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0,
                        background: "white",
                        color: "black",
                        border: "3px solid #aaa",
                        padding: "1px 10px",
                        borderRadius: 15,
                        zIndex: 9999,
                        maxWidth: 200,
                        textAlign: "center",
                    }}
                    {...interactions.getFloatingProps()}
                >
                    {element.description}
                </div>
            )}
        </>
    );
}
