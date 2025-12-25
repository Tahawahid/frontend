import * as React from "react";

type RadarComp = React.ComponentType<any> | null;

const labels = [
  "Python Programming",
  "Machine Learning",
  "Data Analysis",
  "SQL & Databases",
  "Cloud Computing",
  "Statistics",
  "Data Visualization",
  "Communication",
];

const radarData = {
  labels,
  datasets: [
    {
      label: "Current Skills",
      data: [85, 70, 75, 80, 45, 60, 65, 70],
      borderColor: "rgb(37, 99, 235)",
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      pointBackgroundColor: "rgb(37, 99, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(37, 99, 235)",
    },
    {
      label: "Target Level",
      data: [90, 85, 80, 85, 75, 80, 75, 85],
      borderColor: "rgb(147, 51, 234)",
      backgroundColor: "rgba(147, 51, 234, 0.08)",
      borderDash: [6, 6],
      pointRadius: 0,
    },
  ],
};

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" as const },
    tooltip: { callbacks: {} },
  },
  scales: {
    r: {
      grid: { color: "rgba(148, 163, 184, 0.2)" },
      angleLines: { color: "rgba(148, 163, 184, 0.2)" },
      pointLabels: { color: "#475569", font: { size: 11 } },
      ticks: { backdropColor: "transparent", color: "#94a3b8", stepSize: 20 },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

const breakdown = [
  { label: "Python Programming", value: 85 },
  { label: "Machine Learning", value: 70 },
  { label: "Data Analysis", value: 75 },
  { label: "SQL & Databases", value: 80 },
  { label: "Cloud Computing", value: 45 },
  { label: "Statistics", value: 60 },
  { label: "Data Visualization", value: 65 },
  { label: "Communication", value: 70 },
];

export function SkillRadarChart() {
  const [Radar, setRadar] = React.useState<RadarComp>(null);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      await import("chart.js/auto");
      const mod = await import("react-chartjs-2");
      if (mounted) setRadar(() => mod.Radar);
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-white/90 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Skill readiness</p>
          <p className="text-lg font-semibold text-slate-900">Current vs target</p>
        </div>
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
          <option>All skills</option>
          <option>Technical</option>
          <option>Soft skills</option>
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 h-72">
          {Radar ? (
            <Radar data={radarData} options={radarOptions} />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">Loading chart...</div>
          )}
        </div>
        <div className="space-y-3">
          {breakdown.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
              <div className="flex justify-between text-sm font-medium text-slate-700">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
          <div className="grid gap-2 md:grid-cols-3">
            {[
              { title: "Strongest", body: "Python, SQL, Analysis", color: "bg-emerald-50" },
              { title: "Growth", body: "Cloud, Statistics", color: "bg-amber-50" },
              { title: "Next steps", body: "Target ML depth", color: "bg-blue-50" },
            ].map((box) => (
              <div key={box.title} className={`rounded-lg border border-slate-100 px-3 py-2 text-xs ${box.color}`}>
                <p className="font-semibold text-slate-800">{box.title}</p>
                <p className="text-slate-600">{box.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
