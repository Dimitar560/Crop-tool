import { ChangeEvent, Dispatch, SetStateAction } from "react";
import style from "./DigitInput.module.css";

interface IProps {
    setDigitVal: Dispatch<SetStateAction<string | null>>;
    digitVal: string | null;
    labelText: string;
}

export default function DigitInput({ setDigitVal, digitVal, labelText }: IProps) {
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        let val = e.target.value;
        const numberRegEx = /[^0-9]/g;
        if (numberRegEx.test(val)) {
            val = "";
        }

        if (val.length > 4) {
            val = val.slice(0, 4);
        }

        setDigitVal(val);
    }

    return (
        <div className={style.inputContainer}>
            <label>{labelText}</label>
            <input
                onChange={(e) => onChangeHandler(e)}
                value={digitVal ? digitVal : ""}
            />
        </div>
    );
}
