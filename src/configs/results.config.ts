import DEFAULT_CHERTEZH from "../../public/default_chertezh.jpg";


/*
    {
        id: 1, // уникальный номер для опыта
        points: 324, // количество очков за каждый опыт (20 * кол-во правильных элементов, -5 если есть свой чертеж)
        name: "Вода", // название выводимого результата из опыта
        image: "/results/water.png", // путь до фотографии результата из опыта
        drawing: "/drawings/water_chertez.jgp", // путь до фотографии чертежа, если его нет, то DEFAULT_CHERTEZH
        description: "Самое распространённое вещество на Земле", // описание результата из рецепта

        // НЕ РЕКОМЕНДУЕТСЯ ДОБАВЛЯТЬ ОДИНАКОВЫЕ ЭЛЕМЕНТЫ, ЕСЛИ <isCorrect> БУДЕТ ПРОТИВОПОЛОЖНЫМ У НИХ
        elements: [
            {
                 id: 1, // уникальный номер для элемента в каждом рецепте (НЕЛЬЗЯ ПОВТОРЯТЬСЯ ВНУТРИ ОДНОГО РЕЦЕПТА !!)
                 name: "H", // название элемента
                 image: "/elements/h.svg", // путь до фотографии элемента
                 isCorrect: true, // подходит ли элемент для совмещения?
                 rounding: false // закруглять ли фото? (совет: true - если фото имеет фон, либо квадратное)
            },
            ...,
            ...,
            ...,
            { id: 4, name: "C", image: "/elements/C.png", isCorrect: false, rounding: false },
        ],
    },
*/

export const RESULTS = [
    {
        id: 1,
        points: 75,
        name: "Ручной типографский станок",
        image: "/results/ruchnoi_tipografskii_stanok.jpg",
        drawing: "/drawings/ruchnoi_tipografskii_stanok_chertezh.jpg",
        description: "Механизм для печати, использующий винтовую передачу, бумагу и печатную форму с чернилами.",
        elements: [
            { id: 1, name: "Винтовая передача", image: "/elements/vintovaja_peredacha.png", isCorrect: true, rounding: false },
            { id: 2, name: "Бумага", image: "/elements/bumaga.jpg", isCorrect: true, rounding: false },
            { id: 3, name: "Печатная форма", image: "/elements/pechatnaja_forma.webp", isCorrect: true, rounding: false },
            { id: 4, name: "Чернила", image: "/elements/chernila.webp", isCorrect: true, rounding: false },
            { id: 5, name: "Поршень", image: "/elements/porshen.jpg", isCorrect: false, rounding: false },
            { id: 6, name: "Лопасть", image: "/elements/lopast.jpg", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 2,
        points: 20,
        name: "Бумага",
        image: "/results/bumaga.jpg",
        drawing: DEFAULT_CHERTEZH,
        description: "Основа для записи и печати, изготовленная из измельчённых растительных волокон.",
        elements: [
            { id: 1, name: "Измельченные растительные волокна", image: "/elements/izmelchennye_rastitelnye_volokna.jfif", isCorrect: true, rounding: false },
            { id: 2, name: "Винт", image: "/elements/vint.webp", isCorrect: false, rounding: false },
            { id: 3, name: "Сургуч", image: "/elements/surguch.webp", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 3,
        points: 40,
        name: "Печатная форма",
        image: "/results/pechatnaja_forma.webp",
        drawing: DEFAULT_CHERTEZH,
        description: "Металлическая форма для переноса изображения на бумагу с помощью литер и типографских сплавов.",
        elements: [
            { id: 1, name: "Типографские сплавы (гарт)", image: "/elements/tipografskie_splavy_gart.webp", isCorrect: true, rounding: false },
            { id: 2, name: "Подвижные литеры", image: "/elements/podvizhnye_litery.jpg", isCorrect: true, rounding: false },
            { id: 3, name: "Цепь", image: "/elements/tsep.png", isCorrect: false, rounding: false },
            { id: 4, name: "Архимедов винт", image: "/elements/arhimedov_vint.jpeg", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 4,
        points: 40,
        name: "Чернила",
        image: "/results/chernila.webp",
        drawing: DEFAULT_CHERTEZH,
        description: "Пигмент для печати, изготовленный из угля и связующего вещества (гуммиарабик).",
        elements: [
            { id: 1, name: "Уголь", image: "/elements/ugol.webp", isCorrect: true, rounding: false },
            { id: 2, name: "Гуммиарабик", image: "/elements/gummiarabik.webp", isCorrect: true, rounding: false },
            { id: 3, name: "Винт", image: "/elements/vint.webp", isCorrect: false, rounding: false },
            { id: 4, name: "Лопасть", image: "/elements/lopast.jpg", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 5,
        points: 40,
        name: "Винтовая передача",
        image: "/results/vintovaja_peredacha.png",
        drawing: DEFAULT_CHERTEZH,
        description: "Механизм для передачи вращения с винта на гайку, используемый в различных машинах.",
        elements: [
            { id: 1, name: "Винт", image: "/elements/vint.webp", isCorrect: true, rounding: false },
            { id: 2, name: "Гайка", image: "/elements/gaika.jpeg", isCorrect: true, rounding: false },
            { id: 3, name: "Чернила", image: "/elements/chernila.webp", isCorrect: false, rounding: false },
            { id: 4, name: "Подвижные литеры", image: "/elements/podvizhnye_litery.jpg", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 6,
        points: 55,
        name: "Винтовой пресс",
        image: "/results/vintovoi_press.jpg",
        drawing: "/drawings/vintovoi_press_chertezh.jpg",
        description: "Устройство для прессования с использованием винтовой передачи, поршня и штемпеля.",
        elements: [
            { id: 1, name: "Винтовая передача", image: "/elements/vintovaja_peredacha.png", isCorrect: true, rounding: false },
            { id: 2, name: "Поршень", image: "/elements/porshen.jpg", isCorrect: true, rounding: false },
            { id: 3, name: "Штемпель", image: "/elements/shtempel.jpg", isCorrect: true, rounding: false },
            { id: 4, name: "Лопасть", image: "/elements/lopast.jpg", isCorrect: false, rounding: false },
            { id: 5, name: "Цепь", image: "/elements/tsep.png", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 7,
        points: 60,
        name: "Штамп",
        image: "/results/shtamp.jpg",
        drawing: DEFAULT_CHERTEZH,
        description: "Инструмент для оттиска, состоящий из штемпеля, сургуча и чернил.",
        elements: [
            { id: 1, name: "Штемпель", image: "/elements/shtempel.jpg", isCorrect: true, rounding: false },
            { id: 2, name: "Сургуч", image: "/elements/surguch.webp", isCorrect: true, rounding: false },
            { id: 3, name: "Чернила", image: "/elements/chernila.webp", isCorrect: true, rounding: false },
            { id: 4, name: "Винт", image: "/elements/vint.webp", isCorrect: false, rounding: false },
            { id: 5, name: "Поршень", image: "/elements/porshen.jpg", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 8,
        points: 60,
        name: "Ветровая мельница",
        image: "/results/vetrovaja_melnitsa_1.webp",
        drawing: DEFAULT_CHERTEZH,
        description: "Мельница, приводимая в движение силой ветра через коронное колесо, лопасти и жернова.",
        elements: [
            { id: 1, name: "Коронное колесо", image: "/elements/koronnoe_koleso.jpg", isCorrect: true, rounding: false },
            { id: 2, name: "Лопасть", image: "/elements/lopast.jpg", isCorrect: true, rounding: false },
            { id: 3, name: "Жернова", image: "/elements/zhernov.webp", isCorrect: true, rounding: false },
            { id: 4, name: "Цепь", image: "/elements/tsep.png", isCorrect: false, rounding: false },
            { id: 5, name: "Поршень", image: "/elements/porshen.jpg", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 9,
        points: 55,
        name: "Водяная мельница",
        image: "/results/vodjanaja_melnitsa.webp",
        drawing: "/drawings/vodjanaja_melnitsa_chertezh_2.jpg",
        description: "Мельница, работающая за счёт потока воды, передающего движение на коронное колесо и жернова.",
        elements: [
            { id: 1, name: "Коронное колесо", image: "/elements/koronnoe_koleso.jpg", isCorrect: true, rounding: false },
            { id: 2, name: "Лопасть", image: "/elements/lopast.jpg", isCorrect: true, rounding: false },
            { id: 3, name: "Жернова", image: "/elements/zhernov.webp", isCorrect: true, rounding: false },
            { id: 4, name: "Винт", image: "/elements/vint.webp", isCorrect: false, rounding: false },
            { id: 5, name: "Печатная форма", image: "/elements/pechatnaja_forma.webp", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 10,
        points: 55,
        name: "Велосипед",
        image: "/results/velosiped.jpg",
        drawing: "/drawings/velosiped_chertezh.jpg",
        description: "Транспортное средство с колесами и цепным приводом, обеспечивающее движение через педали.",
        elements: [
            { id: 1, name: "Передаточный механизм", image: "/elements/peredatochnyi_mehanizm.jfif", isCorrect: true, rounding: false },
            { id: 2, name: "Цепь", image: "/elements/tsep.png", isCorrect: true, rounding: false },
            { id: 3, name: "Колесо", image: "/elements/koleso.png", isCorrect: true, rounding: false },
            { id: 4, name: "Шток", image: "/elements/shtok.jpg", isCorrect: false, rounding: false },
            { id: 5, name: "Чернила", image: "/elements/chernila.webp", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 11,
        points: 40,
        name: "Передаточный механизм",
        image: "/results/peredatochnyi_mehanizm.jfif",
        drawing: DEFAULT_CHERTEZH,
        description: "Механизм для передачи вращения с помощью зубчатых колес и эвольвентного зацепления.",
        elements: [
            { id: 1, name: "Зубчатое колесо", image: "/elements/zubchatoe_koleso.png", isCorrect: true, rounding: false },
            { id: 2, name: "Эвольвентное зацепление", image: "/elements/evolventnoe_zatseplenie.jpg", isCorrect: true, rounding: false },
            { id: 3, name: "Винт", image: "/elements/vint.webp", isCorrect: false, rounding: false },
            { id: 4, name: "Гайка", image: "/elements/gaika.jpeg", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 12,
        points: 55,
        name: "Шестеренный насос",
        image: "/results/shnekovyi_nasos.webp",
        drawing: "/drawings/shnekovyi_nasos.jpg",
        description: "Насос для перемещения жидкости с помощью зубчатых колес и трубопроводной системы.",
        elements: [
            { id: 1, name: "Зубчатое колесо", image: "/elements/zubchatoe_koleso.png", isCorrect: true, rounding: false },
            { id: 2, name: "Эвольвентное зацепление", image: "/elements/evolventnoe_zatseplenie.jpg", isCorrect: true, rounding: false },
            { id: 3, name: "Труба", image: "/elements/truba.png", isCorrect: true, rounding: false },
            { id: 4, name: "Цепь", image: "/elements/tsep.png", isCorrect: false, rounding: false },
            { id: 5, name: "Штемпель", image: "/elements/shtempel.jpg", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 13,
        points: 100,
        name: "Поршневой насос",
        image: "/results/porshnevyi_nasos.webp",
        drawing: DEFAULT_CHERTEZH,
        description: "Насос с поршнем и кривошипным механизмом для подачи жидкости через клапаны и трубы.",
        elements: [
            { id: 1, name: "Кривошип", image: "/elements/krivoship.webp", isCorrect: true, rounding: false },
            { id: 2, name: "Поршень", image: "/elements/porshen.jpg", isCorrect: true, rounding: false },
            { id: 3, name: "Шатун", image: "/elements/shatun.jpg", isCorrect: true, rounding: false },
            { id: 4, name: "Клапан", image: "/elements/klapan.jpg", isCorrect: true, rounding: false },
            { id: 5, name: "Труба", image: "/elements/truba.png", isCorrect: true, rounding: false },
            { id: 6, name: "Винт", image: "/elements/vint.webp", isCorrect: false, rounding: false },
            { id: 7, name: "Гуммиарабик", image: "/elements/gummiarabik.webp", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 14,
        points: 35,
        name: "Шнековый насос",
        image: "/results/shesterennyi_nasos.jpg",
        drawing: "/drawings/shesterennyi_nasos_chertezh.png",
        description: "Устройство для перемещения жидкости с помощью Архимедова винта и трубы.",
        elements: [
            { id: 1, name: "Архимедов винт", image: "/elements/arhimedov_vint.jpeg", isCorrect: true, rounding: false },
            { id: 2, name: "Труба", image: "/elements/truba.png", isCorrect: true, rounding: false },
            { id: 3, name: "Колесо", image: "/elements/koleso.png", isCorrect: false, rounding: false },
            { id: 4, name: "Печатная форма", image: "/elements/pechatnaja_forma.webp", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 15,
        points: 20,
        name: "Клапан",
        image: "/results/klapan.jpg",
        drawing: DEFAULT_CHERTEZH,
        description: "Механический элемент для управления потоком жидкости через трубу.",
        elements: [
            { id: 1, name: "Труба", image: "/elements/truba.png", isCorrect: true, rounding: false },
            { id: 2, name: "Винт", image: "/elements/vint.webp", isCorrect: false, rounding: false },
            { id: 3, name: "Шток", image: "/elements/shtok.jpg", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 16,
        points: 60,
        name: "Поршень",
        image: "/results/porshen.jpg",
        drawing: DEFAULT_CHERTEZH,
        description: "Движущийся элемент для создания давления в системе с трубами и штоком.",
        elements: [
            { id: 1, name: "Труба", image: "/elements/truba.png", isCorrect: true, rounding: false },
            { id: 2, name: "Шток", image: "/elements/shtok.jpg", isCorrect: true, rounding: false },
            { id: 3, name: "Наконечник поршня", image: "/elements/nakonechnik_porshnja.jpg", isCorrect: true, rounding: false },
            { id: 4, name: "Цепь", image: "/elements/tsep.png", isCorrect: false, rounding: false },
            { id: 5, name: "Гуммиарабик", image: "/elements/gummiarabik.webp", isCorrect: false, rounding: false },
        ],
    },
];
