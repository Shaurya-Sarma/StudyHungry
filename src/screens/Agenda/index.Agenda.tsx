import React, { useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import Animated from "react-native-reanimated";

export default function Agenda() {
  const { width } = useWindowDimensions();

  // declare task methods
  //-------------------------------------------------------
  const [task, setTask] = useState<{
    description: "";
    isChecked: false;
    uuid: string | number[];
  }>();
  const [taskItems, setTaskItems] = useState<any>([]);

  // add task
  function handleAddTask() {
    if (task && task.description.trim().length !== 0) {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask({ description: "", isChecked: false, uuid: uuid.v4() });
    }
  }

  // delete a task
  function deleteTask(index: number) {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    removeItemValue(taskItems[index].uuid);
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

  // local storage methods
  //-------------------------------------------------------
  // add to local storage
  const storeData = async (value: {
    description: string;
    isChecked: boolean;
    uuid: string;
  }) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(value.uuid, jsonValue);
    } catch (e) {
      console.log("Error in saving task: " + e);
    }
  };

  // read data from local storage
  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      return items;
    } catch (e) {
      console.log("Error in retrieving tasks: " + e);
    }
  };

  // delete data from local storage
  const removeItemValue = async (key: any) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };

  // on initialize retrieve the data
  useEffect(() => {
    // AsyncStorage.clear();
    const retrieveData = async () => {
      const dataKeyValue = await getData();
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
        storeData(taskItems[i]);
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
              {taskItems.map(
                (
                  task: {
                    description: string;
                    isChecked: boolean;
                    uuid: string;
                  },
                  index: number
                ) => {
                  // store data to local storage - accounts for if checked
                  if (task.uuid !== undefined) {
                    storeData(task);
                  }

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
                        text={task?.description}
                        isChecked={task?.isChecked}
                        index={index}
                        taskItems={taskItems}
                        setTaskItems={setTaskItems}
                      />
                    </Swipeable>
                  );
                }
              )}
            </ScrollView>
          </View>
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
