import * as React from "react";

type LineComp = React.ComponentType<any> | null;

const trendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Data Science Jobs",
      data: [120, 135, 155, 180, 210, 245],
      borderColor: "rgb(37, 99, 235)",
      backgroundColor: "rgba(37, 99, 235, 0.15)",
      tension: 0.35,
      fill: true,
    },
    {
      label: "ML Engineer Jobs",
      data: [80, 95, 125, 160, 195, 230],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.15)",
      tension: 0.35,
      fill: true,
    },
    {
      label: "Data Analyst Jobs",
      data: [200, 205, 215, 225, 240, 250],
      borderColor: "rgb(147, 51, 234)",
      backgroundColor: "rgba(147, 51, 234, 0.15)",
      tension: 0.35,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" as const },
    tooltip: { mode: "index" as const, intersect: false },
  },
  interaction: { mode: "nearest" as const, intersect: false },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#64748b" } },
    y: {
      grid: { color: "rgba(148, 163, 184, 0.2)" },
      ticks: { color: "#64748b" },
    },
  },
};

export function JobTrendChart() {
  const [Line, setLine] = React.useState<LineComp>(null);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      await import("chart.js/auto");
      const mod = await import("react-chartjs-2");
      if (mounted) setLine(() => mod.Line);
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
          <p className="text-sm text-slate-500">Job market trend</p>
          <p className="text-lg font-semibold text-slate-900">Last 6 months</p>
        </div>
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>Last 24 months</option>
        </select>
      </div>
      <div className="h-64">
        {Line ? (
          <Line data={trendData} options={options} />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">Loading chart...</div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { label: "Data Science", change: "+18.5%" },
          { label: "ML Engineer", change: "+21.3%" },
          { label: "Data Analyst", change: "+8.2%" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2 text-sm text-slate-700"
          >
            <p className="font-medium">{item.label}</p>
            <p className="text-emerald-600">{item.change} growth</p>
          </div>
        ))}
      </div>
    </div>
  );
}
