import s from "./Header.module.css";


export default function Header() {
    return (
        <header className={s.header}>
            <div>
                <h1 className={s.title}>РТУ МИРЭА ИИТ</h1>
                <h1 className={s.title}>«ИНЖЕНЕР ИЗОБРЕТЁТ ВСЁ»</h1>
            </div>
            <img className={s.logo} src={"/logo.jpg"} alt="logo" />
        </header>
    )
}