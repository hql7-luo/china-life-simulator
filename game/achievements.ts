import { achievements } from "@/data/achievements";
import { achievementConditionMet } from "@/game/conditions";
import type { Player } from "@/types";

export function calculateUnlockedAchievements(player: Player): string[] {
  return achievements.filter((achievement) => achievementConditionMet(achievement.condition, player)).map((achievement) => achievement.id);
}
