export default function formatTime(utcTime: string): string {
  const date: Date = new Date(utcTime);
  const year: string = date.getUTCFullYear().toString();
  const month: string = date.getUTCMonth() + 1 < 10 ? '0' + (date.getUTCMonth() + 1) : '' + (date.getUTCMonth() + 1);
  const day: string = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : '' + date.getUTCDate();
  const hours: string = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : '' + date.getUTCHours();
  const minutes: string = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : '' + date.getUTCMinutes();

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}
