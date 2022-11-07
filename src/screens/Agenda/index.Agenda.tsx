import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddTaskBar from "../../components/Agenda/AddTaskBar";
import TaskItem from "../../components/Agenda/TaskItem";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";
import uuid from "react-native-uuid";

export default function Agenda() {
  const { width } = useWindowDimensions();

  // declare task state
  const [task, setTask] = useState<{
    description: "";
    isChecked: false;
  }>();
  const [taskItems, setTaskItems] = useState<any>([]);

  function handleAddTask() {
    if (task && task.description.trim().length !== 0) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask({ description: "", isChecked: false });
    }
  }

  return (
    <>
      <FocusedStatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{STRINGS.agendaTitle}</Text>
        <View style={[styles.main, { width: width }]}>
          <Text style={styles.heading}>My Tasks</Text>

          {taskItems.map(
            (
              task: { description: string; isChecked: boolean },
              index: number
            ) => {
              return (
                <TaskItem
                  key={uuid.v4()}
                  text={task?.description}
                  isChecked={task?.isChecked}
                  index={index}
                  taskItems={taskItems}
                />
              );
            }
          )}
          <AddTaskBar
            taskText={task?.description}
            setTask={setTask}
            handleAddTask={handleAddTask}
          ></AddTaskBar>
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
    marginVertical: 20,
    marginHorizontal: 20,
  },
  main: {
    backgroundColor: COLORS.white,
    height: "100%",
    borderTopRightRadius: 40,
  },
  heading: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
});
