export const HOURS = Array.from({ length: 15 }, (_, i) => 8 + i); // 08..22
export function formatSlot(hour: number) {
  return `${`${hour}`.padStart(2, "0")}:00`;
}
