import { Text, StyleSheet, View, ScrollView } from "react-native";
import COLORS from "../../res/colors/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider, TextInput } from "react-native-paper";
import FocusedStatusBar from "../FocusedStatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import IntervalCard from "./IntervalCard";
import SelectDropdown from "react-native-select-dropdown";
import Interval, { IntervalType } from "./Interval";
import { MaterialIcons } from "@expo/vector-icons";
import { RoutineContext } from "../../contexts/RoutineContext";
import Routine from "./Routine";
import { secondsToHMS } from "../../../helpers/TimeConverter";
import addHapticFeedback from "../../../helpers/HapticFeedback";
import { removeRoutine } from "../../api/AsyncStorage";
import STRINGS from "../../res/strings/en-EN";

export default function RoutineForm({ navigation, route }: any) {
  // ---------------------------------------------------------------------------------------
  // {route} has three vars
  // createNewForm: boolean => to determine if editing or creating a routine
  // routeName : string =>  if editing then previous name of routine
  // intervals : Interval[] => if editing then list of previous Interval objects

  useEffect(() => {
    // update form with the data of the selected routine card
    if (route.params?.createNewRoutine == false) {
      setRoutineName(route.params?.routineName);
      setIntervals(route.params?.intervals);
    }
  }, []);

  // ---------------------------------------------------------------------------------------

  // import routines vars
  const { routines, setRoutines } = useContext(RoutineContext);
  // error for submitting form
  const [isNameFieldError, setIsNameFieldError] = useState(false);
  const [isIntervalFieldError, setIsIntervalFieldError] = useState(false);
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
        <Text style={styles.title}>
          {route.params?.createNewRoutine == false
            ? STRINGS.routineFormTitleEdit
            : STRINGS.routineFormTitleCreate}
        </Text>
        <Divider
          bold={true}
          style={{ borderColor: COLORS.grey, borderWidth: 0.5 }}
        />

        <TextInput
          style={styles.textInput}
          label="Name"
          mode="outlined"
          error={isNameFieldError}
          value={routineName}
          onChangeText={(text) => setRoutineName(text)}
        />
        <View style={styles.row}>
          <Text style={styles.heading}>
            {STRINGS.routineFormSubheadingIntervals}
          </Text>
          <SelectDropdown
            data={intervalTypes}
            onSelect={(selectedItem, index) => {
              addHapticFeedback("light");
              // add interval card data to array
              // append to intervals array
              let intervalsCopy = [...intervals];
              let defaultTimeValue =
                selectedItem == IntervalType.Work ? 1500 : 300;
              intervalsCopy.push(new Interval(selectedItem, defaultTimeValue));
              setIntervals(intervalsCopy);
            }}
            defaultButtonText={STRINGS.routineFormAddButton}
            buttonTextAfterSelection={(selectedItem, index) => {
              return STRINGS.routineFormAddButton;
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
        <View style={[{ height: "46.75%" }]}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always"
            style={[
              isIntervalFieldError ? styles.borderBoxError : styles.borderBox,
            ]}
          >
            {intervals.map((i, index) => {
              return (
                <IntervalCard
                  key={index}
                  type={i.type}
                  length={i.length}
                  currentIntervalIndex={index}
                  intervals={intervals}
                  setIntervals={setIntervals}
                />
              );
            })}
          </ScrollView>
        </View>
        <Text style={styles.subtitle}>
          {STRINGS.routineFormSubheadingTotalTime} {calculateTotalTime()}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (
              routineName.trim().length == 0 ||
              routineName == undefined ||
              routineName == null
            ) {
              setIsNameFieldError(true);
            } else {
              setIsNameFieldError(false);
            }

            if (intervals.length <= 0) {
              setIsIntervalFieldError(true);
            } else {
              setIsIntervalFieldError(false);
            }

            // validate form is complete
            let isValid = false;

            // toggle isValid
            if (
              !(
                routineName.trim().length == 0 ||
                routineName == undefined ||
                routineName == null ||
                intervals.length <= 0
              )
            ) {
              isValid = true;
            }

            if (isValid) {
              // form is valid
              setIsNameFieldError(false);
              setIsIntervalFieldError(false);
              if (route.params?.createNewRoutine == false) {
                // editing routine
                let routinesCopy = [...routines];
                routinesCopy.splice(route.params?.index, 1);
                removeRoutine(routines[route.params?.index].uuid);
                // add new routine
                routinesCopy.push(new Routine(routineName, intervals, false));
                setRoutines(routinesCopy);
              } else {
                // adding a new routine
                let routinesCopy = [...routines];
                // append new routine to the routines array
                routinesCopy.push(new Routine(routineName, intervals, false));
                setRoutines(routinesCopy);
              }

              // navigate back to routines page
              navigation.pop();
            }
          }}
        >
          <Text style={styles.buttonText}>{STRINGS.routineFormSaveButton}</Text>
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
