export type Elements = {
    id: number;
    name: string;
    image: string;
    description: string;
    isCorrect: boolean;
    rounding: boolean;
};

export type Results = {
    id: number;
    level: number;
    class: number[];
    points: number;
    name: string;
    description: string;
    image: string;
    elements: Elements[];
    dependsOn: number[];
    completed: boolean;
};
