import s from "../../../App.module.css";
import {motion} from "framer-motion";

type TotalScoreProps = {
    totalScore: number[];
}

export default function ModalFinal({totalScore}: TotalScoreProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
        >
            <div className={s.modalInfo}>
                <h2 className={s.titleResult}>Результаты</h2>
                <p className={s.result}>{totalScore.reduce((sum, s) => sum + s, 0)}</p>
                <motion.button
                    onClick={() => window.location.reload()}
                    className={s.modalButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Заново
                </motion.button>
            </div>
        </motion.div>
    )
}