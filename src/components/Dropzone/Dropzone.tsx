import { useDrop } from "react-dnd";
import type {Elements} from "../../types/results.types.ts";


type DropzoneProps = {
    zoneId: number;
    dropped: Elements | null;
    onDrop: (e: Elements) => void;
    correct?: boolean;
}

export default function Dropzone({ zoneId, dropped, onDrop, correct}: DropzoneProps) {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: "element",
        drop: (item: Elements) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    })

    const renderStatus = () => {
        if (correct === undefined) return null;
        return <p>{correct ? "✅ Верно" : "❌ Неверно"}</p>;
    };

    return (
        <div
            ref={dropRef}
        >
            {dropped ? (
                <>
                    <div>{dropped.name}</div>
                    <img src={dropped.image} alt={dropped.name} width={40} />
                </>
            ) : (
                <div style={{ color: "#999" }}>Пусто</div>
            )}
            {renderStatus()}
        </div>
    )
}