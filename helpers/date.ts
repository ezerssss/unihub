export function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ap = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minuteString = minutes.toString().padStart(2, '0');
  return hours.toString() + ':' + minuteString + ' ' + ap;
}
