import { describe, expect, it } from "vitest";
import { calculateUnlockedAchievements } from "@/game/achievements";
import { calculateAnnualEconomy, simulateEconomy } from "@/game/economy";
import { calculateEnding } from "@/game/endings";
import { initializePlayer } from "@/game/initialize";
import { birthFixture } from "@/tests/fixtures";

describe("经济、成就与结局", () => {
  it("不同职业与城市计算正数收入和合理支出", () => {
    const player = initializePlayer(birthFixture);
    player.currentJob = "internet";
    player.currentCity = "一线城市";
    const economy = calculateAnnualEconomy(player, "economy", 0);
    expect(economy.income).toBeGreaterThan(0);
    expect(economy.expense).toBeGreaterThan(50000);
  });

  it("多年经济模拟累计收入、支出并处理负债", () => {
    const player = initializePlayer(birthFixture);
    player.currentJob = "service";
    player.currentCity = "一线城市";
    player.age = 30;
    player.stage = "职业";
    player.assets.savings = 0;
    const result = simulateEconomy(player, 3, "economy", 0);
    expect(result.assets.totalIncome).toBeGreaterThan(0);
    expect(result.assets.totalExpense).toBeGreaterThan(0);
    expect(result.assets.otherDebt).toBeGreaterThanOrEqual(0);
  });

  it("未成年人的基础生活费由家庭承担，不直接耗尽个人资源", () => {
    const player = initializePlayer(birthFixture);
    const initialSavings = player.assets.savings;
    const result = simulateEconomy(player, 5, "childhood", 0);
    expect(result.assets.savings).toBe(initialSavings);
    expect(result.assets.otherDebt).toBe(0);
  });

  it("达到标签与属性条件后解锁成就", () => {
    const player = initializePlayer(birthFixture);
    player.age = 76;
    player.assets.house = "租房";
    player.tags.push("健康管理");
    player.attributes.health = 82;
    const unlocked = calculateUnlockedAchievements(player);
    expect(unlocked).toContain("no-house");
    expect(unlocked).toContain("health-first");
  });

  it("结局计算不只依赖财富并始终返回结果", () => {
    const player = initializePlayer(birthFixture);
    player.age = 81;
    player.attributes.happiness = 88;
    player.attributes.family = 80;
    player.assets.savings = 10000;
    const result = calculateEnding(player, []);
    expect([
      "快乐但没什么钱",
      "普通而幸福的一生",
      "把家放在心里的人",
    ]).toContain(result.ending.name);
    expect(result.attributeScore).toBeGreaterThan(0);
  });

  it("退休后仍会按完整职业履历判断职业类结局", () => {
    const player = initializePlayer(birthFixture);
    player.age = 81;
    player.currentJob = "unemployed";
    player.attributes.career = 68;
    player.careerHistory.push({
      age: 27,
      year: 2025,
      jobId: "civil-service",
      title: "公务员",
      action: "入职",
      annualIncome: 115_000,
    });
    const result = calculateEnding(player, []);
    expect(result.ending.id).toBe("civil-stable");
  });
});
