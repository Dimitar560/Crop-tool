import { Dispatch, SetStateAction } from "react";
import style from "./DropDownInput.module.css";

interface IProps {
    options: IOptions[];
    setSelectValue: Dispatch<SetStateAction<string>>;
    selectValue: string;
    placeholder: string;
    labelText: string;
}

interface IOptions {
    title: string;
    value: string;
}

export default function DropDownInput({ options, setSelectValue, selectValue, placeholder, labelText }: IProps) {
    return (
        <div className={style.dropDownContainer}>
            <label>{labelText}</label>
            <select
                className={style.dropDownInput}
                onChange={(e) => setSelectValue(e.target.value)}
                value={selectValue || ""}
            >
                {placeholder && (
                    <option
                        hidden
                        value=""
                    >
                        {placeholder}
                    </option>
                )}
                {options.map((x, i) => {
                    return (
                        <option
                            key={i}
                            value={x.value}
                        >
                            {x.title}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
