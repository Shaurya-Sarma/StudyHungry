import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import COLORS from "../../res/colors/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Interval, { IntervalType } from "./Interval";
import { secondsToHMS } from "../../../helpers/TimeConverter";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RoutineContext } from "../../contexts/RoutineContext";
import Routine from "./Routine";

export default function RoutineCard(props: {
  name: string;
  isEnabled: boolean;
  intervals: Interval[];
  index: number;
  navigation: any;
}) {
  // import routine vars
  const { routines, setRoutines } = useContext(RoutineContext);
  const [isEnabled, setIsEnabled] = useState(props.isEnabled);

  useEffect(() => setIsEnabled(props.isEnabled), [props.isEnabled]);

  const toggleSwitch = () => {
    if (!isEnabled) {
      // if turning on switch
      // disable all other routine cards
      let routinesCopy = [...routines];
      routinesCopy.forEach((r: Routine, index: any) => {
        // if index of routine in routine[] is not the index of the selected (curr) routine card
        if (index !== props.index) {
          r.isEnabled = false;
        } else {
          r.isEnabled = true;
        }
      });
      setRoutines(routinesCopy);
    }

    setIsEnabled((previousState) => !previousState);
  };

  function calculateTotalTime() {
    let sum = 0;
    props.intervals.forEach((i) => {
      sum += i.length;
    });
    return secondsToHMS(sum);
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            name: "RoutineForm",
            params: {
              createNewRoutine: false,
              routineName: props.name,
              intervals: props.intervals,
              index: props.index,
            },
          });
        }}
      >
        <View style={[styles.card, styles.cardShadow]}>
          <View style={styles.cardContent}>
            <View style={[styles.row, styles.borderBottom]}>
              <Text style={styles.title}>{props.name}</Text>
              <Switch
                trackColor={{ false: COLORS.grey, true: COLORS.redOrange }}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{
                  transform: [{ scale: 1.25 }],
                }}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.itemList}>
                {props.intervals.slice(0, 3).map((i, index) => {
                  // displaying the first three intervals of the routine
                  return (
                    <View key={index} style={styles.itemRow}>
                      <Feather
                        name={i.type == IntervalType.Work ? "book" : "clock"}
                        size={30}
                        color="orange"
                      />
                      <Text style={styles.text}>{IntervalType[i.type]}</Text>
                      <Text style={styles.subtext}>
                        {secondsToHMS(i.length)}
                      </Text>
                    </View>
                  );
                })}
                <View style={styles.itemRow}>
                  <MaterialIcons name="timer" size={32} color="purple" />
                  <Text style={styles.text}>Total</Text>
                  <Text style={styles.subtext}>{calculateTotalTime()}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  cardShadow: generateBoxShadowStyle(
    0,
    0,
    COLORS.black,
    0.15,
    5,
    5,
    COLORS.black10
  ),
  cardContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "Nunito-SemiBold",
    maxWidth: "80%",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  borderBottom: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1.5,
    paddingBottom: 10,
  },
  itemList: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 10,
  },
  itemRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontFamily: "Nunito-Medium",
    fontSize: 18,
    marginHorizontal: 10,
  },
  subtext: {
    fontFamily: "Nunito-Medium",
    fontSize: 18,
    color: COLORS.darkGrey,
  },
});
