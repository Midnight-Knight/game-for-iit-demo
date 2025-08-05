import { TIME_MULTIPLIERS } from "../constants/rules.ts";

export function calculateScore(basePoints: number, time: number): number {
    const { multiplier } = TIME_MULTIPLIERS.find(({ maxTime }) => time <= maxTime)!;
    return Math.round(basePoints * multiplier);
}
