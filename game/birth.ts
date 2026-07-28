import { pickSeeded, seededRandom } from "@/game/random";
import type { BirthProfile, CityTier, FamilyWealth, Region } from "@/types";

const familyJobs = ["教师", "制造业职工", "个体经营者", "医护人员", "物流从业者", "服务业职员", "务农", "工程师"];
const givenNames = ["知夏", "予安", "清禾", "景川", "以宁", "云舟", "嘉言", "小满", "星遥", "明澈"];
const surnames = ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴"];
const regions: Region[] = ["东北", "华北", "华东", "华中", "华南", "西南", "西北"];
const cityTiers: CityTier[] = ["一线城市", "新一线城市", "二线城市", "三四线城市", "县城", "乡镇农村"];
const wealthLevels: FamilyWealth[] = ["困难", "普通", "普通", "小康", "小康", "富裕"];

export function randomBirthProfile(seed: string, birthYear = 1998): BirthProfile {
  const cityTier = pickSeeded(cityTiers, seed, 3);
  return {
    name: `${pickSeeded(surnames, seed, 0)}${pickSeeded(givenNames, seed, 1)}`,
    gender: pickSeeded(["女", "男", "非二元"] as const, seed, 2),
    birthYear,
    region: pickSeeded(regions, seed, 4),
    cityTier,
    hukou: cityTier === "乡镇农村" || seededRandom(seed, 5) < 0.32 ? "农村" : "城镇",
    familyWealth: pickSeeded(wealthLevels, seed, 6),
    fatherJob: pickSeeded(familyJobs, seed, 7),
    motherJob: pickSeeded(familyJobs, seed, 8),
    familyClimate: pickSeeded(["亲密", "平常", "平常", "紧张"] as const, seed, 9),
    talent: pickSeeded(["好奇心", "运动感", "表达力", "动手能力", "耐心"] as const, seed, 10),
    personality: pickSeeded(["谨慎", "外向", "坚韧", "随和", "独立"] as const, seed, 11),
  };
}
