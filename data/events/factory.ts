import type { EventCategory, LifeEvent, LifeStage } from "@/types";

interface CatalogOptions {
  prefix: string;
  category: EventCategory;
  count: number;
  topics: string[];
  settings: string[];
  stage?: LifeStage;
  minAge?: number;
  maxAge?: number;
  hidden?: boolean;
}

interface ChoiceCopy {
  action: (topic: string) => string;
  calm: (topic: string) => string;
}

const categoryCopy: Record<EventCategory, ChoiceCopy[]> = {
  普通: [
    {
      action: (topic) => `围绕“${topic}”做个具体决定，马上执行`,
      calm: (topic) => `先处理“${topic}”最现实的一步`,
    },
    {
      action: (topic) => `把“${topic}”排进日程，边做边调整`,
      calm: (topic) => `为“${topic}”留出观察期，再作决定`,
    },
    {
      action: (topic) => `为“${topic}”定下一个能完成的目标`,
      calm: (topic) => `从“${topic}”的小事做起，保留余地`,
    },
    {
      action: (topic) => `主动处理“${topic}”，不再继续拖延`,
      calm: (topic) => `不打乱当前节奏，逐步回应“${topic}”`,
    },
  ],
  教育: [
    {
      action: (topic) => `认真处理“${topic}”，主动争取合适方案`,
      calm: (topic) => `先理清“${topic}”涉及的现实条件`,
    },
    {
      action: (topic) => `针对“${topic}”做一份改进计划`,
      calm: (topic) => `完成当前重点，再处理“${topic}”`,
    },
    {
      action: (topic) => `就“${topic}”请教老师或同学`,
      calm: (topic) => `先改善“${topic}”中最薄弱的一环`,
    },
    {
      action: (topic) => `为“${topic}”补充准备，争取更好结果`,
      calm: (topic) => `保持学习节奏，逐步调整“${topic}”`,
    },
  ],
  职业: [
    {
      action: (topic) => `主动接下与“${topic}”有关的责任`,
      calm: (topic) => `先核算“${topic}”的成本和边界`,
    },
    {
      action: (topic) => `围绕“${topic}”准备方案并承担结果`,
      calm: (topic) => `找关键同事验证“${topic}”的可行性`,
    },
    {
      action: (topic) => `把“${topic}”当成展示能力的机会`,
      calm: (topic) => `明确资源后，再对“${topic}”作出承诺`,
    },
    {
      action: (topic) => `先对齐目标，再推动“${topic}”落地`,
      calm: (topic) => `控制投入，先解决“${topic}”的关键部分`,
    },
  ],
  家庭: [
    {
      action: (topic) => `把“${topic}”说开，共同约定办法`,
      calm: (topic) => `先听完彼此对“${topic}”的真实需要`,
    },
    {
      action: (topic) => `围绕“${topic}”列出都能接受的方案`,
      calm: (topic) => `先减少情绪，再回应“${topic}”`,
    },
    {
      action: (topic) => `主动说明自己对“${topic}”的真实感受`,
      calm: (topic) => `给彼此一点时间消化“${topic}”`,
    },
    {
      action: (topic) => `找个安静时间认真讨论“${topic}”`,
      calm: (topic) => `从日常分工入手，缓解“${topic}”`,
    },
  ],
  地区: [
    {
      action: (topic) => `主动参与“${topic}”，认识本地生活`,
      calm: (topic) => `先了解“${topic}”背后的当地习惯`,
    },
    {
      action: (topic) => `从“${topic}”入手，与本地人交流`,
      calm: (topic) => `多问几位本地人怎么看“${topic}”`,
    },
    {
      action: (topic) => `把“${topic}”当成了解城市的入口`,
      calm: (topic) => `先观察“${topic}”如何影响日常`,
    },
    {
      action: (topic) => `亲自体验“${topic}”，再决定是否深入`,
      calm: (topic) => `保留原有习惯，慢慢适应“${topic}”`,
    },
  ],
  隐藏: [
    {
      action: (topic) => `顺着“${topic}”的线索再往前一步`,
      calm: (topic) => `记下“${topic}”的线索，暂不改变计划`,
    },
    {
      action: (topic) => `给“${topic}”一次认真验证的机会`,
      calm: (topic) => `和可信任的人复盘“${topic}”再决定`,
    },
    {
      action: (topic) => `放下成见，看看“${topic}”会通向哪里`,
      calm: (topic) => `核实“${topic}”的风险，不被惊喜冲昏头`,
    },
    {
      action: (topic) => `记录“${topic}”的细节，主动追查来源`,
      calm: (topic) => `保持原计划，继续观察“${topic}”`,
    },
  ],
};

const descriptionTemplates = [
  (topic: string, setting: string) =>
    `${setting}，“${topic}”忽然有了具体的期限。你需要在投入和日常秩序之间做出取舍。`,
  (topic: string, setting: string) =>
    `${setting}，有人再次提起“${topic}”。这次你掌握的信息更多，代价也比想象中清楚。`,
  (topic: string, setting: string) =>
    `${setting}，“${topic}”从一句随口的话变成了真正的待办。拖延和行动都会留下结果。`,
  (topic: string, setting: string) =>
    `${setting}，你发现“${topic}”没有标准答案。眼前的选择，更像是在说明你重视什么。`,
  (topic: string, setting: string) =>
    `${setting}，“${topic}”打乱了原有节奏。你可以趁势向前，也可以先守住已经拥有的东西。`,
  (topic: string, setting: string) =>
    `${setting}，围绕“${topic}”的意见并不一致。最后需要承担后果的人，仍然是你自己。`,
  (topic: string, setting: string) =>
    `${setting}，“${topic}”带来了一个不算完美的机会。它值得尝试，但也需要留好退路。`,
  (topic: string, setting: string) =>
    `${setting}，处理“${topic}”的窗口正在变窄。你决定给这件事一个明确答复。`,
];

export function buildEventCatalog(options: CatalogOptions): LifeEvent[] {
  const copyVariants = categoryCopy[options.category];
  return Array.from({ length: options.count }, (_, index) => {
    const copy = copyVariants[index % copyVariants.length]!;
    const topic = options.topics[index % options.topics.length]!;
    const setting =
      options.settings[
        Math.floor(index / options.topics.length) % options.settings.length
      ]!;
    const bold = index % 3 === 0;
    return {
      id: `${options.prefix}-${String(index + 1).padStart(3, "0")}`,
      category: options.category,
      title: `${topic}｜${setting}`,
      description: descriptionTemplates[index % descriptionTemplates.length]!(
        topic,
        setting,
      ),
      stage: options.stage,
      years: index % 4 === 0 ? 1 : 2,
      rare: options.hidden,
      condition: {
        minAge: options.minAge,
        maxAge: options.maxAge,
        chance: options.hidden ? 0.2 : undefined,
      },
      choices: [
        {
          id: "engage",
          text: copy.action(topic),
          hint: bold ? "潜在回报较高，压力也会明显上升" : "需要投入时间和精力",
          effects: {
            attributes: {
              intelligence: options.category === "教育" ? 5 : 1,
              emotional: ["家庭", "地区"].includes(options.category) ? 4 : 1,
              career: options.category === "职业" ? 5 : 1,
              happiness: bold ? 2 : 4,
              stress: bold ? 6 : 3,
              network: ["职业", "地区"].includes(options.category) ? 4 : 1,
            },
            savings:
              options.category === "职业"
                ? bold
                  ? 18000
                  : 9000
                : bold
                  ? -5000
                  : -2000,
            addTags: [`经历:${topic}`],
          },
        },
        {
          id: "steady",
          text: copy.calm(topic),
          hint: "波动较小，但进展也会更慢",
          effects: {
            attributes: {
              health: 2,
              happiness: 2,
              stress: -3,
              family: options.category === "家庭" ? 4 : 1,
              career: options.category === "职业" ? 1 : 0,
            },
            savings: options.category === "职业" ? 4000 : 1000,
            addTags: [`取舍:${topic}`],
          },
        },
      ],
    };
  });
}
