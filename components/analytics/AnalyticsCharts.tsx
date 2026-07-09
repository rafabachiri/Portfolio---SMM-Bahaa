"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AUDIENCE_GROWTH,
  CONTENT_PERFORMANCE,
  CONTENT_SPLIT,
  ENGAGEMENT_TREND,
  REACH_GROWTH,
} from "@/lib/constants";

const TEAL = "#2EC4B6";
const AMBER = "#FFB627";
const GRID = "#1E3A5F";
const AXIS = "#9FB3C8";
// CVD-validated categorical palette (see dataviz validation).
const CAT = ["#FFB627", "#56B4E9", "#3DDC97", "#CC79A7"];

const axisProps = {
  stroke: GRID,
  tick: { fill: AXIS, fontSize: 11 },
  tickLine: false,
  axisLine: { stroke: GRID },
} as const;

const tooltipStyle = {
  contentStyle: {
    background: "#0d3358",
    border: "1px solid #1E3A5F",
    borderRadius: 12,
    fontSize: 12,
    color: "#F5F7FA",
  },
  labelStyle: { color: "#9FB3C8" },
  itemStyle: { color: "#F5F7FA" },
} as const;

function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface/50 p-4">
      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="font-heading text-sm font-semibold text-ink">{title}</h3>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AnalyticsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Reach growth — single series line */}
      <Panel title="Reach growth" hint="last 7 months (K)">
        <LineChart data={REACH_GROWTH} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
          <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} cursor={{ stroke: GRID }} />
          <Line
            type="monotone"
            dataKey="reach"
            name="Reach (K)"
            stroke={TEAL}
            strokeWidth={2.5}
            dot={{ r: 3, fill: TEAL, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            animationDuration={1400}
          />
        </LineChart>
      </Panel>

      {/* Engagement trend — single series area */}
      <Panel title="Engagement rate" hint="% per month">
        <AreaChart data={ENGAGEMENT_TREND} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id="engFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={AMBER} stopOpacity={0.5} />
              <stop offset="100%" stopColor={AMBER} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} cursor={{ stroke: GRID }} />
          <Area
            type="monotone"
            dataKey="rate"
            name="Engagement %"
            stroke={AMBER}
            strokeWidth={2.5}
            fill="url(#engFill)"
            animationDuration={1400}
          />
        </AreaChart>
      </Panel>

      {/* Audience growth — single series bar */}
      <Panel title="Audience growth" hint="net new followers (K)">
        <BarChart data={AUDIENCE_GROWTH} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
          <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} cursor={{ fill: "rgba(46,196,182,0.08)" }} />
          <Bar dataKey="followers" name="Followers (K)" fill={TEAL} radius={[4, 4, 0, 0]} animationDuration={1200} />
        </BarChart>
      </Panel>

      {/* Content split — categorical donut (legend = not colour-alone) */}
      <Panel title="Content mix" hint="share of output">
        <PieChart>
          <Tooltip {...tooltipStyle} />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: AXIS }}
          />
          <Pie
            data={CONTENT_SPLIT}
            dataKey="value"
            nameKey="name"
            innerRadius={45}
            outerRadius={72}
            paddingAngle={3}
            stroke="#00142b"
            strokeWidth={2}
            animationDuration={1200}
            label={({ value }) => `${value}%`}
            labelLine={false}
          >
            {CONTENT_SPLIT.map((_, i) => (
              <Cell key={i} fill={CAT[i % CAT.length]} />
            ))}
          </Pie>
        </PieChart>
      </Panel>

      {/* Content performance — two series comparison (legend present) */}
      <Panel title="Content performance" hint="reach vs saves (indexed)">
        <BarChart data={CONTENT_PERFORMANCE} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
          <CartesianGrid stroke={GRID} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="type" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} cursor={{ fill: "rgba(255,182,39,0.06)" }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: AXIS }} />
          <Bar dataKey="reach" name="Reach" fill={AMBER} radius={[4, 4, 0, 0]} animationDuration={1000} />
          <Bar dataKey="saves" name="Saves" fill={TEAL} radius={[4, 4, 0, 0]} animationDuration={1000} />
        </BarChart>
      </Panel>

      {/* Headline stat tile (a number is the right form here, not a chart) */}
      <div className="flex flex-col justify-center rounded-2xl border border-hairline bg-gradient-to-br from-surface-2 to-navy-dark p-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted">Avg. monthly growth</span>
        <span className="tnums mt-2 text-5xl font-bold text-gradient-amber">+38%</span>
        <span className="mt-2 text-sm text-muted">
          Compounded reach growth across managed accounts.{" "}
        </span>
      </div>
    </div>
  );
}
