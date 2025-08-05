export const TIME_MULTIPLIERS = [
    { maxTime: 15 * 1000, multiplier: 2.5 },        // ≤ 15 секунд, множитель 2.5
    { maxTime: 30 * 1000, multiplier: 2 },          // ≤ 30 секунд, множитель 2
    { maxTime: 60 * 1000, multiplier: 1 },          // ≤ 1 минута, множитель 1
    { maxTime: 2 * 60 * 1000, multiplier: 0.5 },    // ≤ 2 минуты, множитель 0,5
    { maxTime: Infinity, multiplier: 0.3 },         // > 2 минут, множитель 0.3
];

export const MAX_RECIPES = 5; // количество опытов