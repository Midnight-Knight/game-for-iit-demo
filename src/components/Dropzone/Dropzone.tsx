import {useDrop} from "react-dnd";
import type { Elements } from "../../types/results.types";
import s from "./Dropzone.module.css";
import { motion } from "framer-motion";
import {useState} from "react";
import {
    flip,
    offset,
    shift,
    useFloating,
    useHover,
    useInteractions,
    useRole
} from "@floating-ui/react-dom-interactions";

type DropzoneProps = {
    zoneId: number;
    dropped: Elements | null;
    onDrop: (e: Elements) => void;
    onClear: () => void;
    correct?: boolean;
};

export default function Dropzone({ dropped, onDrop, onClear }: DropzoneProps) {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: "element",
        canDrop: () => dropped === null,
        drop: (item: Elements) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

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
                ref={(node) => {
                    reference(node);
                }}
                {...interactions.getReferenceProps()}
                className={s.element}
            >
                <motion.div
                    // @ts-ignore
                    ref={dropRef}
                    className={s.dropzone}
                    animate={{ scale: isOver && canDrop ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {dropped ? (
                        <>
                            <button
                                type="button"
                                className={s.delete}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClear();
                                }}
                                aria-label="Очистить"
                            >
                                ✕
                            </button>
                            <img src={dropped.image} alt={dropped.name} className={s.image} style={{borderRadius: dropped.rounding ? "50%" : ""}}/>
                        </>
                    ) : null}
                </motion.div>
            </div>
            {open && dropped && (
                <div
                    ref={floating}
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0,
                    }}
                    className={s.floating}
                    {...interactions.getFloatingProps()}
                >
                    {dropped.name} - {dropped.description}
                </div>
            )}
        </>
    );
}
