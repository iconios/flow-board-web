// Convert ISO to datetime-local for input display
export const isoToDatetimeLocal = (isoString: string): string => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toISOString().slice(0, 16);
};

// Convert datetime-local to ISO for server
export const datetimeLocalToIso = (datetimeLocal: string): string => {
  if (!datetimeLocal) return "";
  // Append seconds and milliseconds, assume local timezone
  return new Date(datetimeLocal).toISOString();
};
