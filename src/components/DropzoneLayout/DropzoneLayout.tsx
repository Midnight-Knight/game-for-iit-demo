import s from "./DropzoneLayout.module.css";
import Dropzone from "../Dropzone/Dropzone.tsx";
import LiquidFlask from "../Flask/Flask.tsx";
import type {Elements} from "../../types/results.types.ts";

type DropzoneLayoutProps = {
    correctElements: Elements[];
    droppedByZone: Record<number, Elements | null>
    onDrop: (zoneId: number, item: Elements) => void;
    onClear: (zoneId: number) => void;
}

export default function DropzoneLayout({ correctElements, droppedByZone, onDrop, onClear }: DropzoneLayoutProps) {
    const isArc = correctElements.length >= 4;

    if (isArc) {
        const total = correctElements.length;
        const radius = correctElements.length >= 5 ? 140 : 120;

        return (
            <div className={s.containerDrop}>
                <div className={s.dropzoneWrapper}>
                    {correctElements.map((el, index) => {
                        const angle = (index / (total - 1)) * Math.PI;
                        const x = Math.cos(angle - Math.PI) * radius;
                        const y = Math.sin(angle - Math.PI) * radius;

                        return (
                            <div
                                key={el.id}
                                className={s.dropzoneArc}
                                style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                            >
                                <Dropzone
                                    zoneId={el.id}
                                    dropped={droppedByZone[el.id] || null}
                                    onDrop={(item) => onDrop(el.id, item)}
                                    onClear={() => onClear(el.id)}
                                />
                            </div>
                        );
                    })}
                </div>
                <LiquidFlask flag={false}/>
            </div>
        )
    }

    return (
        <div className={s.miniContainerDrop}>
            <div className={s.dropzoneList}>
                {correctElements.map(el => (
                    <Dropzone
                        key={el.id}
                        zoneId={el.id}
                        dropped={droppedByZone[el.id] || null}
                        onDrop={(item) => onDrop(el.id, item)}
                        onClear={() => onClear(el.id)}
                    />
                ))}
            </div>
            <LiquidFlask flag={true}/>
        </div>
    )
}