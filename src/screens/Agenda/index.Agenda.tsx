import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddTaskBar from "../../components/Agenda/AddTaskBar";
import TaskItem from "../../components/Agenda/TaskItem";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";

export default function Agenda() {
  const { width } = useWindowDimensions();
  return (
    <>
      <FocusedStatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, styles.item]}>{STRINGS.agendaTitle}</Text>
        <View style={[styles.main, { width: width }]}>
          <Text style={[styles.heading, styles.item]}>Todo:</Text>
          <TaskItem></TaskItem>
          <TaskItem></TaskItem>
          <TaskItem></TaskItem>
          <Text style={[styles.heading, styles.item]}>Goals: </Text>
          <TaskItem></TaskItem>
          <TaskItem></TaskItem>
          <TaskItem></TaskItem>
          <AddTaskBar></AddTaskBar>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    color: COLORS.white,
    fontFamily: "Nunito-ExtraBold",
    fontSize: 32,
    marginTop: 25,
    marginBottom: 20,
  },
  main: {
    backgroundColor: COLORS.white,
    height: "100%",
    borderTopRightRadius: 40,
  },
  heading: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
    marginTop: 15,
  },
  item: {
    marginHorizontal: 30,
  },
});
