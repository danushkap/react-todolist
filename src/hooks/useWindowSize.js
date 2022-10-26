import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        // Set sizes for the first-time
        handleResize()

        // Set sizes when the windows resizes
        window.addEventListener("resize", handleResize);

        // The clean-up routine that removes the event listener preventing any memory leaks
        return () => window.removeEventListener("resize", handleResize);

    }, [])

    // The actual return from the Hook
    return windowSize;
}

export default useWindowSize;
