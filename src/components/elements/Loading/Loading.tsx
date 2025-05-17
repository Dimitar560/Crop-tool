import style from "./Loading.module.css";

export default function Loading() {
    return (
        <div
            className={style.loaderContainer}
            id="loaderContainer"
        >
            <div className={style.spinner}></div>
            <span>Detecting object</span>
        </div>
    );
}
