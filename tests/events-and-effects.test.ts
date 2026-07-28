import { describe, expect, it } from "vitest";
import {
  allEvents,
  careerEvents,
  educationEvents,
  eventCounts,
  familyEvents,
  hiddenEvents,
  regularEvents,
} from "@/data/events";
import { achievements } from "@/data/achievements";
import { endings } from "@/data/endings";
import { eventConditionMet } from "@/game/conditions";
import { applyChoice } from "@/game/effects";
import { initializePlayer } from "@/game/initialize";
import { birthFixture } from "@/tests/fixtures";
import type { LifeEvent } from "@/types";

describe("事件触发与选择效果", () => {
  it("事件目录满足六类内容数量要求", () => {
    expect(eventCounts).toMatchObject({
      regular: 120,
      education: 40,
      career: 50,
      family: 30,
      regional: 20,
      hidden: 20,
      total: 280,
    });
    expect(new Set(allEvents.map((event) => event.id)).size).toBe(
      allEvents.length,
    );
  });

  it("年龄、地区、职业和标签条件会阻止错误触发", () => {
    const player = initializePlayer(birthFixture);
    expect(eventConditionMet({ minAge: 20 }, player)).toBe(false);
    expect(eventConditionMet({ regions: ["华东"] }, player)).toBe(true);
    expect(eventConditionMet({ jobs: ["internet"] }, player)).toBe(false);
    expect(eventConditionMet({ requiredTags: ["不存在"] }, player)).toBe(false);
  });

  it("选择后推进年龄并正确限制属性上下限", () => {
    const player = initializePlayer(birthFixture);
    player.attributes.health = 98;
    player.attributes.stress = 2;
    const event: LifeEvent = {
      id: "bounds",
      category: "普通",
      title: "边界测试",
      description: "测试属性边界。",
      years: 2,
      choices: [
        {
          id: "choose",
          text: "选择",
          effects: { attributes: { health: 20, stress: -20 } },
        },
      ],
    };
    const result = applyChoice(player, event, event.choices[0]!, "test", 0);
    expect(result.player.age).toBe(8);
    expect(result.player.attributes.health).toBe(100);
    expect(result.player.attributes.stress).toBe(0);
  });

  it("教育路线与职业路线会写入对应履历", () => {
    const player = initializePlayer(birthFixture);
    const event: LifeEvent = {
      id: "route",
      category: "教育",
      title: "路线选择",
      description: "测试路线。",
      years: 3,
      choices: [
        {
          id: "choose",
          text: "读本科并进入制造业",
          effects: { educationRoute: "本科", jobId: "manufacturing" },
        },
      ],
    };
    const result = applyChoice(player, event, event.choices[0]!, "test", 0);
    expect(result.player.educationRoute).toBe("本科");
    expect(result.player.educationHistory.at(-1)?.route).toBe("本科");
    expect(result.player.currentJob).toBe("manufacturing");
    expect(result.player.careerHistory.at(-1)?.jobId).toBe("manufacturing");
  });

  it("人物关系新增与变化按规则执行", () => {
    const player = initializePlayer(birthFixture);
    const event: LifeEvent = {
      id: "relationship",
      category: "家庭",
      title: "认识新朋友",
      description: "测试关系。",
      years: 1,
      choices: [
        {
          id: "choose",
          text: "成为朋友",
          effects: {
            addRelationship: {
              name: "周予安",
              type: "朋友",
              affection: 70,
              trust: 65,
              status: "常联系",
              memories: ["第一次见面"],
            },
            relationshipChange: {
              type: "父母",
              affection: 5,
              trust: 3,
              memory: "一次长谈",
            },
          },
        },
      ],
    };
    const result = applyChoice(player, event, event.choices[0]!, "test", 0);
    expect(
      result.player.relationships.some((item) => item.name === "周予安"),
    ).toBe(true);
    expect(result.player.relationships[0]?.memories).toContain("一次长谈");
  });

  it("结婚后恋人会转为配偶，后续家庭事件可以更新关系", () => {
    const player = initializePlayer(birthFixture);
    player.marriage = "恋爱中";
    player.relationships.push({
      id: "partner",
      name: "周予安",
      type: "恋人",
      affection: 70,
      trust: 66,
      status: "正在交往",
      memories: [],
    });
    const marriageEvent = familyEvents.find(
      (event) => event.id === "family-marriage",
    )!;
    const married = applyChoice(
      player,
      marriageEvent,
      marriageEvent.choices[0]!,
      "test",
      0,
    ).player;
    expect(married.marriage).toBe("已婚");
    expect(
      married.relationships.find((item) => item.id === "partner")?.type,
    ).toBe("配偶");

    married.attributes.stress = 60;
    const distanceEvent = familyEvents.find(
      (event) => event.id === "family-distance",
    )!;
    const repaired = applyChoice(
      married,
      distanceEvent,
      distanceEvent.choices[0]!,
      "test",
      1,
    ).player;
    expect(
      repaired.relationships.find((item) => item.id === "partner")?.memories,
    ).toContain("你们在一次长谈后重新理解了彼此。");
  });

  it("存款不足以支付选择成本时，差额会计入其他负债", () => {
    const player = initializePlayer(birthFixture);
    player.assets.savings = 5_000;
    const event: LifeEvent = {
      id: "insufficient-cash",
      category: "普通",
      title: "大额支出",
      description: "测试现金不足。",
      years: 1,
      choices: [{ id: "pay", text: "支付", effects: { savings: -20_000 } }],
    };
    const result = applyChoice(player, event, event.choices[0]!, "test", 0);
    expect(result.player.assets.savings).toBe(0);
    expect(result.player.assets.otherDebt).toBeGreaterThanOrEqual(15_000);
  });

  it("事件条件区间有效，结局和成就所需标签都有获取来源", () => {
    for (const event of allEvents) {
      if (
        event.condition?.minAge !== undefined &&
        event.condition.maxAge !== undefined
      ) {
        expect(event.condition.minAge).toBeLessThanOrEqual(
          event.condition.maxAge,
        );
      }
    }
    const producibleTags = new Set(
      allEvents.flatMap((event) =>
        event.choices.flatMap((choice) => choice.effects.addTags ?? []),
      ),
    );
    const requiredTags = [...achievements, ...endings].flatMap(
      (item) => item.condition.requiredTags ?? [],
    );
    for (const tag of requiredTags)
      expect(producibleTags.has(tag), tag).toBe(true);
  });

  it("抽查二十个普通事件时，生成选项会结合具体主题", () => {
    const sample = regularEvents.slice(0, 20);
    expect(sample).toHaveLength(20);
    expect(
      new Set(
        sample.flatMap((event) => event.choices.map((choice) => choice.text)),
      ).size,
    ).toBeGreaterThan(25);
    for (const event of sample.filter((item) =>
      item.id.startsWith("regular-"),
    )) {
      const topic = event.title.split("｜")[0]!;
      expect(event.choices.some((choice) => choice.text.includes(topic))).toBe(
        true,
      );
    }
  });

  it("教育、职业、家庭、结局和成就抽样内容完整且没有重复标题", () => {
    const eventSamples = [
      educationEvents.slice(0, 10),
      careerEvents.slice(0, 10),
      familyEvents.slice(0, 10),
    ];
    for (const sample of eventSamples) {
      expect(sample).toHaveLength(10);
      expect(new Set(sample.map((event) => event.title)).size).toBe(10);
      for (const event of sample) {
        expect(event.description.length).toBeGreaterThan(20);
        expect(event.choices.length).toBeGreaterThanOrEqual(2);
        for (const choice of event.choices)
          expect(Object.keys(choice.effects).length).toBeGreaterThan(0);
      }
    }
    expect(
      new Set(endings.slice(0, 10).map((ending) => ending.name)).size,
    ).toBe(10);
    expect(
      new Set(achievements.slice(0, 10).map((achievement) => achievement.name))
        .size,
    ).toBe(10);
  });

  it("隐藏事件需要对应历史标签", () => {
    const player = initializePlayer(birthFixture);
    const event = hiddenEvents.find((item) => item.id === "hidden-kindness")!;
    expect(
      eventConditionMet({ ...event.condition, chance: undefined }, player),
    ).toBe(false);
    player.tags.push("仗义相助");
    player.age = 40;
    expect(
      eventConditionMet({ ...event.condition, chance: undefined }, player),
    ).toBe(true);
  });
});
