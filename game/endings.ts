import { endings } from "@/data/endings";
import { achievementConditionMet } from "@/game/conditions";
import type { EndingResult, Player, TimelineEntry } from "@/types";

export function calculateEnding(player: Player, timeline: TimelineEntry[]): EndingResult {
  const ending = [...endings]
    .sort((a, b) => b.priority - a.priority)
    .find((candidate) => achievementConditionMet(candidate.condition, player)) ?? endings[endings.length - 1]!;
  const attributeValues = Object.values(player.attributes);
  const attributeScore = Math.round(attributeValues.reduce((sum, value) => sum + value, 0) / attributeValues.length);
  const topChoices = [...timeline]
    .sort((a, b) => b.changes.length - a.changes.length)
    .slice(0, 3);
  const regret = [...timeline].reverse().find((entry) => entry.changes.some((change) => change.includes("-")));
  const keywords = [
    player.tags.includes("快乐第一") ? "悦己" : null,
    player.tags.includes("一线漂泊") ? "城市闯荡" : null,
    player.tags.includes("回到家乡") ? "归乡" : null,
    player.attributes.family >= 70 ? "重视家庭" : null,
    player.attributes.career >= 75 ? "事业进取" : null,
    player.attributes.health >= 70 ? "身心有度" : null,
    player.educationRoute,
    player.birth.personality,
  ].filter((item): item is string => Boolean(item));
  return {
    ending,
    attributeScore,
    wealthSummary:
      player.assets.savings + player.assets.investments > player.assets.mortgage + player.assets.otherDebt
        ? "资产稳健，留有余地"
        : player.assets.otherDebt + player.assets.mortgage > 800000
          ? "仍在承担长期负债"
          : "收支普通，基本平衡",
    familySummary:
      player.attributes.family >= 75
        ? "亲密可靠，彼此支持"
        : player.attributes.family >= 50
          ? "有过摩擦，也仍有联系"
          : "关系渐远，留下未说完的话",
    topChoices,
    regret,
    keywords: [...new Set(keywords)].slice(0, 6),
  };
}
