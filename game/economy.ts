import { jobMap } from "@/data/jobs";
import { seededRandom } from "@/game/random";
import { clamp } from "@/utils/format";
import type { Player } from "@/types";

const livingCost: Record<Player["currentCity"], number> = {
  一线城市: 90000,
  新一线城市: 68000,
  二线城市: 56000,
  三四线城市: 44000,
  县城: 35000,
  乡镇农村: 26000,
};

export function calculateAnnualEconomy(player: Player, seed = "economy", cursor = 0) {
  const job = jobMap[player.currentJob];
  const experience = Math.min(0.55, player.careerHistory.length * 0.045);
  const ability = (player.attributes.career + player.attributes.intelligence - 100) / 250;
  const variance = (seededRandom(seed, cursor) - 0.5) * 0.14;
  const retired = player.stage === "退休" && player.currentJob === "unemployed";
  const income = retired
    ? Math.max(28000, player.assets.annualIncome * 0.46)
    : Math.max(0, job.baseIncome * (1 + experience + ability + variance));
  const householdFactor = 1 + player.children * 0.18 + (player.marriage === "已婚" ? 0.22 : 0);
  const housingCost = player.assets.house === "按揭住房" ? Math.max(24000, player.assets.mortgage * 0.055) : player.assets.house === "租房" ? livingCost[player.currentCity] * 0.36 : 0;
  const medical = player.attributes.health < 40 ? 16000 : player.age > 60 ? 8000 : 2500;
  const expense = livingCost[player.currentCity] * householdFactor + housingCost + medical;
  return { income: Math.round(income), expense: Math.round(expense) };
}

export function simulateEconomy(player: Player, years: number, seed = "economy", cursor = 0): Player {
  const next = structuredClone(player);
  for (let year = 0; year < years; year += 1) {
    const { income, expense } = calculateAnnualEconomy(next, seed, cursor + year);
    const familySupport =
      next.age + year < 18
        ? 1
        : next.currentJob === "student" && next.age + year <= 22
          ? { 困难: 0.3, 普通: 0.55, 小康: 0.78, 富裕: 0.92 }[next.birth.familyWealth]
          : 0;
    const personalExpense = Math.round(expense * (1 - familySupport));
    next.assets.annualIncome = income;
    next.assets.annualExpense = expense;
    next.assets.savings += income - personalExpense;
    if (next.assets.savings < 0) {
      next.assets.otherDebt += Math.abs(next.assets.savings);
      next.assets.savings = 0;
      next.attributes.stress = clamp(next.attributes.stress + 4);
    }
    next.assets.totalIncome += income;
    next.assets.totalExpense += personalExpense;
    next.assets.peakAnnualIncome = Math.max(next.assets.peakAnnualIncome, income);
    if (next.assets.mortgage > 0) {
      next.assets.mortgage = Math.max(0, Math.round(next.assets.mortgage * 0.97));
      if (next.assets.mortgage === 0) next.assets.house = "全款住房";
    }
    if (next.assets.investments > 0) {
      next.assets.investments = Math.round(next.assets.investments * (0.96 + seededRandom(`${seed}:invest`, cursor + year) * 0.13));
    }
  }
  return next;
}
