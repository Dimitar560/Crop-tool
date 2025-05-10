import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import { Dispatch, RefObject, SetStateAction, SyntheticEvent } from "react";
import useUploadDataContext from "../../hooks/useUploadDataContext";
import style from "./CropPreview.module.css";

interface IProps {
    crop: Crop;
    setCrop: Dispatch<SetStateAction<Crop>>;
    minDiamentionWidth: number;
    minDiamentionHeight: number;
    aspectRatio: number;
    imgRef: RefObject<HTMLImageElement | null>;
}

export default function CropPreview({
    crop,
    setCrop,
    minDiamentionWidth,
    minDiamentionHeight,
    aspectRatio,
    imgRef,
}: IProps) {
    // Image reader
    const { uploadFile } = useUploadDataContext();
    function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        imgRef.current = e.currentTarget;
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
                minWidth={minDiamentionWidth}
                minHeight={minDiamentionHeight}
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
