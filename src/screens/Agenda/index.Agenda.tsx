import React, { useContext, useEffect } from "react";
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
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { AgendaContext } from "../../contexts/AgendaContext";
import Task from "../../components/Agenda/Task";
import {
  getTaskItems,
  removeTask,
  storeTaskItem,
} from "../../api/AsyncStorage";

export default function Agenda() {
  const { width } = useWindowDimensions();
  const { taskItems, setTaskItems } = useContext(AgendaContext);

  const [task, setTask] = useState<Task>();

  // add task
  function addTask(task: Task) {
    if (task && task.description.trim().length !== 0) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask(new Task(""));
    }
  }

  // delete a task
  function deleteTask(index: number) {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    removeTask(taskItems[index].uuid);
    setTaskItems(itemsCopy);
  }

  // set up swipeable and delete icon
  //-------------------------------------------------------
  const RightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <Animated.View style={styles.deleteContainer}>
        <Feather
          style={styles.deleteIcon}
          name="trash"
          size={28}
          color={COLORS.white}
        />
      </Animated.View>
    );
  };

  // on initialize retrieve the data
  useEffect(() => {
    // use to clear async storage: DEV
    // AsyncStorage.clear();
    const retrieveData = async () => {
      const dataKeyValue = await getTaskItems();
      const data = dataKeyValue?.map((pair) => {
        if (pair[1] !== null) {
          return JSON.parse(pair[1]);
        }
      });
      setTaskItems(data);
    };

    retrieveData();
  }, []);

  // on page destruct save the data in current state
  useEffect(() => {
    return () => {
      for (let i = 0; i > taskItems.length; i++) {
        storeTaskItem(taskItems[i]);
      }
    };
  });

  return (
    <>
      <FocusedStatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{STRINGS.agendaTitle}</Text>
        <View style={[styles.main, { width: width }]}>
          <Text style={styles.heading}>{STRINGS.agendaHeading}</Text>
          <View style={{ height: "62.5%" }}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              automaticallyAdjustKeyboardInsets={true}
            >
              {taskItems.map((task: Task, index: number) => {
                storeTaskItem(task); // store data to local storage

                return (
                  <Swipeable
                    key={task.uuid}
                    overshootRight={true}
                    onSwipeableOpen={(direction: "left" | "right") => {
                      deleteTask(index);
                    }}
                    renderRightActions={RightActions}
                  >
                    <TaskItem
                      key={task.uuid}
                      text={task.description}
                      isChecked={task.isChecked}
                      index={index}
                      taskItems={taskItems}
                      setTaskItems={setTaskItems}
                    />
                  </Swipeable>
                );
              })}
            </ScrollView>
          </View>
          <AddTaskBar task={task} setTask={setTask} addTask={addTask} />
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
  deleteContainer: {
    width: "90%",
    marginVertical: 12,
    marginHorizontal: 20,
    backgroundColor: COLORS.red,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
  },
  deleteIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
});
