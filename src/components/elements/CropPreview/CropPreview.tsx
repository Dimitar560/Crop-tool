import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import style from "./CropPreview.module.css";
import { Dispatch, RefObject, SetStateAction, SyntheticEvent } from "react";
import { IFileUpload } from "../../views/CropImage";

interface IProps {
    uploadFile: IFileUpload | null;
    setUploadFile: Dispatch<SetStateAction<IFileUpload | null>>;
    setDimentionError: Dispatch<SetStateAction<string>>;
    crop: Crop;
    setCrop: Dispatch<SetStateAction<Crop>>;
    minDiamention: number;
    aspectRatio: number;
    imgRef: RefObject<HTMLImageElement | null>;
}

export default function CropPreview({
    uploadFile,
    setUploadFile,
    setDimentionError,
    crop,
    setCrop,
    minDiamention,
    aspectRatio,
    imgRef,
}: IProps) {
    // Image reader
    function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
        imgRef.current = e.currentTarget;
        if (naturalWidth < minDiamention || naturalHeight < minDiamention) {
            setDimentionError(`Image must be ${minDiamention}x${minDiamention} pixels`);
            setTimeout(() => {
                setDimentionError("");
            }, 5000);
            setUploadFile(null);
            return;
        }
        const crop = makeAspectCrop({ unit: "px", width: 670 }, aspectRatio, width, height);
        const centredCrop = centerCrop(crop, width, height);
        setCrop(centredCrop);
    }

    return (
        <div className={style.cropContainer}>
            <ReactCrop
                className={style.cropComponent}
                crop={crop}
                onChange={(pixelCrop) => {
                    setCrop(pixelCrop);
                }}
                keepSelection
                aspect={aspectRatio}
                minWidth={minDiamention}
                minHeight={minDiamention}
                ruleOfThirds
            >
                <img
                    className={style.imgComponent}
                    src={uploadFile!.fileUrl as string}
                    alt={uploadFile!.fileName as string}
                    onLoad={(e) => onImageLoad(e)}
                />
            </ReactCrop>
        </div>
    );
}
