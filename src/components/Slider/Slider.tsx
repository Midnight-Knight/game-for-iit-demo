import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./Slider.module.css";

function Slider<T extends { id: number }>({
                                              items,
                                              renderItem,
                                              visibleCount = 4,
                                          }: {
    items: (T | null)[];
    renderItem: (item: T | null, index: number) => React.ReactNode;
    visibleCount?: number;
}) {
    const [startIndex, setStartIndex] = useState(0);

    const canGoPrev = startIndex > 0;
    const canGoNext = startIndex + visibleCount < items.length;

    const visibleItems = items.slice(startIndex, startIndex + visibleCount);

    const goPrev = () => {
        if (canGoPrev) {
            setStartIndex(i => Math.max(0, i - 1));
        }
    };

    const goNext = () => {
        if (canGoNext) {
            setStartIndex(i => Math.min(items.length - visibleCount, i + 1));
        }
    };

    return (
        <div className={s.container}>
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
                {visibleItems.map((item, i) => (
                    <div
                        key={item ? item.id : `empty-${startIndex + i}`}
                        className={s.itemWrapper}
                    >
                        {renderItem(item, startIndex + i)}
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
    );
}

export default Slider;
