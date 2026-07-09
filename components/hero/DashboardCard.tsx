"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { StatCard } from "@/lib/constants";
import { useCountUp } from "./useCountUp";

/** Mini sparkline that "grows" on load. */
function Sparkline({ data }: { data: number[] }) {
  const reduce = useReducedMotion();
  const w = 96;
  const h = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible" aria-hidden>
      <motion.polyline
        points={pts}
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}

export function DashboardCard({ stat, index, active }: { stat: StatCard; index: number; active: boolean }) {
  const count = useCountUp(stat.value, { decimals: stat.decimals ?? 0, active });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col gap-2 rounded-2xl border border-hairline bg-surface/80 p-4 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg" aria-hidden>
          {stat.icon}
        </span>
        {stat.trend && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
            <TrendingUp className="h-3 w-3" />
            {stat.trend}
          </span>
        )}
      </div>

      <div className="tnums text-2xl font-bold leading-none text-ink sm:text-[1.75rem]">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="text-xs font-medium text-muted">{stat.label}</span>
        {stat.spark && <Sparkline data={stat.spark} />}
      </div>
    </motion.div>
  );
}
