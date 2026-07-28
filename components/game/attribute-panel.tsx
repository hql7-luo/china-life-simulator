import { motion } from "framer-motion";
import { jobMap } from "@/data/jobs";
import { attributeLabels, formatCurrency } from "@/utils/format";
import type { Player } from "@/types";

export function AttributePanel({ player }: { player: Player }) {
  return (
    <aside className="paper-card rounded-sm p-5">
      <div className="mb-5 flex items-end justify-between border-b border-ink/10 pb-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40">Status / 当前状态</p>
          <h2 className="mt-1 font-display text-xl font-bold">{player.birth.name}</h2>
        </div>
        <span className="stamp h-11 w-11 text-xs">{player.stage}</span>
      </div>
      <dl className="mb-6 grid grid-cols-2 gap-x-3 gap-y-4 text-sm">
        <Summary label="职业" value={jobMap[player.currentJob].name} />
        <Summary label="城市" value={player.currentCity} />
        <Summary label="教育" value={player.educationRoute} />
        <Summary label="家庭" value={`${player.marriage} · ${player.children} 子女`} />
      </dl>
      <div className="space-y-3.5">
        {(Object.entries(player.attributes) as Array<[keyof Player["attributes"], number]>).map(([key, value]) => (
          <div key={key}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-ink/62">{attributeLabels[key]}</span>
              <span className="font-mono font-bold">{value}</span>
            </div>
            <div className="attribute-track">
              <motion.div
                animate={{ width: `${value}%` }}
                className={`attribute-fill ${key === "stress" ? "is-stress" : ""}`}
                initial={false}
                transition={{ duration: 0.35 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 border-t border-ink/10 pt-4">
        <div>
          <span className="block text-[10px] text-ink/45">可用存款</span>
          <strong className="mt-1 block font-mono text-sm text-jade">{formatCurrency(player.assets.savings)}</strong>
        </div>
        <div className="border-l border-ink/10 pl-4">
          <span className="block text-[10px] text-ink/45">总负债</span>
          <strong className="mt-1 block font-mono text-sm text-cinnabar">{formatCurrency(player.assets.mortgage + player.assets.otherDebt)}</strong>
        </div>
      </div>
    </aside>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] text-ink/40">{label}</dt>
      <dd className="mt-0.5 truncate font-medium">{value}</dd>
    </div>
  );
}
