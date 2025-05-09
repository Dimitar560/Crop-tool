import { useEffect, useRef, useState } from "react";
import UploadFile from "../elements/UploadFile/UploadFile";
import { Crop } from "react-image-crop";
import CropPreview from "../elements/CropPreview/CropPreview";
import style from "./CropImage.module.css";
import CropInputs from "../elements/CropInputs/CropInputs";
import HeadarTitle from "../elements/HeaderTitle/HeaderTitle";
import CropButtons from "../elements/CropButtons/CropButtons";

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

    const [selectedCropRatio, setSelectedCropRatio] = useState<string>("");

    const aspectRatio = 1;
    const minDiamention = 150;

    const imgRef = useRef<HTMLImageElement>(null);

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

    useEffect(() => {
        if (selectedCropRatio) {
            const selectedWidth = +selectedCropRatio.split?.("x")[0];
            const selectedHeight = +selectedCropRatio.split?.("x")[1];
            setCrop({ ...crop, width: selectedWidth, height: selectedHeight });
        }
    }, [selectedCropRatio]);

    return (
        <>
            <HeadarTitle />
            {uploadFile ? (
                <section className={style.cropSection}>
                    <CropInputs
                        setSelectedCropRatio={setSelectedCropRatio}
                        selectedCropRatio={selectedCropRatio}
                        setCropWidth={setCropWidth}
                        cropWidth={cropWidth}
                        setCropHeight={setCropHeight}
                        cropHeight={cropHeight}
                    />
                    <CropButtons
                        setUploadFile={setUploadFile}
                        imgRef={imgRef}
                        crop={crop}
                    />
                    <CropPreview
                        uploadFile={uploadFile}
                        setUploadFile={setUploadFile}
                        setDimentionError={setDimentionError}
                        crop={crop}
                        setCrop={setCrop}
                        minDiamention={minDiamention}
                        aspectRatio={aspectRatio}
                        imgRef={imgRef}
                    />
                </section>
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
