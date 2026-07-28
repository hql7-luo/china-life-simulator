import { buildEventCatalog } from "@/data/events/factory";
import type { LifeEvent } from "@/types";

const coreFamilyEvents: LifeEvent[] = [
  {
    id: "family-meeting",
    category: "家庭",
    title: "在朋友的饭局上多坐了一会儿",
    description:
      "你和周予安聊了很久，从工作聊到各自想要的生活。散场后，对方问你下周要不要单独见面。",
    years: 2,
    condition: {
      minAge: 23,
      maxAge: 39,
      marriage: ["单身"],
      excludedTags: ["重要恋爱"],
    },
    choices: [
      {
        id: "date",
        text: "认真认识彼此，开始约会",
        effects: {
          attributes: { happiness: 9, emotional: 6, stress: -2 },
          marriage: "恋爱中",
          addTags: ["重要恋爱"],
          addRelationship: {
            name: "周予安",
            type: "恋人",
            affection: 72,
            trust: 64,
            status: "正在和你认真交往",
            memories: ["你们在一场普通饭局后交换了生活理想。"],
          },
        },
      },
      {
        id: "friend",
        text: "更适合做朋友，坦诚说明",
        effects: {
          attributes: { emotional: 6, network: 5, happiness: 2 },
          addTags: ["清晰表达", "重要恋爱"],
        },
      },
      {
        id: "busy",
        text: "最近只想专注自己的生活",
        effects: {
          attributes: { career: 4, stress: -2, happiness: 1 },
          addTags: ["独身选择", "重要恋爱"],
        },
      },
    ],
  },
  {
    id: "family-marriage",
    category: "家庭",
    title: "两个人的未来预算表",
    description:
      "你们开始认真讨论婚礼、住在哪里、要不要孩子，以及谁来照顾年迈的父母。",
    years: 2,
    condition: {
      minAge: 26,
      maxAge: 45,
      marriage: ["恋爱中"],
      excludedTags: ["婚姻决定"],
    },
    choices: [
      {
        id: "simple",
        text: "办一场简单婚礼，把钱留给生活",
        effects: {
          attributes: { family: 10, happiness: 8, money: 5 },
          marriage: "已婚",
          savings: -30000,
          relationshipChange: {
            type: "恋人",
            affection: 8,
            trust: 12,
            memory: "你们决定把婚礼做减法，把日子做加法。",
          },
          addTags: ["简约婚礼", "婚姻决定"],
        },
      },
      {
        id: "grand",
        text: "满足双方家庭期待，认真操办",
        effects: {
          attributes: { family: 7, network: 6, stress: 7 },
          marriage: "已婚",
          savings: -120000,
          relationshipChange: {
            type: "恋人",
            affection: 5,
            trust: 7,
            memory: "你们一起完成了一场热闹的婚礼。",
          },
          addTags: ["传统婚礼", "婚姻决定"],
        },
      },
      {
        id: "no",
        text: "不急着结婚，继续保持各自空间",
        effects: {
          attributes: { emotional: 4, happiness: 2, family: -2 },
          addTags: ["长期伴侣", "婚姻决定"],
        },
      },
    ],
  },
  {
    id: "family-child",
    category: "家庭",
    title: "关于新成员的长谈",
    description:
      "这不是一道有标准答案的题。你们把时间、经济、身体和想象中的未来都摊开来谈。",
    years: 3,
    condition: {
      minAge: 28,
      maxAge: 44,
      marriage: ["已婚"],
      excludedTags: ["生育决定"],
    },
    choices: [
      {
        id: "yes",
        text: "准备好迎接一个孩子",
        effects: {
          attributes: { family: 12, happiness: 7, stress: 10, health: -3 },
          children: 1,
          annualExpense: 120000,
          savings: -50000,
          addTags: ["成为父母", "生育决定"],
          addRelationship: {
            name: "小禾",
            type: "子女",
            affection: 88,
            trust: 75,
            status: "正在慢慢长大",
            memories: ["第一次抱起这个小小的新成员。"],
          },
        },
      },
      {
        id: "later",
        text: "再等几年，先把生活基础打稳",
        effects: {
          attributes: { money: 5, career: 4, stress: 2 },
          addTags: ["延后生育", "生育决定"],
        },
      },
      {
        id: "no",
        text: "选择不生育，共建两个人的生活",
        effects: {
          attributes: { happiness: 5, emotional: 6, family: -2, stress: -3 },
          addTags: ["主动丁克", "生育决定"],
        },
      },
    ],
  },
  {
    id: "family-home",
    category: "家庭",
    title: "售楼处、租约与计算器",
    description:
      "买房会带来稳定，也会锁定很长一段现金流。继续租房则保留流动性，但总有人问“什么时候安定”。",
    years: 3,
    condition: { minAge: 27, maxAge: 46, excludedTags: ["住房决定"] },
    choices: [
      {
        id: "buy",
        text: "支付首付，承担长期房贷",
        effects: {
          attributes: { family: 7, stress: 11, money: 4 },
          house: "按揭住房",
          savings: -220000,
          mortgage: 900000,
          addTags: ["按揭买房", "住房决定"],
        },
      },
      {
        id: "rent",
        text: "继续租房，把流动性留在手里",
        effects: {
          attributes: { happiness: 3, stress: -2, family: -1 },
          house: "租房",
          addTags: ["长期租房", "住房决定"],
        },
      },
      {
        id: "home",
        text: "回到成本更低的家乡置业",
        effects: {
          attributes: { family: 9, happiness: 5, career: -3 },
          house: "按揭住房",
          cityTier: "三四线城市",
          savings: -120000,
          mortgage: 420000,
          addTags: ["回乡置业", "住房决定", "回到家乡"],
        },
      },
    ],
  },
  {
    id: "family-parent-care",
    category: "家庭",
    title: "父母体检后的家庭群",
    description:
      "父母嘴上说没事，但检查和照护需要有人持续跟进。兄弟姐妹都在不同城市。",
    years: 3,
    condition: { minAge: 42, maxAge: 62, excludedTags: ["养老安排"] },
    choices: [
      {
        id: "near",
        text: "调整工作，搬到离父母更近的地方",
        effects: {
          attributes: { family: 14, career: -5, stress: 4, happiness: 3 },
          savings: -30000,
          addTags: ["家庭支柱", "养老安排"],
        },
      },
      {
        id: "share",
        text: "全家分工，并购买专业照护服务",
        effects: {
          attributes: { family: 9, money: 5, stress: 1 },
          savings: -70000,
          addTags: ["共同养老", "养老安排"],
        },
      },
      {
        id: "money",
        text: "承担主要费用，日常由亲人照顾",
        effects: {
          attributes: { family: 6, stress: 6, career: 3 },
          savings: -110000,
          addTags: ["经济支柱", "养老安排"],
        },
      },
    ],
  },
  {
    id: "family-distance",
    category: "家庭",
    title: "沉默了三天的晚餐",
    description:
      "忙碌和疲惫让你们的对话只剩下日程提醒。一次小争执后，家里安静得过分。",
    years: 2,
    condition: {
      minAge: 32,
      maxAge: 58,
      marriage: ["已婚"],
      minAttributes: { stress: 55 },
    },
    choices: [
      {
        id: "repair",
        text: "暂停工作安排，认真谈一次",
        effects: {
          attributes: { family: 10, emotional: 6, career: -2, stress: -5 },
          relationshipChange: {
            type: "配偶",
            affection: 8,
            trust: 8,
            memory: "你们在一次长谈后重新理解了彼此。",
          },
          addTags: ["修复关系"],
        },
      },
      {
        id: "counsel",
        text: "寻求专业关系咨询",
        effects: {
          attributes: { family: 12, emotional: 8, stress: -6 },
          savings: -12000,
          addTags: ["主动求助"],
        },
      },
      {
        id: "separate",
        text: "承认关系已经走远，和平分开",
        effects: {
          attributes: { family: -8, happiness: -4, stress: 6, emotional: 5 },
          marriage: "离异",
          addTags: ["经历离婚"],
        },
      },
    ],
  },
];

const topics = [
  "春节去谁家",
  "家庭预算",
  "纪念日安排",
  "长辈期待",
  "育儿分工",
  "亲戚往来",
  "伴侣加班",
  "家庭旅行",
  "朋友与家庭",
  "家务分配",
];
const settings = ["一次晚饭后", "家庭群突然热闹时", "周末采购途中"];

export const familyEvents: LifeEvent[] = [
  ...coreFamilyEvents,
  ...buildEventCatalog({
    prefix: "family",
    category: "家庭",
    count: 30 - coreFamilyEvents.length,
    topics,
    settings,
    minAge: 22,
    maxAge: 72,
  }),
];
