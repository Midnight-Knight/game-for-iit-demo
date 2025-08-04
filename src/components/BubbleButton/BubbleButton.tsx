import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./BubbleButton.module.css";

const colors = ["#ff6b6b", "#6bc5ff", "#7dff6b", "#ffde6b", "#d86bff", "#6bffc9"];

type Bubble = {
    id: number;
    color: string;
    left: number;
    size: number;
};

type BubbleButtonProps = {
    active: boolean;
};

const BubbleButton = ({ active }: BubbleButtonProps) => {
    const [bubbles, setBubbles] = useState<Bubble[]>([]);

    useEffect(() => {
        if (!active) return;

        const interval = setInterval(() => {
            const id = Date.now() + Math.random();
            setBubbles((prev) => [
                ...prev,
                {
                    id,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    left: Math.random() * 100,
                    size: 10 + Math.random() * 20,
                },
            ]);
        }, 100);

        const timeoutId = setTimeout(() => {
            clearInterval(interval);
        }, 1500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeoutId);
        };
    }, [active]);

    return (
        <div className={styles.loaderContainer}>
            {bubbles.map((bubble) => (
                <motion.div
                    key={bubble.id}
                    className={styles.bubble}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -100, opacity: 0 }}
                    transition={{ duration: 2 }}
                    style={{
                        backgroundColor: bubble.color,
                        left: `${bubble.left}%`,
                        width: bubble.size,
                        height: bubble.size,
                    }}
                />
            ))}
        </div>
    );
};

export default BubbleButton;
