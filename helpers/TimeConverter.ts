export function secondsToHMS(s:number) {
   if (s >= 86400) {
    // more than a day 
    return "+1 day";
  } else if (s >= 3600) {
    // within 1 hour to 24 days 
    return new Date(s * 1000).toISOString().slice(11, 19);
  }else {
    // anything less from 1 hr to 1 seconds
    return Math.floor(s / 60) + ":" + ("0" + Math.floor(s % 60)).slice(-2);
  }
}
