import { useEffect } from "react";

export default function useDropOutside(dropRef: React.RefObject<HTMLInputElement | null>) {
    // If a file is dropped outside of the drop area, the browser won't open the file
    function dropOutside(e: DragEvent) {
        if (dropRef.current?.value === "") {
            if (e.target === dropRef.current) {
                return true;
            } else {
                e.preventDefault();
            }
        }
    }

    useEffect(() => {
        window.addEventListener("dragover", (e) => dropOutside(e), true);
        window.addEventListener("drop", (e) => dropOutside(e), true);
        return () => {
            window.removeEventListener("dragover", (e) => dropOutside(e), true);
            window.removeEventListener("drop", (e) => dropOutside(e), true);
        };
    }, []);
}
