import type { JobId } from "@/types";

export interface JobDefinition {
  id: JobId;
  name: string;
  sector: string;
  baseIncome: number;
  stress: number;
  education: number;
  description: string;
}

export const jobs: JobDefinition[] = [
  { id: "student", name: "学生", sector: "教育", baseIncome: 0, stress: 4, education: 0, description: "仍在校园里积累能力。" },
  { id: "unemployed", name: "待业", sector: "其他", baseIncome: 0, stress: 8, education: 0, description: "暂时停下来寻找下一步。" },
  { id: "internet", name: "互联网从业者", sector: "科技", baseIncome: 180000, stress: 14, education: 55, description: "在产品、技术或运营岗位工作。" },
  { id: "manufacturing", name: "制造业从业者", sector: "制造", baseIncome: 110000, stress: 9, education: 35, description: "在工厂、研发或供应链一线创造价值。" },
  { id: "finance", name: "金融从业者", sector: "金融", baseIncome: 200000, stress: 15, education: 65, description: "与资金、风险和客户打交道。" },
  { id: "trade", name: "外贸从业者", sector: "贸易", baseIncome: 140000, stress: 11, education: 45, description: "在订单、客户和跨境市场之间奔走。" },
  { id: "education", name: "教育工作者", sector: "教育", baseIncome: 105000, stress: 9, education: 55, description: "把知识和耐心投入下一代。" },
  { id: "medical", name: "医疗工作者", sector: "医疗", baseIncome: 145000, stress: 15, education: 72, description: "承担专业而高压的照护工作。" },
  { id: "civil-service", name: "公务员", sector: "公共服务", baseIncome: 115000, stress: 7, education: 58, description: "在公共服务岗位稳步前行。" },
  { id: "public-institution", name: "事业单位职员", sector: "公共服务", baseIncome: 105000, stress: 6, education: 52, description: "在专业公共机构工作。" },
  { id: "state-owned", name: "国企职员", sector: "企业", baseIncome: 135000, stress: 8, education: 50, description: "在大型组织中寻找成长路径。" },
  { id: "freelance", name: "自由职业者", sector: "创意", baseIncome: 120000, stress: 10, education: 30, description: "用专业能力换取时间自主。" },
  { id: "self-employed", name: "个体经营者", sector: "商业", baseIncome: 150000, stress: 13, education: 20, description: "自己对客流、成本和口碑负责。" },
  { id: "startup", name: "创业者", sector: "创业", baseIncome: 80000, stress: 18, education: 30, description: "在高风险中验证自己的想法。" },
  { id: "skilled-worker", name: "蓝领技术人员", sector: "技能", baseIncome: 125000, stress: 8, education: 25, description: "以熟练技能解决真实问题。" },
  { id: "service", name: "服务业从业者", sector: "服务", baseIncome: 85000, stress: 10, education: 10, description: "在城市日常运转中提供服务。" }
];

export const jobMap = Object.fromEntries(jobs.map((job) => [job.id, job])) as Record<JobId, JobDefinition>;
