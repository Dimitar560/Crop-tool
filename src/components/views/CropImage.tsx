import { useEffect, useState } from "react";
import UploadFile from "../elements/UploadFile/UploadFile";
import { Crop } from "react-image-crop";
import CropPreview from "../elements/CropPreview/CropPreview";
import DigitInput from "../elements/Inputs/DigitInput/DigitInput";
import style from "./CropImage.module.css";

export interface IFileUpload {
    fileUpload: File | null;
    fileName: string | null;
    fileSize: number | null;
    fileUrl: string | null;
}

export default function CropImage() {
    const [uploadFile, setUploadFile] = useState<IFileUpload | null>(null);
    const fileSizeLimit = 10;
    const fileFormatsArray = ["image/jpeg", "image/png", "image/webp"];

    const [dimentionError, setDimentionError] = useState("");

    const [cropWidth, setCropWidth] = useState<string | null>(null);
    const [cropHeight, setCropHeight] = useState<string | null>(null);

    const aspectRatio = 1;
    const minDiamention = 150;

    const [crop, setCrop] = useState<Crop>({
        unit: "px", // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 670,
        height: 670,
    });

    // Crop width and height setters

    useEffect(() => {
        if (cropWidth) {
            setCrop({ ...crop, width: +cropWidth });
        }
    }, [cropWidth]);

    useEffect(() => {
        if (cropHeight) {
            setCrop({ ...crop, height: +cropHeight });
        }
    }, [cropHeight]);

    return (
        <>
            {uploadFile ? (
                <>
                    <div className={style.inputContainer}>
                        <DigitInput
                            setDigitVal={setCropWidth}
                            digitVal={cropWidth}
                            labelText="Crop width"
                        />
                        <DigitInput
                            setDigitVal={setCropHeight}
                            digitVal={cropHeight}
                            labelText="Crop height"
                        />
                    </div>
                    <CropPreview
                        uploadFile={uploadFile}
                        setUploadFile={setUploadFile}
                        setDimentionError={setDimentionError}
                        crop={crop}
                        setCrop={setCrop}
                        minDiamention={minDiamention}
                        aspectRatio={aspectRatio}
                    />
                </>
            ) : (
                <UploadFile
                    uploadFile={uploadFile}
                    setUploadFile={setUploadFile}
                    fileSizeLimit={fileSizeLimit}
                    fileFormatsArray={fileFormatsArray}
                />
            )}
            {dimentionError && <span className={style.errorTxt}>{dimentionError}</span>}
        </>
    );
}
