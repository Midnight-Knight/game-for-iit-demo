import { useState, useEffect } from "react";

export function useIsSmallScreen(threshold = 1400) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < threshold);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < threshold);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [threshold]);

    return isSmallScreen;
}
