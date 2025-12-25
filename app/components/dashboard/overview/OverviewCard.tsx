import * as React from "react";
import { type IconType } from "react-icons";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type OverviewCardProps = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: IconType;
  variant?: "primary" | "secondary";
};

export function OverviewCard({ title, value, change, trend, icon: Icon, variant = "primary" }: OverviewCardProps) {
  const accent =
    variant === "secondary"
      ? "from-emerald-50/60 to-white border-emerald-100"
      : "from-blue-50/60 to-white border-blue-100";

  return (
    <div className={`relative overflow-hidden rounded-xl border ${accent} bg-gradient-to-br p-4 shadow-sm backdrop-blur`}>
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 shadow">
        <Icon className={variant === "secondary" ? "text-emerald-600" : "text-blue-600"} size={18} />
      </div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
      <div className="mt-3 flex items-center gap-2 text-sm">
        {trend === "up" ? (
          <FaArrowUp className="text-emerald-500" />
        ) : (
          <FaArrowDown className="text-rose-500" />
        )}
        <span className={trend === "up" ? "text-emerald-600" : "text-rose-600"}>{change}</span>
        <span className="text-slate-500">vs last period</span>
      </div>
    </div>
  );
}
