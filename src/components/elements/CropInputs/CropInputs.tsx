import { Dispatch, SetStateAction } from "react";
import exampleData from "../../data/exampleData";
import DigitInput from "../Inputs/DigitInput/DigitInput";
import DropDownInput from "../Inputs/DropDownInput/DropDownInput";
import style from "./CropInputs.module.css";

interface IProps {
    setSelectedCropRatio: Dispatch<SetStateAction<string>>;
    selectedCropRatio: string;
    setCropWidth: Dispatch<SetStateAction<string | null>>;
    cropWidth: string | null;
    setCropHeight: Dispatch<SetStateAction<string | null>>;
    cropHeight: string | null;
}

export default function CropInputs({
    selectedCropRatio,
    setSelectedCropRatio,
    setCropWidth,
    cropWidth,
    setCropHeight,
    cropHeight,
}: IProps) {
    return (
        <div className={style.inputContainer}>
            <DropDownInput
                options={exampleData}
                setSelectValue={setSelectedCropRatio}
                selectValue={selectedCropRatio}
                placeholder="Select pixel ratio"
                labelText="Pixel ratio"
            />
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
    );
}
