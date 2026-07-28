import { describe, expect, it } from "vitest";
import { randomBirthProfile } from "@/game/birth";
import { initializePlayer } from "@/game/initialize";
import { seededRandom } from "@/game/random";
import { birthFixture } from "@/tests/fixtures";

describe("出生与随机系统", () => {
  it("固定 seed 生成完全一致的随机序列", () => {
    const first = Array.from({ length: 8 }, (_, index) => seededRandom("same-life", index));
    const second = Array.from({ length: 8 }, (_, index) => seededRandom("same-life", index));
    expect(first).toEqual(second);
  });

  it("固定 seed 生成一致的出生档案", () => {
    expect(randomBirthProfile("daily-2026-07-28")).toEqual(
      randomBirthProfile("daily-2026-07-28"),
    );
  });

  it("按家庭与天赋初始化出生属性且全部在 0 到 100", () => {
    const player = initializePlayer(birthFixture);
    expect(player.attributes.intelligence).toBeGreaterThan(50);
    expect(player.attributes.family).toBeGreaterThan(55);
    expect(Object.values(player.attributes).every((value) => value >= 0 && value <= 100)).toBe(true);
    expect(player.relationships).toHaveLength(2);
  });
});
