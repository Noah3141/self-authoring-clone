import type { RefObject } from "react";
import { useEffect } from "react";

const useClickOutside = <T extends HTMLElement>(
    fn: () => void,
    ...ref: RefObject<T>[]
) => {
    useEffect(() => {
        const elements = ref.map((ref) => ref.current);
        const handleClickOutside = (event: Event) => {
            if (
                elements &&
                !elements.some((element) =>
                    element?.contains(event.target as Node),
                )
            ) {
                fn();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [ref, fn]);
};

export default useClickOutside;
