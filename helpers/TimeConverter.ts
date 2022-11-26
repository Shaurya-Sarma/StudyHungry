export function secondsToMS(s:number) {
  return Math.floor(s / 60) + ":" + ("0" + Math.floor(s % 60)).slice(-2);
}

export function secondsToHMS(s:number) {
  return new Date(s * 1000).toISOString().slice(11, 19);
}