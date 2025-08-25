import s from "./DropzoneLayout.module.css";
import Dropzone from "../Dropzone/Dropzone.tsx";
import type { Elements } from "../../types/results.types.ts";

type DropzoneLayoutProps = {
    correctElements: Elements[];
    droppedByZone: Record<number, Elements | null>;
    onDrop: (zoneId: number, item: Elements) => void;
    onClear: (zoneId: number) => void;
};

export default function DropzoneLayout({
                                           correctElements,
                                           droppedByZone,
                                           onDrop,
                                           onClear,
                                       }: DropzoneLayoutProps) {
    return (
        <div className={s.container}>
            <div className={s.list}>
                {correctElements.map((el) => (
                    <div key={el.id} className={s.item}>
                        <Dropzone
                            zoneId={el.id}
                            dropped={droppedByZone[el.id] || null}
                            onDrop={(item) => onDrop(el.id, item)}
                            onClear={() => onClear(el.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
