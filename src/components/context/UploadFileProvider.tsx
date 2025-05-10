import { useState, createContext, Dispatch, ReactNode, SetStateAction } from "react";

export interface IFileUpload {
    fileUpload: File | null;
    fileName: string | null;
    fileSize: number | null;
    fileUrl: string | null;
}

export interface IFileUploadContext {
    uploadFile: IFileUpload | null;
    setUploadFile: Dispatch<SetStateAction<IFileUpload | null>>;
}

// Upload file context
export const UploadFileContext = createContext<IFileUploadContext | null>(null);

export function UploadFileProvider({ children }: { children: ReactNode }) {
    const [uploadFile, setUploadFile] = useState<IFileUpload | null>(null);

    return <UploadFileContext.Provider value={{ uploadFile, setUploadFile }}>{children}</UploadFileContext.Provider>;
}
