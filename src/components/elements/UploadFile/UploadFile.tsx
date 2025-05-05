import { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "./UploadFile.module.css";
import useDropOutside from "../../hooks/useDropOutside";
import fileSizeCheck from "../../helpers/fileSizeCheck";
import fileFormatCheck from "../../helpers/fileFormatCheck";

interface IFileUpload {
    fileUpload: File | null;
    fileName: string | null;
    fileSize: number | null;
}

export default function UploadFile() {
    const [uploadFile, setUploadFile] = useState<IFileUpload | null>(null);
    const [styleSwitcher, setStyleSwitcher] = useState(style.fileInputOverlay);
    const [hintText, setHintText] = useState("Drag'n'drop a file");
    const [errorDetection, setErrorDetection] = useState(false);
    const fileFormatsArray = ["image/jpeg", "image/png", "image/webp"];
    const fileSizeLimit = 10;
    const dropAreaRef = useRef<HTMLInputElement>(null);
    useDropOutside(dropAreaRef);

    // Drag and drop input handler
    function onUploadHandler(e: ChangeEvent<HTMLInputElement>) {
        if (
            fileFormatCheck(e.target.files! && e.target.files[0].type, fileFormatsArray) &&
            fileSizeCheck(e.target.files! && e.target.files[0].size, fileSizeLimit)
        ) {
            setStyleSwitcher(style.fileUploaded);
            setUploadFile({
                fileUpload: e.target.files && e.target.files[0],
                fileName: e.target.files && e.target.files[0].name,
                fileSize: e.target.files && e.target.files[0].size,
            });
            setErrorDetection(false);
        } else {
            if (!fileSizeCheck(e.target.files! && e.target.files[0].size, fileSizeLimit)) {
                errorHandler("Size over limit", style.notSupportedFileFormat);
            } else {
                errorHandler("Wrong file format", style.notSupportedFileFormat);
            }
        }
    }

    // Stops the error to default timer if new file is uploaded
    useEffect(() => {
        let errorTimer: number;

        if (!uploadFile && errorDetection) {
            errorTimer = setTimeout(() => {
                setStyleSwitcher(style.fileInputOverlay);
                setHintText("Drag'n'drop a file");
                setErrorDetection(false);
            }, 5000);
        }

        return () => {
            clearTimeout(errorTimer);
        };
    }, [uploadFile, errorDetection]);

    // Clears file if uploaded
    function deleteHandler() {
        setStyleSwitcher(style.fileInputOverlay);
        setUploadFile(null);
        setHintText("Drag'n'drop a file");
    }

    // Sets error text & style
    function errorHandler(errorText: string, errorStyle: string) {
        setHintText(errorText);
        setStyleSwitcher(errorStyle);
        setErrorDetection(true);
    }

    function helperFormatText(helperFormatArr: string[]) {
        return helperFormatArr.map((x) => x?.split("/")[1]).join(",");
    }

    return (
        <div className={style.fileInputContainer}>
            <div>
                <input
                    id="fileUpload"
                    className={style.fileInput}
                    type="file"
                    onChange={(e) => !uploadFile && onUploadHandler(e)}
                    onDragEnter={() => !uploadFile && setStyleSwitcher(style.fileDragEnter)}
                    onDragLeave={() => !uploadFile && setStyleSwitcher(style.fileInputOverlay)}
                    ref={dropAreaRef}
                />
                <span className={styleSwitcher}>
                    {uploadFile ? <span>{uploadFile.fileName}</span> : <span>{hintText}</span>}
                    {uploadFile && (
                        <span
                            className={style.deleteBtn}
                            onClick={() => deleteHandler()}
                        >
                            Delete
                        </span>
                    )}
                    {!uploadFile && (
                        <div>
                            <p>or...</p>
                            <label
                                className={style.uploadBtn}
                                htmlFor="fileUpload"
                            >
                                Click to upload
                            </label>
                        </div>
                    )}
                </span>
            </div>
            <div className={style.helperTxt}>
                <span>Supported file formats: {helperFormatText(fileFormatsArray)}</span>
                <span>Max file size: {fileSizeLimit} MB</span>
            </div>
        </div>
    );
}
