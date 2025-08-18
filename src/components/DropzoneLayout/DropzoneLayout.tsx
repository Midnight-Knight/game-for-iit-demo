import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./DropzoneLayout.module.css";
import Dropzone from "../Dropzone/Dropzone.tsx";
import type { Elements } from "../../types/results.types.ts";

type DropzoneSliderProps = {
    correctElements: Elements[];
    droppedByZone: Record<number, Elements | null>;
    onDrop: (zoneId: number, item: Elements) => void;
    onClear: (zoneId: number) => void;
    drawing: string;
    visibleCount?: number;
};

export default function DropzoneSlider({
                                           correctElements,
                                           droppedByZone,
                                           onDrop,
                                           onClear,
                                           drawing,
                                           visibleCount = 2,
                                       }: DropzoneSliderProps) {
    const [startIndex, setStartIndex] = useState(0);

    const canGoPrev = startIndex > 0;
    const canGoNext = startIndex + visibleCount < correctElements.length;

    const visibleItems = correctElements.slice(startIndex, startIndex + visibleCount);

    const goPrev = () => {
        if (canGoPrev) setStartIndex(i => Math.max(0, i - 1));
    };

    const goNext = () => {
        if (canGoNext) setStartIndex(i => Math.min(correctElements.length - visibleCount, i + 1));
    };

    return (
        <div className={s.container}>
            <div className={s.listContainer}>
                <div className={s.arrowWrapper}>
                    <AnimatePresence>
                        {canGoPrev && (
                            <motion.img
                                key="left-arrow"
                                src="/arrowLeft.svg"
                                alt="←"
                                onClick={goPrev}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className={s.button}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    key={startIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={s.list}
                >
                    {visibleItems.map((el) => (
                        <div key={el.id} className={s.itemWrapper}>
                            <Dropzone
                                zoneId={el.id}
                                dropped={droppedByZone[el.id] || null}
                                onDrop={(item) => onDrop(el.id, item)}
                                onClear={() => onClear(el.id)}
                            />
                        </div>
                    ))}
                </motion.div>

                <div className={s.arrowWrapper}>
                    <AnimatePresence>
                        {canGoNext && (
                            <motion.img
                                key="right-arrow"
                                src="/arrowRight.svg"
                                alt="→"
                                onClick={goNext}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className={s.button}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <img src={drawing} alt="Drawing" className={s.drawing}/>
        </div>
    );
}
