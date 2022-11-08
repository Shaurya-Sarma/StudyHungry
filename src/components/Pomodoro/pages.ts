import COLORS from "../../res/colors/Colors";
import SETTINGS from "../../res/Settings";
import STRINGS from "../../res/strings/en-EN";

const pageData = [
  {
    id: "1",
    subtitle: STRINGS.pomodoroTitleFocusSub,
    title: STRINGS.pomodoroTitleFocusMain,
    primaryColor: COLORS.blue,
    timerValue: SETTINGS.workTimerValue,
    name: "work"
  },
  {
    id: "2",
    subtitle: STRINGS.pomodoroTitleShortBreakSub,
    title: STRINGS.pomodoroTitleShortBreakMain,    
    primaryColor: COLORS.green,    
    timerValue: SETTINGS.shortBreakTimerValue,
    name: "short_break"
  },
  {
    id: "3",
    subtitle: STRINGS.pomodoroTitleLongBreakSub,
    title: STRINGS.pomodoroTitleLongBreakMain,    
    primaryColor: COLORS.orange,
    timerValue: SETTINGS.longBreakTimerValue,
    name: "long_break"
  }   

]

export default pageData;