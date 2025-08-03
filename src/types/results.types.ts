export type Results = {
    id: number,
    name: string,
    image: string,
    description: string,
    elements: Elements[],
}

export type Elements = {
    id: number,
    name: string,
    image: string,
    isCorrect: boolean,
}