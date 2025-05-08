import { useEffect } from "react";

export default function useDropOutside(dropRef: React.RefObject<HTMLInputElement | null>) {
    // If a file is dropped outside of the drop area, the browser won't open the file
    function dropOutside(e: DragEvent) {
        if (e.target === dropRef.current) {
            return true;
        } else {
            e.preventDefault();
        }
    }

    useEffect(() => {
        window.addEventListener("dragover", () => dropOutside, false);
        window.addEventListener("drop", () => dropOutside, false);
        return () => {
            window.removeEventListener("dragover", () => dropOutside, false);
            window.removeEventListener("drop", () => dropOutside, false);
        };
    }, []);
}
