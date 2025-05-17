import { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import { Dispatch, RefObject, SetStateAction, SyntheticEvent } from "react";
import useUploadDataContext from "../../hooks/useUploadDataContext";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-webgl";
import style from "./CropPreview.module.css";
import Loading from "../Loading/Loading";

interface IProps {
    crop: Crop;
    setCrop: Dispatch<SetStateAction<Crop>>;
    aspectRatio: number;
    imgRef: RefObject<HTMLImageElement | null>;
}

export default function CropPreview({ crop, setCrop, aspectRatio, imgRef }: IProps) {
    const { uploadFile } = useUploadDataContext();
    const imgElementRef = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Object detection model
        async function detectCup() {
            if (!uploadFile || !imgElementRef.current) return;

            setLoading(true);

            const model = await cocoSsd.load();
            const predictions = await model.detect(imgElementRef.current);

            const cup = predictions.find((prediction) => prediction.class === "cup");

            if (cup) {
                setLoading(false);
                const objectX = cup.bbox[0];
                const objectY = cup.bbox[1];
                const objectWidth = cup.bbox[2];
                const objectHeight = cup.bbox[3];
                const maxSize = 900;
                let padding = 670;

                if (objectWidth + padding * 2 > maxSize || objectHeight + padding * 2 > maxSize) {
                    const scaleFactor = Math.min(
                        (maxSize - objectWidth) / (2 * padding),
                        (maxSize - objectHeight) / (2 * padding)
                    );
                    padding = Math.floor(padding * scaleFactor);
                }

                const cropWidth = Math.min(objectWidth + padding * 2, maxSize);
                const cropHeight = Math.min(objectHeight + padding * 2, maxSize);
                const cropX = Math.max(0, objectX - (cropWidth - objectWidth) / 2);
                const cropY = Math.max(0, objectY - (cropHeight - objectHeight) / 2);

                setCrop({ unit: "px", x: cropX, y: cropY, width: cropWidth, height: cropHeight });
            } else {
                setLoading(false);
            }
        }

        detectCup();
    }, [uploadFile]);

    function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
        imgRef.current = e.currentTarget;
    }

    // Hides scroll on image detect
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [loading]);

    return (
        <>
            {loading && <Loading />}
            <div className={style.cropContainer}>
                <ReactCrop
                    className={style.cropComponent}
                    crop={crop}
                    onChange={(pixelCrop) => setCrop(pixelCrop)}
                    keepSelection
                    aspect={aspectRatio}
                    ruleOfThirds
                >
                    <img
                        ref={imgElementRef}
                        className={style.imgComponent}
                        src={uploadFile?.fileUrl || ""}
                        alt={uploadFile?.fileName || "Uploaded Image"}
                        onLoad={(e) => onImageLoad(e)}
                    />
                </ReactCrop>
            </div>
        </>
    );
}
