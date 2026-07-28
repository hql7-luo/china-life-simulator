import { dailySeed } from "@/game/random";
import type { DailyChallenge } from "@/types";

const challengePool = [
  ["百万目标", "三十岁前让存款达到 100 万元。"],
  ["幸福不靠房本", "不依靠买房，获得快乐值 75 以上的人生。"],
  ["技能突围", "从职业学校出发，进入高收入行业。"],
  ["人生下半场", "五十岁后完成一次成功转行。"],
  ["高压守护", "在压力超过 70 时，仍把健康保持在 60 以上。"],
] as const;

export function getDailyChallenge(date = new Date()): DailyChallenge {
  const seed = dailySeed(date);
  const dateKey = seed.replace("daily-", "");
  const numeric = Number(dateKey.replaceAll("-", ""));
  const challenge = challengePool[numeric % challengePool.length]!;
  return {
    id: `challenge-${numeric % challengePool.length}`,
    date: dateKey,
    seed,
    title: challenge[0],
    description: challenge[1],
  };
}
