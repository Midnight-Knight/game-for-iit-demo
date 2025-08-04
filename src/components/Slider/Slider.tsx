import { useState } from "react";

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

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <button
                disabled={!canGoPrev}
                onClick={() => setStartIndex(i => Math.max(0, i - 1))}
                style={{ cursor: canGoPrev ? "pointer" : "not-allowed" }}
            >
                ←
            </button>

            <div style={{ display: "flex", gap: 40 }}>
                {visibleItems.map((item, i) => (
                    <div
                        key={item ? item.id : `empty-${startIndex + i}`}
                        style={{ flexShrink: 0 }}
                    >
                        {renderItem(item, startIndex + i)}
                    </div>
                ))}
            </div>

            <button
                disabled={!canGoNext}
                onClick={() => setStartIndex(i => Math.min(items.length - visibleCount, i + 1))}
                style={{ cursor: canGoNext ? "pointer" : "not-allowed" }}
            >
                →
            </button>
        </div>
    );
}

export default Slider;
