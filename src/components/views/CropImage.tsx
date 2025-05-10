import { useEffect, useRef, useState } from "react";
import UploadFile from "../elements/UploadFile/UploadFile";
import { Crop } from "react-image-crop";
import CropPreview from "../elements/CropPreview/CropPreview";
import CropInputs from "../elements/CropInputs/CropInputs";
import HeaderTitle from "../elements/HeaderTitle/HeaderTitle";
import CropButtons from "../elements/CropButtons/CropButtons";
import useUploadDataContext from "../hooks/useUploadDataContext";
import style from "./CropImage.module.css";

export default function CropImage() {
    // Shared variables and states
    const { uploadFile } = useUploadDataContext();
    const fileSizeLimit = 10;
    const fileFormatsArray = ["image/jpeg", "image/png", "image/webp"];
    // Input
    const [cropWidth, setCropWidth] = useState<string | null>(null);
    const [cropHeight, setCropHeight] = useState<string | null>(null);
    const [selectedCropRatio, setSelectedCropRatio] = useState<string>("");
    // Crop diamention
    const aspectRatio = 1;
    const minDiamention = 150;
    // Image element
    const imgRef = useRef<HTMLImageElement>(null);
    // Crop element state
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
            const selectedWidth = selectedCropRatio !== "freeForm" ? +selectedCropRatio.split?.("x")[0] : 50;
            const selectedHeight = selectedCropRatio !== "freeForm" ? +selectedCropRatio.split?.("x")[1] : 50;
            setCrop({ ...crop, width: selectedWidth, height: selectedHeight });
        }
    }, [selectedCropRatio]);

    // Clear inputs

    useEffect(() => {
        if (!uploadFile) {
            setSelectedCropRatio("");
            setCropWidth("");
            setCropHeight("");
        }
    }, [uploadFile]);

    useEffect(() => {
        if (selectedCropRatio === "freeForm") {
            setCropWidth("");
            setCropHeight("");
        }
    }, [selectedCropRatio]);

    // Crop diamention handler

    function cropDiamentionHandler(type: "width-input" | "width-dropDown" | "height-input" | "height-dropDown") {
        switch (type) {
            case "width-input":
                return +cropWidth! && +cropWidth!;
            case "width-dropDown":
                return +selectedCropRatio.split?.("x")[0];
            case "height-input":
                return +cropHeight! && +cropHeight!;
            case "height-dropDown":
                return +selectedCropRatio.split?.("x")[1];
            default:
                return 0;
        }
    }

    return (
        <>
            <title>Crop tool</title>
            <HeaderTitle title="Crop tool" />
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
                        imgRef={imgRef}
                        crop={crop}
                    />
                    <CropPreview
                        crop={crop}
                        setCrop={setCrop}
                        minDiamentionWidth={
                            selectedCropRatio !== "freeForm"
                                ? cropDiamentionHandler("width-dropDown")
                                : cropDiamentionHandler("width-input")
                        }
                        minDiamentionHeight={
                            selectedCropRatio !== "freeForm"
                                ? cropDiamentionHandler("height-dropDown")
                                : cropDiamentionHandler("height-input")
                        }
                        aspectRatio={aspectRatio}
                        imgRef={imgRef}
                    />
                </section>
            ) : (
                <UploadFile
                    minDiamention={minDiamention}
                    fileSizeLimit={fileSizeLimit}
                    fileFormatsArray={fileFormatsArray}
                />
            )}
        </>
    );
}
