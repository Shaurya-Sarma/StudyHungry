import { Text, StyleSheet, View, ScrollView } from "react-native";
import COLORS from "../../res/colors/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider, TextInput } from "react-native-paper";
import FocusedStatusBar from "../FocusedStatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import IntervalCard from "./IntervalCard";
import SelectDropdown from "react-native-select-dropdown";
import Interval, { IntervalType } from "./Interval";
import { MaterialIcons } from "@expo/vector-icons";
import { RoutineContext } from "../../contexts/RoutineContext";
import Routine from "./Routine";
import { secondsToHMS } from "../../../helpers/TimeConverter";

export default function CreateRoutine({ navigation }: any) {
  // import routines vars
  const { routines, setRoutines } = useContext(RoutineContext);
  // error for submitting createRoutine "form"
  const [isError, setIsError] = useState(false);
  // data for dropdown menu: two types of routines
  const intervalTypes: IntervalType[] = [IntervalType.Work, IntervalType.Break];
  // form data --> routines object
  const [routineName, setRoutineName] = useState("");
  const [intervals, setIntervals] = useState<Interval[]>([]);

  function calculateTotalTime() {
    let sum = 0;
    intervals.forEach((i) => {
      sum += i.length;
    });
    return secondsToHMS(sum);
  }

  return (
    <>
      <FocusedStatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Create Routine</Text>
        <Divider
          bold={true}
          style={{ borderColor: COLORS.grey, borderWidth: 0.5 }}
        />
        <TextInput
          style={styles.textInput}
          label="Name"
          mode="outlined"
          error={isError}
          value={routineName}
          onChangeText={(text) => setRoutineName(text)}
        />
        <View style={styles.row}>
          <Text style={styles.heading}>Intervals:</Text>
          <SelectDropdown
            data={intervalTypes}
            onSelect={(selectedItem, index) => {
              // add interval card data to array
              // append to intervals array
              let intervalsCopy = [...intervals];
              let defaultTimeValue =
                selectedItem == IntervalType.Work ? 1500 : 300;
              intervalsCopy.push(new Interval(selectedItem, defaultTimeValue));
              setIntervals(intervalsCopy);
            }}
            defaultButtonText="Add"
            buttonTextAfterSelection={(selectedItem, index) => {
              return "Add";
            }}
            rowTextForSelection={(item, index) => {
              return IntervalType[item];
            }}
            renderDropdownIcon={() => {
              return (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color={COLORS.white}
                />
              );
            }}
            buttonTextStyle={styles.dropdownText}
            buttonStyle={styles.dropdown}
          />
        </View>
        <View style={[{ height: "54%" }]}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            style={[isError ? styles.borderBoxError : styles.borderBox]}
          >
            {intervals.map((i, index) => {
              return (
                <IntervalCard key={index} type={i.type} length={i.length} />
              );
            })}
          </ScrollView>
          <Text style={styles.subtitle}>
            Total Time: {calculateTotalTime()}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // validate form is complete
            if (
              routineName.trim().length == 0 ||
              routineName == undefined ||
              routineName == null ||
              routines.length <= 0
            ) {
              setIsError(true);
            } else {
              // form is valid
              setIsError(false);
              // add new Routine Card (either a work or break card)
              // append to routines array
              let routinesCopy = [...routines];
              routinesCopy.push(new Routine(routineName, intervals));
              setRoutines(routinesCopy);
              // navigate back to routines page
              navigation.pop();
            }
          }}
        >
          <Text style={styles.buttonText}>Add Routine</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 25,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 22,
    textAlign: "left",
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  heading: {
    fontFamily: "Nunito-Medium",
    fontSize: 18,
    textAlign: "left",
  },
  subtitle: {
    fontFamily: "Nunito-Medium",
    fontSize: 16,
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 15,
  },
  button: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: COLORS.purple,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 18,
    color: COLORS.white,
    textTransform: "uppercase",
    marginVertical: 5,
  },
  textInput: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  borderBox: {
    borderColor: COLORS.black,
    borderWidth: 0.75,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  borderBoxError: {
    borderColor: COLORS.darkRed,
    borderWidth: 2,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  dropdown: {
    width: "30%",
    height: "100%",
    borderRadius: 5,
    borderWidth: 0.75,
    borderColor: COLORS.purple,
    backgroundColor: COLORS.purple,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Nunito-Medium",
    color: COLORS.white,
  },
});
