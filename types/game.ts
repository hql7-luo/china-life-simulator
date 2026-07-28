export type Region = "东北" | "华北" | "华东" | "华中" | "华南" | "西南" | "西北";
export type CityTier =
  | "一线城市"
  | "新一线城市"
  | "二线城市"
  | "三四线城市"
  | "县城"
  | "乡镇农村";
export type FamilyWealth = "困难" | "普通" | "小康" | "富裕";
export type Gender = "女" | "男" | "非二元";
export type Hukou = "城镇" | "农村";
export type LifeStage =
  | "童年"
  | "中学"
  | "教育"
  | "职业"
  | "成年"
  | "退休";
export type EventCategory =
  | "普通"
  | "教育"
  | "职业"
  | "家庭"
  | "地区"
  | "隐藏";
export type EducationRoute =
  | "未入学"
  | "义务教育"
  | "职业学校"
  | "高中"
  | "专科"
  | "本科"
  | "研究生"
  | "海外留学"
  | "直接工作";
export type MarriageStatus = "单身" | "恋爱中" | "已婚" | "离异" | "丧偶";
export type HouseState = "无房" | "租房" | "按揭住房" | "全款住房";
export type JobId =
  | "student"
  | "unemployed"
  | "internet"
  | "manufacturing"
  | "finance"
  | "trade"
  | "education"
  | "medical"
  | "civil-service"
  | "public-institution"
  | "state-owned"
  | "freelance"
  | "self-employed"
  | "startup"
  | "skilled-worker"
  | "service";

export interface BirthProfile {
  name: string;
  gender: Gender;
  birthYear: number;
  region: Region;
  cityTier: CityTier;
  hukou: Hukou;
  familyWealth: FamilyWealth;
  fatherJob: string;
  motherJob: string;
  familyClimate: "亲密" | "平常" | "紧张";
  talent: "好奇心" | "运动感" | "表达力" | "动手能力" | "耐心";
  personality: "谨慎" | "外向" | "坚韧" | "随和" | "独立";
}

export interface PlayerAttributes {
  health: number;
  intelligence: number;
  emotional: number;
  happiness: number;
  money: number;
  family: number;
  network: number;
  education: number;
  career: number;
  stress: number;
}

export interface EducationRecord {
  age: number;
  year: number;
  route: EducationRoute;
  detail: string;
}

export interface CareerRecord {
  age: number;
  year: number;
  jobId: JobId;
  title: string;
  action: "入职" | "升职" | "转行" | "离职" | "创业" | "退休";
  annualIncome: number;
}

export interface Relationship {
  id: string;
  name: string;
  type: "父母" | "手足" | "同学" | "老师" | "同事" | "朋友" | "恋人" | "配偶" | "子女" | "伙伴";
  affection: number;
  trust: number;
  status: string;
  memories: string[];
}

export interface AssetState {
  annualIncome: number;
  annualExpense: number;
  savings: number;
  mortgage: number;
  otherDebt: number;
  house: HouseState;
  investments: number;
  totalIncome: number;
  totalExpense: number;
  peakAnnualIncome: number;
}

export interface EventCondition {
  minAge?: number;
  maxAge?: number;
  stage?: LifeStage;
  minAttributes?: Partial<PlayerAttributes>;
  maxAttributes?: Partial<PlayerAttributes>;
  education?: EducationRoute[];
  jobs?: JobId[];
  regions?: Region[];
  cityTiers?: CityTier[];
  marriage?: MarriageStatus[];
  requiredTags?: string[];
  excludedTags?: string[];
  chance?: number;
}

export interface ChoiceEffects {
  attributes?: Partial<PlayerAttributes>;
  savings?: number;
  debt?: number;
  mortgage?: number;
  investment?: number;
  annualIncome?: number;
  annualExpense?: number;
  educationRoute?: EducationRoute;
  jobId?: JobId;
  marriage?: MarriageStatus;
  children?: number;
  house?: HouseState;
  cityTier?: CityTier;
  addTags?: string[];
  removeTags?: string[];
  addRelationship?: Omit<Relationship, "id">;
  relationshipChange?: {
    type: Relationship["type"];
    affection?: number;
    trust?: number;
    memory?: string;
  };
}

export interface EventChoice {
  id: string;
  text: string;
  hint?: string;
  effects: ChoiceEffects;
}

export interface LifeEvent {
  id: string;
  category: EventCategory;
  title: string;
  description: string;
  stage?: LifeStage;
  years: number;
  condition?: EventCondition;
  choices: EventChoice[];
  rare?: boolean;
}

export interface TimelineEntry {
  id: string;
  age: number;
  year: number;
  title: string;
  choice: string;
  category: EventCategory;
  changes: string[];
}

export interface Player {
  birth: BirthProfile;
  age: number;
  currentYear: number;
  stage: LifeStage;
  currentJob: JobId;
  currentCity: CityTier;
  marriage: MarriageStatus;
  children: number;
  attributes: PlayerAttributes;
  educationRoute: EducationRoute;
  educationHistory: EducationRecord[];
  careerHistory: CareerRecord[];
  relationships: Relationship[];
  assets: AssetState;
  tags: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  rarity: "普通" | "稀有" | "珍贵" | "传说";
  icon: string;
  condition: AchievementCondition;
}

export interface AchievementCondition {
  minAge?: number;
  minSavings?: number;
  maxSavings?: number;
  minAttributes?: Partial<PlayerAttributes>;
  education?: EducationRoute[];
  jobs?: JobId[];
  marriage?: MarriageStatus[];
  house?: HouseState[];
  requiredTags?: string[];
  minCareerCount?: number;
}

export interface Ending {
  id: string;
  name: string;
  summary: string;
  quote: string;
  rarity: "常见" | "少见" | "稀有" | "传说";
  priority: number;
  condition: AchievementCondition;
}

export interface EndingResult {
  ending: Ending;
  attributeScore: number;
  wealthSummary: string;
  familySummary: string;
  topChoices: TimelineEntry[];
  regret?: TimelineEntry;
  keywords: string[];
}

export interface DailyChallenge {
  id: string;
  date: string;
  seed: string;
  title: string;
  description: string;
}

export interface GameStats {
  jobsHeld: number;
  jobChanges: number;
  relationships: number;
  importantChoices: number;
  turningPoints: number;
}

export interface GameState {
  version: number;
  status: "home" | "setup" | "playing" | "ended";
  seed: string;
  randomCursor: number;
  player: Player | null;
  currentEvent: LifeEvent | null;
  timeline: TimelineEntry[];
  recentEventIds: string[];
  unlockedEventIds: string[];
  unlockedEndingIds: string[];
  unlockedAchievementIds: string[];
  unlockedJobIds: JobId[];
  endingResult: EndingResult | null;
  stats: GameStats;
  isDaily: boolean;
}
