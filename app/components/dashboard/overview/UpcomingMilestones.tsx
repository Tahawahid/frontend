import * as React from "react";

const milestones = [
  { title: "ML Course", due: "Aug 20", progress: 75, category: "learning" },
  { title: "AWS Cert", due: "Sep 5", progress: 40, category: "certification" },
  { title: "Resume Update", due: "Aug 15", progress: 20, category: "career" },
  { title: "Data Viz Project", due: "Aug 30", progress: 60, category: "project" },
];

const categoryColors: Record<string, string> = {
  learning: "bg-blue-50 text-blue-700",
  certification: "bg-purple-50 text-purple-700",
  career: "bg-amber-50 text-amber-700",
  project: "bg-emerald-50 text-emerald-700",
};

export function UpcomingMilestones() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white/90 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Upcoming milestones</p>
          <p className="text-lg font-semibold text-slate-900">Stay on track</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {milestones.map((item) => (
          <div key={item.title} className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${categoryColors[item.category]}`}>
                {item.category}
              </span>
            </div>
            <p className="text-xs text-slate-500">Due {item.due}</p>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
              <span>{item.progress}% complete</span>
              <button className="text-blue-600 hover:underline">View details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
