import { useContext } from "react";
import { IFileUploadContext, UploadFileContext } from "../context/UploadFileProvider";

export default function useUploadDataContext() {
    const uploadDataContext = useContext<IFileUploadContext | null>(UploadFileContext);
    if (!uploadDataContext) {
        throw new Error("uploadDataContext must be used within an AppProvider");
    }
    return uploadDataContext;
}
