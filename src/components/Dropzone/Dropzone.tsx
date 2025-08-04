import { useDrop } from "react-dnd";
import type { Elements } from "../../types/results.types";
import s from "./Dropzone.module.css";
import { motion } from "framer-motion";

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

    return (
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
                    <img src={dropped.image} alt={dropped.name} width={56} />
                </>
            ) : null}
        </motion.div>
    );
}
