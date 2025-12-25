import * as React from "react";
import {
  FaBook,
  FaBriefcase,
  FaCertificate,
  FaClipboardCheck,
  FaCode,
  FaChevronRight,
} from "react-icons/fa";

const activityMeta = {
  course_progress: { icon: FaBook, color: "bg-blue-50 text-blue-600" },
  assessment: { icon: FaClipboardCheck, color: "bg-emerald-50 text-emerald-600" },
  job_application: { icon: FaBriefcase, color: "bg-amber-50 text-amber-600" },
  skill_update: { icon: FaCode, color: "bg-indigo-50 text-indigo-600" },
  certification: { icon: FaCertificate, color: "bg-purple-50 text-purple-600" },
} as const;

const activities = [
  { type: "course_progress", title: "Completed ML course module 4", date: "Aug 12", time: "10:30 AM" },
  { type: "assessment", title: "Took Python skills assessment", date: "Aug 11", time: "03:15 PM" },
  { type: "job_application", title: "Applied to Data Scientist at Acme", date: "Aug 10", time: "09:00 AM" },
  { type: "skill_update", title: "Added Kubernetes to skills", date: "Aug 9", time: "07:45 PM" },
  { type: "certification", title: "AWS Practitioner prep started", date: "Aug 8", time: "08:10 PM" },
] as const;

export function RecentActivities() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white/90 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Recent activity</p>
          <p className="text-lg font-semibold text-slate-900">Keep up the momentum</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          View all <FaChevronRight size={12} />
        </button>
      </div>
      <div className="space-y-3">
        {activities.map((item) => {
          const meta = activityMeta[item.type];
          const Icon = meta.icon;
          return (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${meta.color}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">
                    {item.date} • {item.time}
                  </p>
                </div>
              </div>
              <FaChevronRight className="text-slate-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
