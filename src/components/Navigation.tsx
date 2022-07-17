import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import COLORS from "../res/colors/Colors";
import Agenda from "../screens/Agenda/index.Agenda";
import Logbook from "../screens/Logbook/index.Logbook";
import Pomodoro from "../screens/Pomodoro/index.Pomodoro";
import Tutorials from "../screens/Tutorials/index.Tutorials";
import { AgendaIcon, LogbookIcon, PomodoroIcon, TutorialsIcon } from "./Icons";

const Tab = createBottomTabNavigator();
// Screen names
const pomodoroName = "Pomodoro";
const agendaName = "Agenda";
const tutorialsName = "Tutorials";
const logbookName = "Logbook";

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Pomodoro"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            let rn = route.name;
            if (rn === pomodoroName) {
              icon = (
                <PomodoroIcon
                  size={40}
                  fillColor={COLORS.purple}
                  isFocused={focused}
                />
              );
            } else if (rn === agendaName) {
              icon = (
                <AgendaIcon
                  size={40}
                  fillColor={COLORS.purple}
                  isFocused={focused}
                />
              );
            } else if (rn === tutorialsName) {
              icon = (
                <TutorialsIcon
                  size={40}
                  fillColor={COLORS.purple}
                  isFocused={focused}
                />
              );
            } else if (rn === logbookName) {
              icon = (
                <LogbookIcon
                  size={40}
                  fillColor={COLORS.purple}
                  isFocused={focused}
                />
              );
            }

            return icon;
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name={pomodoroName} component={Pomodoro} />
        <Tab.Screen name={agendaName} component={Agenda} />
        <Tab.Screen name={tutorialsName} component={Tutorials} />
        <Tab.Screen name={logbookName} component={Logbook} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
