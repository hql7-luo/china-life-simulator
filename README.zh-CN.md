# 中国人生模拟器 / China Life Simulator

[English](./README.md)

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![CI](https://github.com/hql7-luo/china-life-simulator/actions/workflows/ci.yml/badge.svg)](https://github.com/hql7-luo/china-life-simulator/actions/workflows/ci.yml)
![Tests Passing](https://img.shields.io/badge/tests-24%20passing-brightgreen)
[![Vercel Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhql7-luo%2Fchina-life-simulator)

一款以当代中国生活为背景、支持固定随机种子重玩的选择驱动型人生模拟网页游戏。

![中国人生模拟器桌面首页](./docs/screenshots/home-desktop.png)

> **在线 Demo：** [china-life-simulator.vercel.app](https://china-life-simulator.vercel.app)

## 功能亮点

- 从 6 岁走到 80 岁，每次选择都会推进时间并影响之后的人生。
- 支持固定种子重玩，也可以参与所有玩家共享的“今日同题人生”。
- 包含普通、教育、职业、家庭、地区和隐藏六类，共 280 个事件。
- 可解锁 30 种结局、24 项成就和 14 条可玩职业路线。
- 持续记录属性、存款、负债、住房、投资、关系、教育和职业履历。
- 存档保存在浏览器本地，最终报告可下载为 PNG。
- 桌面端、平板和手机端均可完整游玩，无需注册或后端服务。

## 项目截图

| 出生设置                                            | 游戏事件                                                 |
| --------------------------------------------------- | -------------------------------------------------------- |
| ![出生档案设置](./docs/screenshots/birth-setup.png) | ![选择驱动的事件页面](./docs/screenshots/game-event.png) |

| 资产与时间线                                                    | 最终结局报告                                        |
| --------------------------------------------------------------- | --------------------------------------------------- |
| ![资产账本与人生时间线](./docs/screenshots/assets-timeline.png) | ![最终人生报告](./docs/screenshots/life-report.png) |

<p align="center">
  <img src="./docs/screenshots/event-mobile.png" width="375" alt="中国人生模拟器手机端页面" />
</p>

## 技术栈

| 范围       | 技术                                              |
| ---------- | ------------------------------------------------- |
| 框架       | Next.js 15 App Router                             |
| 界面       | React 18、TypeScript、Tailwind CSS、Framer Motion |
| 状态与存档 | Zustand + localStorage 持久化                     |
| 报告导出   | html-to-image                                     |
| 质量保障   | ESLint、TypeScript、Vitest、GitHub Actions        |
| 部署       | 适配 Vercel 的静态 Next.js 应用                   |

## 快速开始

环境要求：Node.js 22.13 或更高版本。

```bash
git clone https://github.com/hql7-luo/china-life-simulator.git
cd china-life-simulator
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

仓库同时提供 `pnpm-lock.yaml`，CI 使用 pnpm 保证安装结果可复现。

## 测试结果

```bash
npm run lint
npm run test
npm run build
```

2026-07-28 发布前验证结果：

- TypeScript：通过，0 个类型错误
- ESLint：通过，0 个警告、0 个错误
- Vitest：4 个测试文件、24 项测试全部通过
- Next.js 生产构建：通过，首页已静态生成
- 生产依赖安全审计：未发现已知漏洞
- 浏览器 QA：桌面、平板和手机端均通过，无横向溢出
- 核心流程：新建人生、连续选择至 80 岁、刷新恢复存档、PNG 报告生成均通过

GitHub Actions 会在推送到 `main` 和提交 Pull Request 时重复执行安装、lint、测试与生产构建。

## 内容规模

| 内容     | 数量 |
| -------- | ---: |
| 普通事件 |  120 |
| 教育事件 |   40 |
| 职业事件 |   50 |
| 家庭事件 |   30 |
| 地区事件 |   20 |
| 隐藏事件 |   20 |
| 结局     |   30 |
| 成就     |   24 |
| 可玩职业 |   14 |

本项目是虚构、娱乐性的简化模拟。收入、教育、职业、地区与家庭相关内容不代表现实中的个人、财务或职业建议。

## 项目结构

```text
app/                 Next.js 入口与全局样式
components/          页面、弹窗、游戏面板与 UI 组件
data/                事件、职业、成就、结局与每日挑战
game/                事件筛选、条件、经济、效果与结算逻辑
store/               Zustand 持久化游戏状态
tests/               逻辑、内容、存储与状态测试
docs/screenshots/    README 使用的发布截图
```

## 部署

Vercel 可以自动识别该仓库为 Next.js 项目：

1. 在 Vercel 中导入 `hql7-luo/china-life-simulator`。
2. 保留默认框架与构建设置。
3. 直接部署；项目不需要任何环境变量。

存档只保存在玩家自己的浏览器中。项目不包含服务端数据库、用户账号、分析 SDK 或 API Key。

## 参与贡献

欢迎提交范围明确的修复或经过认真校对的内容改进。提交 Pull Request 前，请先完成 lint、测试和生产构建。

## 许可证

项目使用 [MIT License](./LICENSE)。
