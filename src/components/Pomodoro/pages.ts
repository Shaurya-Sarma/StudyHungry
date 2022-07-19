import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";

const pageData = [
  {
    id: "1",
    title: STRINGS.pomodoroTitleFocus,
    primaryColor: COLORS.blue,
    accentColor: COLORS.blueAccent,
    timerValue: 1500,
  },
  {
    id: "2",
    title: STRINGS.pomodoroTitleShortBreak,
    primaryColor: COLORS.green,    
    timerValue: 300,

  },
  {
    id: "3",
    title: STRINGS.pomodoroTitleLongBreak,
    primaryColor: COLORS.orange,
    timerValue: 1200,
  }   

]

export default pageData;