import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";

const pageData = [
  {
    id: "1",
    subtitle: STRINGS.pomodoroTitleFocusSub,
    title: STRINGS.pomodoroTitleFocusMain,
    primaryColor: COLORS.blue,
    timerValue: 1500,
  },
  {
    id: "2",
    subtitle: STRINGS.pomodoroTitleShortBreakSub,
    title: STRINGS.pomodoroTitleShortBreakMain,    
    primaryColor: COLORS.green,    
    timerValue: 300,

  },
  {
    id: "3",
    subtitle: STRINGS.pomodoroTitleLongBreakSub,
    title: STRINGS.pomodoroTitleLongBreakMain,    
    primaryColor: COLORS.orange,
    timerValue: 1200,
  }   

]

export default pageData;