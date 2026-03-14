import { useCallback, useRef } from 'react';

function useDebounce<T extends (...args: any[]) => void>(fn: T, delay = 500): T {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    return useCallback((...args: Parameters<T>) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => fn(...args), delay);
    }, [fn, delay]) as T;
}

export default useDebounce;