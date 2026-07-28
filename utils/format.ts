import type { PlayerAttributes } from "@/types";

export const attributeLabels: Record<keyof PlayerAttributes, string> = {
  health: "健康",
  intelligence: "智力",
  emotional: "情商",
  happiness: "快乐",
  money: "财商",
  family: "家庭",
  network: "人脉",
  education: "学历",
  career: "事业",
  stress: "压力",
};

export function formatCurrency(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 10000) {
    return `${sign}¥${(abs / 10000).toFixed(abs >= 100000 ? 0 : 1)}万`;
  }
  return `${sign}¥${Math.round(abs).toLocaleString("zh-CN")}`;
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, Math.round(value)));
}
