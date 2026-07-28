import { buildEventCatalog } from "@/data/events/factory";
import type { LifeEvent, Region } from "@/types";

const regionDetails: Array<{ region: Region; title: string; description: string; tag: string }> = [
  { region: "东北", title: "雪季里的一份新计划", description: "漫长冬季让生活慢下来，也让你开始重新计算留在本地和向外闯荡的得失。", tag: "雪季记忆" },
  { region: "华北", title: "风起时的城市更新", description: "熟悉的街区开始改造，新产业和老邻居在同一条路上交汇。", tag: "街区更新" },
  { region: "华东", title: "小城与都市的一小时", description: "更密集的交通网络让通勤、机会和生活边界有了新的可能。", tag: "区域通勤" },
  { region: "华中", title: "江边夜市的新摊位", description: "老朋友邀你一起试试周末摊位，说本地年轻人的口味正在变化。", tag: "夜市尝试" },
  { region: "华南", title: "雨季里的跨境订单", description: "一位熟人带来小额跨境订单，机会真实，交付压力也真实。", tag: "跨境尝试" },
  { region: "西南", title: "山城坡道上的慢生活", description: "一次来回爬坡后，你开始思考效率之外，生活还需要什么。", tag: "山城生活" },
  { region: "西北", title: "远方客人的旅行路线", description: "家乡的风景被越来越多人看见，你也发现本地经验可能成为一门生意。", tag: "家乡旅行" },
];

const coreRegionalEvents: LifeEvent[] = regionDetails.map((detail, index) => ({
  id: `region-core-${index + 1}`,
  category: "地区",
  title: detail.title,
  description: detail.description,
  years: 2,
  condition: { minAge: 20, maxAge: 65, regions: [detail.region] },
  choices: [
    { id: "local", text: "从本地生活出发，认真试一次", effects: { attributes: { happiness: 6, network: 7, career: 4 }, savings: index % 2 === 0 ? 8000 : -4000, addTags: [detail.tag, "扎根本地"] } },
    { id: "observe", text: "先观察变化，不急着投入", effects: { attributes: { intelligence: 4, stress: -2, money: 2 }, addTags: [`观察:${detail.region}`] } },
  ],
}));

const topics = ["口音与新朋友", "返乡列车", "本地小吃", "气候变化", "城市新线路", "县域电商", "社区节庆"];
const settings = ["回家探亲时", "工作调动之后", "一次朋友聚会上"];

export const regionalEvents: LifeEvent[] = [
  ...coreRegionalEvents,
  ...buildEventCatalog({ prefix: "regional", category: "地区", count: 20 - coreRegionalEvents.length, topics, settings, minAge: 16, maxAge: 72 }),
];
