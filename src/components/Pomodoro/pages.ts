import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";

const pageData = [
  {
    id: "1",
    subtitle: STRINGS.pomodoroTitleFocusSub,
    title: STRINGS.pomodoroTitleFocusMain,
    primaryColor: COLORS.blue,
    timerValue: 1501,
    name: "work"
  },
  {
    id: "2",
    subtitle: STRINGS.pomodoroTitleShortBreakSub,
    title: STRINGS.pomodoroTitleShortBreakMain,    
    primaryColor: COLORS.green,    
    timerValue: 301,
    name: "short_break"
  },
  {
    id: "3",
    subtitle: STRINGS.pomodoroTitleLongBreakSub,
    title: STRINGS.pomodoroTitleLongBreakMain,    
    primaryColor: COLORS.orange,
    timerValue: 1201,
    name: "long_break"
  }   

]

export default pageData;