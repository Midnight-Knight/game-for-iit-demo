import s from "./Header.module.css";


export default function Header() {
    return (
        <header className={s.header}>
            <h1 className={s.title}>РТУ МИРЭА ИИТ</h1>
            <img className={s.logo} src={"/logo.jpg"} alt="logo" />
        </header>
    )
}