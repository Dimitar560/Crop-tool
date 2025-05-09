import { Dispatch, RefObject, SetStateAction } from "react";
import style from "./CropButtons.module.css";
import { IFileUpload } from "../../views/CropImage";
import { Crop } from "react-image-crop";

interface IProps {
    setUploadFile: Dispatch<SetStateAction<IFileUpload | null>>;
    imgRef: RefObject<HTMLImageElement | null>;
    crop: Crop;
}

export default function CropButtons({ setUploadFile, imgRef, crop }: IProps) {
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
                Download cropped image
            </span>
        </div>
    );
}
