"use client";

import { motion } from "framer-motion";
import { BrandMark } from "@/components/brand-mark";
import { CityIllustration } from "@/components/city-illustration";
import { ArchiveIcon, ArrowIcon, SlidersIcon, SparkIcon } from "@/components/ui/icons";
import { getDailyChallenge } from "@/data/daily";
import { randomBirthProfile } from "@/game/birth";
import { useGameStore } from "@/store/game-store";

interface HomeScreenProps {
  onArchive: () => void;
  onSettings: () => void;
}

export function HomeScreen({ onArchive, onSettings }: HomeScreenProps) {
  const openSetup = useGameStore((state) => state.openSetup);
  const startGame = useGameStore((state) => state.startGame);
  const resumeGame = useGameStore((state) => state.resumeGame);
  const player = useGameStore((state) => state.player);
  const currentEvent = useGameStore((state) => state.currentEvent);
  const daily = getDailyChallenge();

  const startDaily = () => startGame(randomBirthProfile(daily.seed, 2000), daily.seed, true);

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <BrandMark />
        <nav aria-label="辅助功能" className="flex items-center gap-2">
          <button aria-label="打开人生图鉴" className="rounded-full border border-ink/15 bg-white/50 p-2.5 text-ink/70 hover:bg-white" onClick={onArchive}>
            <ArchiveIcon className="h-5 w-5" />
          </button>
          <button aria-label="打开设置" className="rounded-full border border-ink/15 bg-white/50 p-2.5 text-ink/70 hover:bg-white" onClick={onSettings}>
            <SlidersIcon className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-5 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:pb-24 lg:pt-14">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.48 }}>
          <p className="mb-5 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cinnabar">
            <SparkIcon className="h-4 w-4" />
            一次选择驱动的虚构人生
          </p>
          <h1 className="max-w-xl font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            这一生，
            <br />
            <span className="relative inline-block text-cinnabar">
              你会怎么选？
              <span className="absolute -bottom-1 left-0 h-[3px] w-full -rotate-1 bg-cinnabar/25" />
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-ink/65 sm:text-lg">
            从第一张成绩单到最后一个没有闹钟的清晨。家庭、教育、职业和关系彼此牵动，没有标准答案，也不只一种成功。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {player && currentEvent && (
              <button className="group flex min-h-14 items-center justify-center gap-3 rounded-sm bg-jade px-7 font-bold text-white shadow-lg shadow-jade/15" onClick={resumeGame}>
                继续 {player.birth.name} 的人生
                <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
            <button className="group flex min-h-14 items-center justify-center gap-3 rounded-sm bg-ink px-7 font-bold text-paper shadow-lg shadow-ink/15" onClick={openSetup}>
              开始一段新人生
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="min-h-14 rounded-sm border border-ink/20 bg-white/55 px-7 font-bold text-ink hover:bg-white" onClick={startDaily}>
              今日同题人生
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">
            <span>固定种子可重玩</span>
            <span>280+ 人生事件</span>
            <span>30 种结局</span>
          </div>
        </motion.div>

        <motion.div className="relative" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, delay: 0.08 }}>
          <div className="paper-card relative mx-auto max-w-2xl overflow-hidden rounded-sm p-5 sm:p-8">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">Life route / 人生路线</span>
                <p className="mt-1 font-display text-2xl font-bold">从家门口，到更远的地方</p>
              </div>
              <span className="stamp h-14 w-14 text-sm">启程</span>
            </div>
            <CityIllustration />
            <div className="ledger-rule mt-4 grid grid-cols-3 gap-4 pb-3 text-center">
              <div><strong className="block font-mono text-lg">06</strong><span className="text-xs text-ink/50">初次入学</span></div>
              <div><strong className="block font-mono text-lg">22</strong><span className="text-xs text-ink/50">选择城市</span></div>
              <div><strong className="block font-mono text-lg">60+</strong><span className="text-xs text-ink/50">重新安排时间</span></div>
            </div>
          </div>
          <button className="ticket-edge absolute -bottom-10 left-3 right-3 flex items-center gap-4 bg-brass px-6 py-4 text-left shadow-xl sm:-bottom-9 sm:left-auto sm:right-8 sm:w-[390px]" onClick={startDaily}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/30 font-display text-lg font-bold">今</span>
            <span className="min-w-0">
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em]">每日人生 · {daily.date}</span>
              <strong className="mt-1 block truncate text-sm">{daily.title}：{daily.description}</strong>
            </span>
          </button>
        </motion.div>
      </section>

      <footer className="border-t border-ink/10 px-5 py-5 text-center text-xs leading-5 text-ink/45">
        所有人物与故事均为虚构；收入、教育、职业及生活事件为娱乐性简化模拟，不构成人生建议。
      </footer>
    </main>
  );
}
