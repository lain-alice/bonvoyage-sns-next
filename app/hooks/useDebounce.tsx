import { useEffect, useRef } from "react";

const useDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (...args: Parameters<T>): void => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default useDebounce;
