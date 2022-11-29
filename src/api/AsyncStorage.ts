import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "../components/Agenda/Task";

// add to local storage
export const storeTaskItem = async (value: Task) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(value.uuid, jsonValue);
  } catch (e) {
    console.log("Error in saving task: " + e);
  }
};

// read data from local storage
export const getTaskItems = async () => {
  let taskKeys = [];
  try {
    const keys = await AsyncStorage.getAllKeys();
    taskKeys = keys.filter((key) => key.includes("task")) // gets only keys with task- identifier
    // console.log("taskKeys: " + taskKeys)
    const items = await AsyncStorage.multiGet(taskKeys);
    return items;
  } catch (e) {
    console.log("Error in retrieving tasks: " + e);
  }
};

// delete data from local storage
export const removeTask= async (key: Task["uuid"]) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};