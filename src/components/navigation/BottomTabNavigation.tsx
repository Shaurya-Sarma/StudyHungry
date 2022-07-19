import { Pressable, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import COLORS from "../../res/colors/Colors";
import Agenda from "../../screens/Agenda/index.Agenda";
import Logbook from "../../screens/Logbook/index.Logbook";
import Pomodoro from "../../screens/Pomodoro/index.Pomodoro";
import Tutorials from "../../screens/Tutorials/index.Tutorials";
import { AgendaIcon, LogbookIcon, PomodoroIcon, TutorialsIcon } from "../Icons";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import * as Haptics from "expo-haptics";
import React from "react";

// bottom navbar
const Tab = createBottomTabNavigator();
// Screen names
const pomodoroName = "Pomodoro";
const agendaName = "Agenda";
const tutorialsName = "Tutorials";
const logbookName = "Logbook";
// Styling constants
const iconSize = 40;
const iconColor = COLORS.purple;

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: COLORS.white }}
        initialRouteName="Pomodoro"
        screenOptions={({ route, navigation }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: [styles.tabBar, styles.tabBarBoxShadow],
          tabBarIcon: ({ focused }) => {
            let rn = route.name;
            let iconTag;
            // assigning navigation icon based on name of route
            if (rn === pomodoroName) {
              // assigning JSX Tag
              iconTag = (
                <PomodoroIcon
                  size={iconSize}
                  fillColor={iconColor}
                  isFocused={focused}
                />
              );
            } else if (rn === agendaName) {
              iconTag = (
                <AgendaIcon
                  size={iconSize}
                  fillColor={iconColor}
                  isFocused={focused}
                />
              );
            } else if (rn === tutorialsName) {
              iconTag = (
                <TutorialsIcon
                  size={iconSize}
                  fillColor={iconColor}
                  isFocused={focused}
                />
              );
            } else if (rn === logbookName) {
              iconTag = (
                <LogbookIcon
                  size={iconSize}
                  fillColor={iconColor}
                  isFocused={focused}
                />
              );
            }
            return (
              <Pressable
                onPress={() => {
                  // add haptic feedback and navigate to new route
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  navigation.navigate(rn);
                }}
              >
                {iconTag}
              </Pressable>
            );
          },
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
});
