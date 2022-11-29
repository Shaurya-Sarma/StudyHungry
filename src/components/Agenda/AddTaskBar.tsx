import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { FAB } from "react-native-paper";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";
import Task from "./Task";

export default function AddTaskBar(props: {
  task: Task | undefined;
  setTask: Function;
  addTask: Function;
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
      keyboardVerticalOffset={125}
    >
      <View style={[styles.itemBarBoxShadow, styles.itemBar]}>
        <TextInput
          style={styles.itemBarText}
          placeholder={STRINGS.addTaskBarDescription}
          placeholderTextColor={COLORS.purple}
          value={props.task?.description}
          onChangeText={(text) => props.setTask(new Task(text))}
        />
      </View>
      <View style={styles.itemBarBoxShadow}>
        <FAB
          icon="plus"
          mode="flat"
          style={styles.fab}
          onPress={() => props.addTask(props.task)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  itemBar: {
    width: 260,
    backgroundColor: COLORS.pureWhite,
    borderRadius: 50,
    marginVertical: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  itemBarBoxShadow: generateBoxShadowStyle(
    0,
    0,
    COLORS.black,
    0.1,
    10,
    5,
    COLORS.black10
  ),
  itemBarText: {
    fontSize: 16,
    color: COLORS.purple,
    fontFamily: "Nunito-Medium",
  },
  writeTaskWrapper: {
    position: "absolute",
    width: "100%",
    bottom: 135,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  fab: {
    backgroundColor: COLORS.pureWhite,
  },
});
