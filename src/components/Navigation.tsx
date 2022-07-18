import { StyleSheet, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import COLORS from "../res/colors/Colors";
import Agenda from "../screens/Agenda/index.Agenda";
import Logbook from "../screens/Logbook/index.Logbook";
import Pomodoro from "../screens/Pomodoro/index.Pomodoro";
import Tutorials from "../screens/Tutorials/index.Tutorials";
import { AgendaIcon, LogbookIcon, PomodoroIcon, TutorialsIcon } from "./Icons";
import generateBoxShadowStyle from "../../helpers/BoxShadow";
import * as Haptics from "expo-haptics";
import Ripple from "react-native-material-ripple";

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
        sceneContainerStyle={{ backgroundColor: COLORS.white }}
        initialRouteName="Pomodoro"
        screenOptions={() => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: [styles.tabBar, styles.tabBarBoxShadow],
        })}
      >
        <Tab.Screen
          name={pomodoroName}
          component={Pomodoro}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                // <Ripple
                //   style={styles.iconButton}
                //   rippleColor={COLORS.purple}
                //   rippleOpacity={0.3}
                //   rippleDuration={500}
                //   rippleCentered={true}
                //   rippleContainerBorderRadius={100}
                // >
                <TouchableOpacity
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <PomodoroIcon
                    size={40}
                    fillColor={COLORS.purple}
                    isFocused={focused}
                  />
                </TouchableOpacity>
                // </Ripple>
              );
            },
          }}
        />
        <Tab.Screen
          name={agendaName}
          component={Agenda}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <AgendaIcon
                  size={40}
                  fillColor={COLORS.purple}
                  isFocused={focused}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={tutorialsName}
          component={Tutorials}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TutorialsIcon
                  size={40}
                  fillColor={COLORS.purple}
                  isFocused={focused}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={logbookName}
          component={Logbook}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <LogbookIcon
                  size={40}
                  fillColor={COLORS.purple}
                  isFocused={focused}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopWidth: 0,
    position: "absolute",
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 0,
  },
  tabBarBoxShadow: generateBoxShadowStyle(
    0,
    0,
    COLORS.black,
    0.1,
    20,
    5,
    COLORS.black10
  ),
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
