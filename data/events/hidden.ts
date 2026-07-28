import { buildEventCatalog } from "@/data/events/factory";
import type { LifeEvent } from "@/types";

const coreHiddenEvents: LifeEvent[] = [
  {
    id: "hidden-late-bloom",
    category: "隐藏",
    title: "抽屉里那份十年前的草稿",
    description:
      "整理旧物时，你发现年轻时没有完成的计划。奇怪的是，现在的你反而具备了完成它的条件。",
    years: 3,
    rare: true,
    condition: {
      minAge: 45,
      maxAge: 62,
      minAttributes: { intelligence: 60 },
      chance: 0.28,
    },
    choices: [
      {
        id: "restart",
        text: "重新开始，不再用年龄否定自己",
        effects: {
          attributes: { happiness: 12, career: 10, stress: 5 },
          savings: -25000,
          addTags: ["大器晚成", "五十岁重新出发"],
        },
      },
      {
        id: "keep",
        text: "把它留作纪念，珍惜现在",
        effects: {
          attributes: { happiness: 5, family: 4, stress: -4 },
          addTags: ["与过去和解"],
        },
      },
    ],
  },
  {
    id: "hidden-kindness",
    category: "隐藏",
    title: "多年后收到的一封感谢信",
    description:
      "你几乎忘记自己曾帮过那个人。对方却一直记得，并说那次帮助改变了自己的一个决定。",
    years: 1,
    rare: true,
    condition: { minAge: 35, requiredTags: ["仗义相助"], chance: 0.45 },
    choices: [
      {
        id: "reply",
        text: "认真回信，也谢谢当年的彼此",
        effects: {
          attributes: { happiness: 11, emotional: 7, network: 5, stress: -4 },
          addTags: ["善意回响"],
        },
      },
      {
        id: "quiet",
        text: "把信收好，让温暖留在心里",
        effects: {
          attributes: { happiness: 8, stress: -3 },
          addTags: ["被人记得"],
        },
      },
    ],
  },
  {
    id: "hidden-side-success",
    category: "隐藏",
    title: "副业订单突然排到了三个月后",
    description:
      "你原本只是试试看，市场却给出了超出预期的回应。现在它可能不再只是副业。",
    years: 3,
    rare: true,
    condition: {
      minAge: 28,
      maxAge: 55,
      requiredTags: ["副业达人"],
      minAttributes: { career: 58 },
      chance: 0.5,
    },
    choices: [
      {
        id: "full",
        text: "转为个体经营，建立自己的品牌",
        effects: {
          attributes: { career: 12, money: 8, stress: 10 },
          jobId: "self-employed",
          savings: 160000,
          addTags: ["副业转正", "白手起家"],
        },
      },
      {
        id: "small",
        text: "控制规模，保留生活边界",
        effects: {
          attributes: { happiness: 8, money: 5, stress: -2 },
          savings: 70000,
          addTags: ["小而美生意"],
        },
      },
    ],
  },
  {
    id: "hidden-exam-comeback",
    category: "隐藏",
    title: "比模拟考高了四十七分",
    description:
      "查到成绩的那一刻，你反复刷新了三次页面。过去一年的坚持终于有了具体数字。",
    years: 1,
    rare: true,
    condition: { minAge: 18, maxAge: 21, requiredTags: ["复读"], chance: 0.65 },
    choices: [
      {
        id: "dream",
        text: "填报一直想去的学校",
        effects: {
          attributes: { education: 26, happiness: 12, intelligence: 5 },
          educationRoute: "本科",
          addTags: ["高考逆袭", "完成高考"],
        },
      },
      {
        id: "steady",
        text: "稳妥填报，把选择权握在手里",
        effects: {
          attributes: { education: 20, happiness: 8, stress: -5 },
          educationRoute: "本科",
          addTags: ["逆袭上岸", "完成高考"],
        },
      },
    ],
  },
  {
    id: "hidden-investment-return",
    category: "隐藏",
    title: "时间兑现了耐心",
    description:
      "多年坚持的分散投资跨过了一个里程碑。它没有暴富故事那么刺激，却让你离自由近了一点。",
    years: 2,
    rare: true,
    condition: {
      minAge: 38,
      requiredTags: ["长期投资"],
      minAttributes: { money: 52 },
      chance: 0.38,
    },
    choices: [
      {
        id: "continue",
        text: "继续长期配置，为时间自由做准备",
        effects: {
          attributes: { money: 8, stress: -4 },
          savings: 120000,
          investment: 80000,
          addTags: ["复利朋友", "提前退休"],
        },
      },
      {
        id: "life",
        text: "兑现一部分，带家人去旅行",
        effects: {
          attributes: { happiness: 10, family: 8, money: 3 },
          savings: 60000,
          addTags: ["财富服务生活"],
        },
      },
    ],
  },
  {
    id: "hidden-ordinary",
    category: "隐藏",
    title: "没有大事发生的一年",
    description:
      "工作普通，饭菜普通，家人的消息也普通。你忽然发现，安稳本身就是一种很难得的好运。",
    years: 3,
    rare: true,
    condition: {
      minAge: 45,
      minAttributes: { happiness: 60, family: 55 },
      maxAttributes: { stress: 45 },
      chance: 0.25,
    },
    choices: [
      {
        id: "notice",
        text: "记住这一年平凡的细节",
        effects: {
          attributes: { happiness: 10, family: 6, stress: -6 },
          addTags: ["普通人的一生", "知足"],
        },
      },
      {
        id: "new",
        text: "在安稳里给自己一个新目标",
        effects: {
          attributes: { happiness: 5, intelligence: 4, career: 3 },
          addTags: ["安稳中生长"],
        },
      },
    ],
  },
];

const topics = [
  "偶然的推荐信",
  "旧技能新用途",
  "意外的合伙邀请",
  "匿名的善意",
  "被遗忘的存折",
  "深夜灵感",
  "多年后的重逢",
];
const settings = ["命运轻轻拐弯时", "你几乎准备放弃时"];

export const hiddenEvents: LifeEvent[] = [
  ...coreHiddenEvents,
  ...buildEventCatalog({
    prefix: "hidden",
    category: "隐藏",
    count: 20 - coreHiddenEvents.length,
    topics,
    settings,
    minAge: 18,
    maxAge: 72,
    hidden: true,
  }),
];
