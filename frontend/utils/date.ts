// src/utils/date.ts

export function formatDate(isoString: string): string {
  if (!isoString) return "";
  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",   // "Oct"
    day: "2-digit",  // "10"
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
