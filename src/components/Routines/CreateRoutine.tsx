import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import COLORS from "../../res/colors/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider, TextInput } from "react-native-paper";
import FocusedStatusBar from "../FocusedStatusBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateRoutine(props: any) {
  return (
    <>
      <FocusedStatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.modalContainer}>
        <Text style={styles.title}>Create Routine</Text>
        <Divider bold={true} style={{ borderColor: COLORS.grey }} />
        <TextInput
          style={styles.textInput}
          label="Name"
          value={props.routineName}
          onChangeText={(text) => props.setRoutineName(text)}
        />
        <View style={styles.buttonList}>
          <TouchableOpacity
            onPress={() => props.setIsVisibleRoutineModal(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.setIsVisibleRoutineModal(false)}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 25,
  },
  title: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 22,
    textAlign: "left",
    marginTop: 20,
    marginBottom: 10,
  },
  message: {
    fontFamily: "Nunito-Medium",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonList: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 18,
    color: COLORS.blue,
  },
  textInput: {
    marginVertical: 20,
  },
});
