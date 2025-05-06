import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import style from "./CropPreview.module.css";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { IFileUpload } from "../../views/CropImage";

interface IProps {
    uploadFile: IFileUpload | null;
    setUploadFile: Dispatch<SetStateAction<IFileUpload | null>>;
    setDimentionError: Dispatch<SetStateAction<string>>;
    crop: Crop;
    setCrop: Dispatch<SetStateAction<Crop>>;
    minDiamention: number;
    aspectRatio: number;
}

export default function CropPreview({
    uploadFile,
    setUploadFile,
    setDimentionError,
    crop,
    setCrop,
    minDiamention,
    aspectRatio,
}: IProps) {
    function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < minDiamention || naturalHeight < minDiamention) {
            setDimentionError(`Image must be ${minDiamention}x${minDiamention} pixels`);
            setUploadFile(null);
            return;
        }
        const crop = makeAspectCrop({ unit: "px", width: 670 }, aspectRatio, width, height);
        const centredCrop = centerCrop(crop, width, height);
        setCrop(centredCrop);
    }

    return (
        <div className={style.cropContainer}>
            <button onClick={() => setUploadFile(null)}>Clear image</button>
            <ReactCrop
                className={style.cropComponent}
                crop={crop}
                onChange={(_, prercentageCrop) => {
                    setCrop(prercentageCrop);
                }}
                keepSelection
                aspect={aspectRatio}
                minWidth={minDiamention}
                minHeight={150}
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
