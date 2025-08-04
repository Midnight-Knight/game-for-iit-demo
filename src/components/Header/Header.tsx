import s from "./Header.module.css";


export default function Header() {
    return (
        <header className={s.header}>
            <h1 className={s.title}>РТУ МИРЭА ИТХТ</h1>
            <img className={s.logo} src={"/logo.png"} alt="logo" />
        </header>
    )
}