import s from "./Header.module.css";

type HeaderProps = {
    onOpenDiscovered: () => void;
};

export default function Header({ onOpenDiscovered }: HeaderProps) {
    return (
        <header className={s.header}>
            <div>
                <h1 className={s.title}>РТУ МИРЭА ИИТ</h1>
                <h1 className={s.title}>«ИНЖЕНЕР ИЗОБРЕТЁТ ВСЁ»</h1>
            </div>

            <div className={s.right}>
                <div className={s.achievement} onClick={onOpenDiscovered}>
                    <img src={"/achievement.svg"} alt={"achievement"} />
                </div>
                <img className={s.logo} src={"/logo.jpg"} alt="logo" />
            </div>
        </header>
    );
}
