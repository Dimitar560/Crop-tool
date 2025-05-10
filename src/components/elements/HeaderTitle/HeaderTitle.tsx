import style from "./HeaderTitle.module.css";

interface IProps {
    title: string;
}

export default function HeadarTitle({ title = "Crop" }: IProps) {
    return (
        <nav className={style.headarTitleContainer}>
            <h1>{title}</h1>
        </nav>
    );
}
