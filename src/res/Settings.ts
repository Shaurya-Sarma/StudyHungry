const SETTINGS = {
  workTimerValue: 1501, // 25:00 minutes
  shortBreakTimerValue: 301, // 5:00 minutes
  longBreakTimerValue: 1201, // 20:00 minutes
  timerDurationMultiplier: 10, // multiply 1000 to convert to seconds [STANDARD] reduce by factor of 10 to speed up [DEV]
  countdownInterval: 5, // reduce timing between clock reset on flip mode
}

export default SETTINGS;
