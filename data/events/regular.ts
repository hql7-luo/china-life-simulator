import { buildEventCatalog } from "@/data/events/factory";
import type { LifeEvent } from "@/types";

const coreRegularEvents: LifeEvent[] = [
  {
    id: "milestone-family-education",
    category: "普通",
    title: "书包里的第一张纸条",
    description: "刚上小学，你把老师写给家长的纸条压在书包最底下。父母对成绩的态度，也许会成为很长久的回声。",
    stage: "童年",
    years: 2,
    condition: { minAge: 6, maxAge: 9 },
    choices: [
      { id: "ask", text: "主动拿出来，请父母一起制定学习计划", effects: { attributes: { intelligence: 5, family: 4, stress: 2 }, addTags: ["家庭共学"] } },
      { id: "self", text: "先自己想办法，下次用进步证明自己", effects: { attributes: { intelligence: 3, happiness: 1, family: -1 }, addTags: ["自我驱动"] } },
      { id: "play", text: "纸条先放一边，今天和朋友去踢球", effects: { attributes: { health: 5, happiness: 5, education: -1 }, addTags: ["快乐第一"] } },
    ],
  },
  {
    id: "childhood-interest",
    category: "普通",
    title: "周末只够上一门课",
    description: "家里的预算只够支持一项兴趣。钢琴、篮球、编程体验课，或者干脆把周末留给自己。",
    stage: "童年",
    years: 2,
    condition: { minAge: 8, maxAge: 12 },
    choices: [
      { id: "art", text: "选择音乐与表达", effects: { attributes: { emotional: 6, happiness: 3 }, savings: -4000, addTags: ["艺术启蒙"] } },
      { id: "sport", text: "选择运动与团队", effects: { attributes: { health: 7, network: 3 }, savings: -2500, addTags: ["运动习惯"] } },
      { id: "tech", text: "选择动手和编程", effects: { attributes: { intelligence: 7, stress: 2 }, savings: -3000, addTags: ["技术启蒙"] } },
      { id: "free", text: "不报班，自由安排周末", effects: { attributes: { happiness: 6, stress: -3 }, addTags: ["留白童年"] } },
    ],
  },
  {
    id: "childhood-friend",
    category: "普通",
    title: "同桌不再和你说话",
    description: "一次小组作业后，同桌觉得你没有认真帮忙。第二天，课桌中间多了一条铅笔线。",
    stage: "童年",
    years: 1,
    condition: { minAge: 9, maxAge: 13 },
    choices: [
      { id: "talk", text: "放学后解释并道歉", effects: { attributes: { emotional: 6, network: 4 }, addRelationship: { name: "林小满", type: "同学", affection: 66, trust: 60, status: "小学同学", memories: ["你们在课桌的铅笔线两边和好了。"] } } },
      { id: "wait", text: "等气消了再说", effects: { attributes: { emotional: 1, happiness: -2, stress: 2 } } },
      { id: "ignore", text: "换个朋友一起玩", effects: { attributes: { network: 2, emotional: -3 }, addTags: ["回避冲突"] } },
    ],
  },
  {
    id: "teen-screen-time",
    category: "普通",
    title: "再玩十分钟",
    description: "新游戏的赛季即将结束，而明早有一场并不算重要的小测验。",
    stage: "中学",
    years: 1,
    condition: { minAge: 12, maxAge: 17 },
    choices: [
      { id: "study", text: "关掉游戏，复习错题", effects: { attributes: { intelligence: 4, education: 4, stress: 3, happiness: -1 }, addTags: ["自律"] } },
      { id: "balance", text: "定时玩半小时再学习", effects: { attributes: { intelligence: 2, happiness: 3, stress: 1 }, addTags: ["懂得平衡"] } },
      { id: "game", text: "今晚就为快乐上分", effects: { attributes: { happiness: 6, education: -3, health: -2 }, addTags: ["快乐第一"] } },
    ],
  },
  {
    id: "adult-health-check",
    category: "普通",
    title: "体检报告上的向上箭头",
    description: "你盯着几项轻微异常指标，第一次认真意识到，身体也在记录你的每一次熬夜。",
    years: 2,
    condition: { minAge: 30, maxAge: 58 },
    choices: [
      { id: "change", text: "开始规律运动和饮食", effects: { attributes: { health: 9, stress: -3, happiness: 2 }, savings: -3000, addTags: ["健康管理"] } },
      { id: "busy", text: "工作忙完这一阵再说", effects: { attributes: { health: -5, career: 3, stress: 5 }, addTags: ["透支身体"] } },
      { id: "insurance", text: "先补齐保险，再慢慢调整", effects: { attributes: { money: 4, stress: -1 }, savings: -8000, addTags: ["风险意识"] } },
    ],
  },
  {
    id: "adult-friend-loan",
    category: "普通",
    title: "朋友发来一段很长的语音",
    description: "老朋友遇到周转困难，希望借一笔不小的钱。你知道这笔钱可能很久都回不来。",
    years: 1,
    condition: { minAge: 25, maxAge: 55, minAttributes: { network: 42 } },
    choices: [
      { id: "lend", text: "借出能力范围内的一部分", effects: { attributes: { emotional: 3, network: 5, money: 1 }, savings: -20000, addTags: ["仗义相助"] } },
      { id: "refuse", text: "坦诚拒绝，但帮忙梳理解决方案", effects: { attributes: { emotional: 5, network: -1, money: 3 }, addTags: ["边界清晰"] } },
      { id: "all", text: "按对方需要全部借出", effects: { attributes: { network: 8, stress: 8 }, savings: -80000, addTags: ["朋友借款"] } },
    ],
  },
  {
    id: "adult-investment",
    category: "普通",
    title: "手机里的热门投资群",
    description: "群里每天都有人晒收益。你手上正好有一笔暂时用不到的存款。",
    years: 2,
    condition: { minAge: 25, maxAge: 60, minAttributes: { money: 35 } },
    choices: [
      { id: "learn", text: "先学习，再做分散的长期配置", effects: { attributes: { money: 7, stress: 1 }, savings: -20000, investment: 20000, addTags: ["长期投资"] } },
      { id: "chase", text: "跟着热门机会重仓一次", effects: { attributes: { money: -3, stress: 8 }, savings: -50000, investment: 35000, addTags: ["追涨冒险"] } },
      { id: "cash", text: "不懂就不投，保留现金", effects: { attributes: { money: 3, stress: -2 }, addTags: ["现金为王"] } },
    ],
  },
  {
    id: "retirement-hobby",
    category: "普通",
    title: "突然空下来的星期一",
    description: "退休后的第一个工作日，你不用再赶早高峰。窗外的光线像是多出来的一段人生。",
    stage: "退休",
    years: 3,
    condition: { minAge: 60, maxAge: 70 },
    choices: [
      { id: "travel", text: "整理地图，开始慢慢旅行", effects: { attributes: { happiness: 10, health: 3, stress: -7 }, savings: -45000, jobId: "unemployed", addTags: ["退休旅行"] } },
      { id: "community", text: "参加社区活动，认识新朋友", effects: { attributes: { happiness: 7, network: 8, stress: -5 }, jobId: "unemployed", addTags: ["社区生活"] } },
      { id: "rehire", text: "接受返聘，让经验继续发光", effects: { attributes: { career: 6, happiness: 2, stress: 4 }, savings: 30000, addTags: ["退休返聘"] } },
    ],
  },
];

const topics = [
  "一次公开表达", "新的兴趣", "邻里相处", "家庭搬迁", "旧友重逢", "一次旅行", "阅读习惯",
  "运动计划", "意外开销", "志愿活动", "数字生活", "睡眠质量", "消费选择", "时间管理",
  "一次误会", "独处时光", "长辈建议", "城市通勤", "节日团聚", "生活断舍离",
];
const settings = ["清晨的公交车上", "周末的饭桌旁", "一场突如其来的大雨后", "朋友圈安静下来的晚上", "新年计划写到一半时", "熟悉的街口"];

export const regularEvents: LifeEvent[] = [
  ...coreRegularEvents,
  ...buildEventCatalog({ prefix: "regular", category: "普通", count: 120 - coreRegularEvents.length, topics, settings, minAge: 7, maxAge: 79 }),
];
