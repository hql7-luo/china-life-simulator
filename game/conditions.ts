import type { AchievementCondition, EventCondition, Player } from "@/types";
import { seededRandom } from "@/game/random";

function attributesMeet(
  values: Player["attributes"],
  minimum?: Partial<Player["attributes"]>,
  maximum?: Partial<Player["attributes"]>,
): boolean {
  if (
    minimum &&
    Object.entries(minimum).some(
      ([key, value]) => values[key as keyof typeof values] < (value ?? 0),
    )
  )
    return false;
  if (
    maximum &&
    Object.entries(maximum).some(
      ([key, value]) => values[key as keyof typeof values] > (value ?? 100),
    )
  )
    return false;
  return true;
}

export function eventConditionMet(
  condition: EventCondition | undefined,
  player: Player,
  seed = "condition",
  cursor = 0,
): boolean {
  if (!condition) return true;
  if (condition.minAge !== undefined && player.age < condition.minAge)
    return false;
  if (condition.maxAge !== undefined && player.age > condition.maxAge)
    return false;
  if (condition.stage && condition.stage !== player.stage) return false;
  if (
    !attributesMeet(
      player.attributes,
      condition.minAttributes,
      condition.maxAttributes,
    )
  )
    return false;
  if (
    condition.education &&
    !condition.education.includes(player.educationRoute)
  )
    return false;
  if (condition.jobs && !condition.jobs.includes(player.currentJob))
    return false;
  if (condition.regions && !condition.regions.includes(player.birth.region))
    return false;
  if (condition.cityTiers && !condition.cityTiers.includes(player.currentCity))
    return false;
  if (condition.marriage && !condition.marriage.includes(player.marriage))
    return false;
  if (condition.requiredTags?.some((tag) => !player.tags.includes(tag)))
    return false;
  if (condition.excludedTags?.some((tag) => player.tags.includes(tag)))
    return false;
  if (
    condition.chance !== undefined &&
    seededRandom(`${seed}:${condition.chance}`, cursor) > condition.chance
  )
    return false;
  return true;
}

export function achievementConditionMet(
  condition: AchievementCondition,
  player: Player,
): boolean {
  if (condition.minAge !== undefined && player.age < condition.minAge)
    return false;
  if (
    condition.minSavings !== undefined &&
    player.assets.savings < condition.minSavings
  )
    return false;
  if (
    condition.maxSavings !== undefined &&
    player.assets.savings > condition.maxSavings
  )
    return false;
  if (!attributesMeet(player.attributes, condition.minAttributes)) return false;
  if (
    condition.education &&
    !condition.education.includes(player.educationRoute)
  )
    return false;
  if (
    condition.jobs &&
    !condition.jobs.includes(player.currentJob) &&
    !player.careerHistory.some((record) =>
      condition.jobs?.includes(record.jobId),
    )
  ) {
    return false;
  }
  if (condition.marriage && !condition.marriage.includes(player.marriage))
    return false;
  if (condition.house && !condition.house.includes(player.assets.house))
    return false;
  if (condition.requiredTags?.some((tag) => !player.tags.includes(tag)))
    return false;
  if (
    condition.minCareerCount !== undefined &&
    player.careerHistory.length < condition.minCareerCount
  )
    return false;
  return true;
}
