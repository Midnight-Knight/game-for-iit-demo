import { useEffect, useRef, useState } from "react";

type StopwatchProps = {
    stopTime: boolean;
    onStop: (time: number) => void;
};

export default function Stopwatch({ stopTime, onStop }: StopwatchProps) {
    const [time, setTime] = useState(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (stopTime) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                onStop(time); // ✅ передаём время
            }
            return;
        }

        intervalRef.current = window.setInterval(() => {
            setTime(prev => prev + 10);
        }, 10);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [stopTime]);

    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        <div>
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}:
            {String(milliseconds).padStart(2, '0')}
        </div>
    );
}
