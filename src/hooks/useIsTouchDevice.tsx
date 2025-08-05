import {useEffect, useState} from "react";


export function useIsTouchDevice() {
    const [isTouch, setIsTouch] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(pointer: coarse)");

        const handleChange = () => {
            setIsTouch(mediaQuery.matches);
        }

        handleChange();

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        }
    }, []);

    return isTouch;
}