import * as React from "react";

const rows = [
  { skill: "Deep Learning", category: "AI/ML", current: 3, required: 5, gap: 2, importance: "high" },
  { skill: "Cloud Deployment", category: "DevOps", current: 2, required: 4, gap: 2, importance: "high" },
  { skill: "Data Visualization", category: "Analytics", current: 4, required: 5, gap: 1, importance: "medium" },
  { skill: "Project Management", category: "Delivery", current: 3, required: 4, gap: 1, importance: "medium" },
];

const badgeClass = {
  high: "bg-rose-50 text-rose-700",
  medium: "bg-amber-50 text-amber-700",
  low: "bg-emerald-50 text-emerald-700",
} as const;

const gapColor = (gap: number) => {
  if (gap >= 2) return "text-rose-600";
  if (gap >= 1) return "text-amber-600";
  return "text-emerald-600";
};

const Bar = ({ value }: { value: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <div
        key={n}
        className={`h-2 w-6 rounded ${n <= value ? "bg-blue-500" : "bg-slate-200"}`}
      />
    ))}
  </div>
);

export function SkillGapSummary() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white/90 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Skill gap analysis</p>
          <p className="text-lg font-semibold text-slate-900">Focus on critical gaps</p>
        </div>
        <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          View detailed analysis
        </button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2 font-medium">Skill</th>
              <th className="px-3 py-2 font-medium">Category</th>
              <th className="px-3 py-2 font-medium">Current</th>
              <th className="px-3 py-2 font-medium">Required</th>
              <th className="px-3 py-2 font-medium">Gap</th>
              <th className="px-3 py-2 font-medium">Importance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.skill} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                <td className="px-3 py-2 font-semibold text-slate-900">{row.skill}</td>
                <td className="px-3 py-2 text-slate-600">{row.category}</td>
                <td className="px-3 py-2">
                  <Bar value={row.current} />
                </td>
                <td className="px-3 py-2">
                  <Bar value={row.required} />
                </td>
                <td className={`px-3 py-2 font-semibold ${gapColor(row.gap)}`}>{row.gap}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeClass[row.importance]}`}>
                    {row.importance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
        Recommended actions: Deep dive into deployment best practices, schedule cloud hands-on labs, and pair with mentor
        for ML productionization.
      </div>
    </div>
  );
}
