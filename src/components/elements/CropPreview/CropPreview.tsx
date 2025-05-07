import ReactCrop, { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import style from "./CropPreview.module.css";
import { Dispatch, SetStateAction, SyntheticEvent, useRef } from "react";
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
    const imgRef = useRef<HTMLImageElement>(null);

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

    // Download crop handler

    function getCroppedImg() {
        if (!imgRef.current || !crop.width || !crop.height) return;

        const canvas = document.createElement("canvas");
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        canvas.width = Math.round(crop.width * scaleX);
        canvas.height = Math.round(crop.height * scaleY);
        const ctx = canvas.getContext("2d");

        ctx?.drawImage(
            imgRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );

        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "cropped-image.jpg";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, "image/jpeg");
    }

    return (
        <div className={style.cropContainer}>
            <div className={style.buttonContainer}>
                <span
                    className={style.clearBtn}
                    onClick={() => setUploadFile(null)}
                >
                    Clear image
                </span>
                <span
                    className={style.downloadBtn}
                    onClick={() => getCroppedImg()}
                >
                    Download Cropped Image
                </span>
            </div>
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
