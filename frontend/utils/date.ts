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

// src/utils/date.ts
export function formatDateToISO(date: Date): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`; // "YYYY-MM-DD"
}

export function formatDateToUTC(date: Date) {
  const now = new Date();
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  )).toISOString();
}

export function formatForDisplay(isoString: string) {

  if (!isoString) return "-";
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return {
    date: `${day}-${month}-${year}`,
    time: `${hours}:${minutes}`,
  };
}

