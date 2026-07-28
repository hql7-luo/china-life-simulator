import { buildEventCatalog } from "@/data/events/factory";
import type { LifeEvent } from "@/types";

const coreEducationEvents: LifeEvent[] = [
  {
    id: "milestone-zhongkao",
    category: "教育",
    title: "第一次站在人生分流口",
    description: "中考成绩和你的预期有一点距离。重点高中、普通高中和职业学校，各有一条不同的路。",
    stage: "中学",
    years: 2,
    condition: { minAge: 14, maxAge: 17, excludedTags: ["完成中考"] },
    choices: [
      { id: "key", text: "冲刺更远的重点高中", hint: "压力较高，学业提升更快", effects: { attributes: { education: 12, intelligence: 7, stress: 9, happiness: -3 }, educationRoute: "高中", addTags: ["重点高中", "完成中考"] } },
      { id: "regular", text: "选择离家近的普通高中", effects: { attributes: { education: 8, family: 4, stress: 3 }, educationRoute: "高中", addTags: ["普通高中", "完成中考"] } },
      { id: "vocational", text: "去职业学校，早点掌握一门技能", effects: { attributes: { career: 8, intelligence: 3, happiness: 3 }, educationRoute: "职业学校", addTags: ["技能路线", "完成中考"] } },
    ],
  },
  {
    id: "milestone-gaokao",
    category: "教育",
    title: "高考之后，志愿表摊在桌上",
    description: "分数已经无法改变，但城市、专业和学校仍在你手里。这张表格会把你带去某个具体的清晨。",
    years: 3,
    condition: { minAge: 17, maxAge: 20, education: ["高中"], excludedTags: ["完成高考"] },
    choices: [
      { id: "major", text: "优先喜欢的专业，接受学校普通一点", effects: { attributes: { intelligence: 7, happiness: 6, education: 17 }, educationRoute: "本科", addTags: ["兴趣专业", "完成高考"] } },
      { id: "school", text: "优先学校层次，专业以后再调整", effects: { attributes: { education: 24, network: 5, stress: 5 }, educationRoute: "本科", addTags: ["名校路线", "完成高考"] } },
      { id: "college", text: "选择务实专科，尽早进入行业", effects: { attributes: { education: 13, career: 7, stress: -2 }, educationRoute: "专科", addTags: ["务实专业", "完成高考"] } },
      { id: "repeat", text: "再来一年，给目标一次机会", effects: { attributes: { intelligence: 8, stress: 12, happiness: -6 }, educationRoute: "高中", addTags: ["复读", "完成高考"] } },
    ],
  },
  {
    id: "milestone-vocational-next",
    category: "教育",
    title: "技能证书与升学报名表",
    description: "实训老师说你上手很快。眼前既有不错的学徒岗位，也有继续升学的机会。",
    years: 3,
    condition: { minAge: 17, maxAge: 22, education: ["职业学校"], excludedTags: ["完成职教选择"] },
    choices: [
      { id: "work", text: "进入企业做技术学徒", effects: { attributes: { career: 12, education: 5, happiness: 3 }, educationRoute: "直接工作", jobId: "skilled-worker", addTags: ["技术学徒", "完成职教选择"] } },
      { id: "college", text: "继续读专科，拓宽技术基础", effects: { attributes: { education: 18, intelligence: 6, stress: 4 }, educationRoute: "专科", addTags: ["职教升学", "完成职教选择"] } },
      { id: "business", text: "跟亲戚学习小生意", effects: { attributes: { money: 6, emotional: 4, career: 8 }, educationRoute: "直接工作", jobId: "self-employed", addTags: ["小生意", "完成职教选择"] } },
    ],
  },
  {
    id: "college-internship",
    category: "教育",
    title: "暑期实习还是最后一个完整暑假",
    description: "同学们陆续晒出实习工牌。你也收到一份不算光鲜、但能学到东西的机会。",
    stage: "教育",
    years: 1,
    condition: { minAge: 19, maxAge: 24, education: ["专科", "本科", "海外留学"] },
    choices: [
      { id: "intern", text: "去实习，从琐碎工作开始", effects: { attributes: { career: 8, network: 5, stress: 4 }, savings: 6000, addTags: ["实习经历"] } },
      { id: "research", text: "留校做项目，打磨作品", effects: { attributes: { intelligence: 8, education: 4, stress: 2 }, addTags: ["项目作品"] } },
      { id: "rest", text: "回家陪家人，好好休息", effects: { attributes: { family: 8, health: 4, happiness: 6, career: -1 }, addTags: ["陪伴家人"] } },
    ],
  },
  {
    id: "postgraduate-choice",
    category: "教育",
    title: "毕业季的两份计划",
    description: "一边是考研自习室的固定座位，一边是招聘网站上不断刷新的岗位。",
    years: 2,
    condition: { minAge: 21, maxAge: 26, education: ["本科"], excludedTags: ["完成毕业选择"] },
    choices: [
      { id: "graduate", text: "投入考研，延迟进入职场", effects: { attributes: { education: 20, intelligence: 8, stress: 10 }, educationRoute: "研究生", addTags: ["考研上岸", "完成毕业选择"] } },
      { id: "job", text: "先去工作，在实践中学习", effects: { attributes: { career: 8, network: 4, education: 2 }, educationRoute: "直接工作", addTags: ["直接就业", "完成毕业选择"] } },
      { id: "exam", text: "准备考公，追求稳定节奏", effects: { attributes: { education: 5, stress: 8, career: 3 }, addTags: ["备考公务员", "完成毕业选择"] } },
    ],
  },
  {
    id: "upgrade-degree",
    category: "教育",
    title: "下班后的专升本课堂",
    description: "白天的工作已经够累，但你仍想补上学历这块拼图。",
    years: 2,
    condition: { minAge: 20, maxAge: 32, education: ["专科"], minAttributes: { intelligence: 52 } },
    choices: [
      { id: "upgrade", text: "报名学习，坚持两年", effects: { attributes: { education: 18, intelligence: 6, stress: 8, career: 2 }, educationRoute: "本科", savings: -16000, addTags: ["专升本"] } },
      { id: "certificate", text: "考行业证书，把时间用在技能上", effects: { attributes: { career: 9, education: 5, stress: 4 }, savings: -6000, addTags: ["行业证书"] } },
      { id: "focus", text: "专注当前岗位，靠业绩说话", effects: { attributes: { career: 7, education: -1, stress: 2 }, addTags: ["实践路线"] } },
    ],
  },
];

const topics = ["偏科调整", "课堂展示", "奖学金申请", "宿舍相处", "社团招新", "考试失利", "老师推荐", "校园比赛", "专业选择", "学习方法"];
const settings = ["月考成绩公布后", "图书馆闭馆前", "班主任谈话时", "同学都在做决定的那周"];

export const educationEvents: LifeEvent[] = [
  ...coreEducationEvents,
  ...buildEventCatalog({ prefix: "education", category: "教育", count: 40 - coreEducationEvents.length, topics, settings, minAge: 12, maxAge: 29 }),
];
