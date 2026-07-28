import { buildEventCatalog } from "@/data/events/factory";
import type { LifeEvent } from "@/types";

const coreCareerEvents: LifeEvent[] = [
  {
    id: "milestone-first-job",
    category: "职业",
    title: "第一张真正属于你的工牌",
    description: "毕业后的第一份工作不完美，但它会给你的简历、城市和作息写下开头。",
    years: 2,
    condition: { minAge: 22, maxAge: 29, jobs: ["student", "unemployed"], education: ["直接工作", "专科", "本科", "研究生", "海外留学"], excludedTags: ["第一份工作"] },
    choices: [
      { id: "internet", text: "去节奏快的互联网公司", effects: { attributes: { career: 10, network: 5, stress: 10 }, jobId: "internet", cityTier: "一线城市", addTags: ["第一份工作", "一线漂泊"] } },
      { id: "manufacturing", text: "进入制造企业，从现场学起", effects: { attributes: { career: 9, intelligence: 4, stress: 4 }, jobId: "manufacturing", cityTier: "新一线城市", addTags: ["第一份工作", "制造实干"] } },
      { id: "public", text: "接受稳定的公共机构岗位", effects: { attributes: { career: 6, family: 5, stress: -1 }, jobId: "public-institution", cityTier: "二线城市", addTags: ["第一份工作", "稳定路线"] } },
      { id: "service", text: "先在本地服务业站稳脚跟", effects: { attributes: { career: 5, emotional: 5, family: 6 }, jobId: "service", addTags: ["第一份工作", "留在家乡"] } },
    ],
  },
  {
    id: "career-city-choice",
    category: "职业",
    title: "一封来自另一座城市的录用通知",
    description: "工资涨幅很诱人，但意味着更高房租、更远距离，以及从头建立生活。",
    years: 2,
    condition: { minAge: 23, maxAge: 35, excludedTags: ["城市定居选择"] },
    choices: [
      { id: "tier1", text: "去一线城市，换更大的职业舞台", effects: { attributes: { career: 9, network: 7, stress: 10, family: -4 }, cityTier: "一线城市", savings: 20000, addTags: ["一线漂泊", "城市定居选择"] } },
      { id: "new1", text: "选择新一线，平衡机会和生活", effects: { attributes: { career: 6, happiness: 4, stress: 3 }, cityTier: "新一线城市", savings: 10000, addTags: ["平衡城市", "城市定居选择"] } },
      { id: "home", text: "留在家乡，把关系和生活放前面", effects: { attributes: { family: 9, happiness: 6, career: 1, stress: -5 }, cityTier: "三四线城市", addTags: ["留在家乡", "城市定居选择"] } },
    ],
  },
  {
    id: "career-layoff",
    category: "职业",
    title: "会议室里的组织调整",
    description: "部门名单被重新画了一遍，你的岗位消失了。补偿金到账时，手机也突然安静下来。",
    years: 1,
    condition: { minAge: 28, maxAge: 52, jobs: ["internet", "finance", "trade", "manufacturing"], chance: 0.32 },
    choices: [
      { id: "rest", text: "先休息一个月，再系统找工作", effects: { attributes: { health: 6, stress: -4, career: -4, happiness: 2 }, savings: 35000, jobId: "unemployed", addTags: ["经历裁员"] } },
      { id: "switch", text: "立刻转向更稳定的行业", effects: { attributes: { career: 3, intelligence: 5, stress: 6 }, jobId: "state-owned", savings: 20000, addTags: ["中途转行", "经历裁员"] } },
      { id: "freelance", text: "把副业变成自由职业", effects: { attributes: { career: 6, happiness: 5, stress: 5 }, jobId: "freelance", savings: 12000, addTags: ["自由职业", "经历裁员"] } },
    ],
  },
  {
    id: "career-civil-exam",
    category: "职业",
    title: "又一年招考公告",
    description: "你收藏了很久的岗位表终于更新。备考意味着放弃一部分收入和周末。",
    years: 2,
    condition: { minAge: 22, maxAge: 35, minAttributes: { education: 35 }, excludedTags: ["考公结果"] },
    choices: [
      { id: "full", text: "认真备考，给自己一次机会", effects: { attributes: { intelligence: 6, stress: 9, career: 6 }, jobId: "civil-service", savings: -18000, addTags: ["考公上岸", "考公结果", "稳定路线"] } },
      { id: "part", text: "边工作边准备，不押上全部", effects: { attributes: { intelligence: 3, stress: 5, career: 2 }, addTags: ["在职备考", "考公结果"] } },
      { id: "skip", text: "不跟风，继续深耕当前行业", effects: { attributes: { career: 6, happiness: 3, stress: -2 }, addTags: ["行业深耕", "考公结果"] } },
    ],
  },
  {
    id: "career-startup",
    category: "职业",
    title: "那份写了四十页的商业计划",
    description: "你和一位信任的朋友发现了一个真实需求。现在的问题是：要不要把积蓄和时间放进去？",
    years: 3,
    condition: { minAge: 27, maxAge: 48, minAttributes: { career: 45, network: 40 }, excludedTags: ["创业选择"] },
    choices: [
      { id: "go", text: "辞职创业，全力验证市场", effects: { attributes: { career: 12, network: 8, stress: 14, happiness: 3 }, jobId: "startup", savings: -120000, debt: 50000, addTags: ["创业者", "创业选择"] } },
      { id: "side", text: "先做副业，用订单验证需求", effects: { attributes: { career: 7, money: 5, stress: 7 }, savings: 25000, addTags: ["副业达人", "创业选择"] } },
      { id: "no", text: "保留友谊，不做商业伙伴", effects: { attributes: { emotional: 5, stress: -3, career: 1 }, addTags: ["谨慎创业", "创业选择"] } },
    ],
  },
  {
    id: "career-midlife",
    category: "职业",
    title: "四十岁的岗位说明书",
    description: "熟悉的工作已经做得很好，但你不确定自己还想不想这样做十年。",
    years: 3,
    condition: { minAge: 39, maxAge: 51, excludedTags: ["中年职业选择"] },
    choices: [
      { id: "lead", text: "争取管理岗位，承担更大责任", effects: { attributes: { career: 10, network: 7, stress: 10, happiness: -2 }, savings: 60000, addTags: ["管理者", "中年职业选择"] } },
      { id: "craft", text: "继续做专家，把一件事做深", effects: { attributes: { career: 8, intelligence: 6, stress: 3 }, savings: 40000, addTags: ["专业主义", "中年职业选择"] } },
      { id: "change", text: "接受降薪，转向真正想做的事", effects: { attributes: { happiness: 10, career: -2, stress: -5 }, jobId: "freelance", savings: -20000, addTags: ["五十岁重新出发", "中年职业选择"] } },
    ],
  },
];

const topics = ["季度考核", "跨部门项目", "客户投诉", "出差机会", "薪资谈判", "同事离职", "行业证书", "团队调整", "副业邀请", "年度复盘"];
const settings = ["周一早会之后", "项目上线前夜", "绩效面谈时", "行业进入淡季后", "新领导到岗的第一个月"];

export const careerEvents: LifeEvent[] = [
  ...coreCareerEvents,
  ...buildEventCatalog({ prefix: "career", category: "职业", count: 50 - coreCareerEvents.length, topics, settings, minAge: 21, maxAge: 64 }),
];
