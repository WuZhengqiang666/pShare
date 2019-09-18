import { useEffect, useRef } from "react";
export function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<(() => void) | null>(null);
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        function tick() {
            savedCallback.current && savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        return () => { };
    }, [delay]);
}
