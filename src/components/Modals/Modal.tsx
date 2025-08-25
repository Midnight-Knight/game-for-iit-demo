import s from "./Modal.module.css";
//@ts-ignore
import {ReactNode, useEffect} from "react";


type Props = {
    children: ReactNode;
}

export default function Modal({children}: Props) {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div className={s.modalOverlay}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}