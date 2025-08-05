/*
    {
        id: 1, // уникальный номер для опыта
        points: 324, // количество очков за каждый опыт
        name: "Вода", // название выводимого результата из опыта
        image: "/results/water.png", // путь до фотографии результата из опыта
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
        points: 324,
        name: "Вода",
        image: "/results/water.png",
        description: "Самое распространённое вещество на Земле",
        elements: [
            { id: 1, name: "H", image: "/elements/H.png", isCorrect: true, rounding: true },
            { id: 2, name: "O", image: "/elements/O.png", isCorrect: true, rounding: false },
            { id: 3, name: "Na", image: "/elements/Na.png", isCorrect: false, rounding: true },
            { id: 4, name: "C", image: "/elements/C.png", isCorrect: false, rounding: false },
        ],
    },
    {
        id: 2,
        points: 34,
        name: "Поваренная соль",
        image: "/results/salt.jpg",
        description: "Хлорид натрия — важная приправа и консервант",
        elements: [
            { id: 1, name: "Na", image: "/elements/Na.png", isCorrect: true, rounding: true },
            { id: 2, name: "Cl", image: "/elements/Cl.png", isCorrect: true, rounding: true },
            { id: 3, name: "H", image: "/elements/H.png", isCorrect: false, rounding: true },
            { id: 4, name: "S", image: "/elements/S.png", isCorrect: false, rounding: true },
            { id: 5, name: "O", image: "/elements/O.png", isCorrect: false, rounding: false },
            { id: 6, name: "K", image: "/elements/K.png", isCorrect: false, rounding: true },
        ],
    },
    {
        id: 3,
        points: 342,
        name: "Углекислый газ",
        image: "/results/co2.png",
        description: "Газ, выделяемый при дыхании и горении",
        elements: [
            { id: 1, name: "H", image: "/elements/H.png", isCorrect: true, rounding: true },
            { id: 2, name: "O", image: "/elements/O.png", isCorrect: true, rounding: false },
            { id: 3, name: "O", image: "/elements/O.png", isCorrect: true, rounding: false },
            { id: 4, name: "N", image: "/elements/N.png", isCorrect: false, rounding: true },
            { id: 6, name: "S", image: "/elements/S.png", isCorrect: false, rounding: true },
        ],
    },
    {
        id: 4,
        points: 342,
        name: "Сахар",
        image: "/results/sugar.png",
        description: "Глюкоза — источник энергии для организма",
        elements: [
            { id: 1, name: "C", image: "/elements/C.png", isCorrect: true, rounding: false },
            { id: 2, name: "H", image: "/elements/H.png", isCorrect: true, rounding: true },
            { id: 3, name: "O", image: "/elements/O.png", isCorrect: true, rounding: false },
            { id: 4, name: "N", image: "/elements/N.png", isCorrect: false, rounding: true },
            { id: 5, name: "Na", image: "/elements/Na.png", isCorrect: false, rounding: true },
            { id: 6, name: "Cl", image: "/elements/Cl.png", isCorrect: false, rounding: true },
        ],
    },
    {
        id: 5,
        points: 342,
        name: "Аммиак",
        image: "/results/ammonia.png",
        description: "Используется в удобрениях и холодильниках",
        elements: [
            { id: 1, name: "N", image: "/elements/N.png", isCorrect: true, rounding: true },
            { id: 2, name: "H", image: "/elements/H.png", isCorrect: true, rounding: true },
            { id: 3, name: "H", image: "/elements/H.png", isCorrect: true, rounding: true },
            { id: 4, name: "H", image: "/elements/H.png", isCorrect: true, rounding: true },
            { id: 5, name: "C", image: "/elements/C.png", isCorrect: false, rounding: false },
            { id: 6, name: "O", image: "/elements/O.png", isCorrect: false, rounding: false },
        ],
    },
];
