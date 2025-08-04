import s from "./Modal.module.css";
//@ts-ignore
import { ReactNode } from "react";


type Props = {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({children, onClose}: Props) {
    return (
        <div className={s.modalOverlay}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <button className={s.closeButton} onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    )
}