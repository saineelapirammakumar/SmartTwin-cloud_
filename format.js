export function fmtTime(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function fmtHour(iso, withDay) {
  const d = new Date(iso);
  const time = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  return withDay ? d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) + " " + time : time;
}

export function fmtSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// "normal" | "warning" | "critical" for a value and its limits
export function levelOf(value, warning, critical) {
  if (value === null || value === undefined || warning == null) return null;
  if (value >= critical) return "critical";
  if (value >= warning) return "warning";
  return "normal";
}

export const TYPE_COLORS = { air: "#0b5563", water: "#1f6fb5", waste: "#8a6d1f", traffic: "#a23b5b" };
export const TYPE_NAMES = { air: "Air quality", water: "Water level", waste: "Waste bins", traffic: "Traffic" };
