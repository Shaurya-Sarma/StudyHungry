import { Pressable, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import COLORS from "../../res/colors/Colors";
import Agenda from "../../screens/Agenda/index.Agenda";
import Pomodoro from "../../screens/Pomodoro/index.Pomodoro";
import Tutorials from "../../screens/Tutorials/index.Tutorials";
import {
  AgendaIcon,
  RoutinesIcon,
  PomodoroIcon,
  TutorialsIcon,
} from "../Pomodoro/Icons";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import React from "react";
import addLightHapticFeedback from "../../../helpers/HapticFeedback";
import { TimerProvider } from "../../contexts/TimerContext";
import { SoundProvider } from "../../contexts/SoundContext";
import RoutinesStackNavigator from "./RoutinesStackNavigator";

// bottom navbar
const Tab = createBottomTabNavigator();
// Screen names
const pomodoroName = "Pomodoro";
const agendaName = "Agenda";
const tutorialsName = "Tutorials";
const routinesStackNavigatorName = "RoutinesStackNavigator";
// Styling constants
const iconSize = 40;
const iconColor = COLORS.purple;

export default function Navigation() {
  return (
    <>
      <SoundProvider>
        <TimerProvider>
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
                  } else if (rn === routinesStackNavigatorName) {
                    iconTag = (
                      <RoutinesIcon
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
                        addLightHapticFeedback("light");
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
              <Tab.Screen
                name={routinesStackNavigatorName}
                component={RoutinesStackNavigator}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </TimerProvider>
      </SoundProvider>
    </>
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
