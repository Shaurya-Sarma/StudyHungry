import COLORS from "../../res/colors/Colors";
import { StyleSheet, View, Text } from "react-native";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import { Feather } from "@expo/vector-icons";
import Interval, { IntervalType } from "./Interval";
import { secondsToHMS } from "../../../helpers/TimeConverter";
import { TouchableOpacity } from "react-native-gesture-handler";
import SegmentedPicker, { Selections } from "react-native-segmented-picker";
import { useRef, useState } from "react";
import addHapticFeedback from "../../../helpers/HapticFeedback";

export default function IntervalCard(props: {
  type: IntervalType;
  length: number;
  currentIntervalIndex: number;
  intervals: Interval[];
  setIntervals: Function;
}) {
  // define picker attributes
  // ---------------------------------------------------
  const segmentedPickerControls = useRef<SegmentedPicker>(null);
  const [selections, setSelections] = useState<Selections>({
    Hours: "0",
    Minutes: `${Math.floor(props.length / 60)}`,
    Seconds: "0",
  });
  function createPickerObject() {
    let options = [];
    let col_1 = {
      key: "Hours",
      items: [] as { label: string; value: string }[],
    };
    // add 0 - 23 hours
    for (let i = 0; i <= 23; i++) {
      col_1.items.push({ label: `${i} hours`, value: `${i}` });
    }
    let col_2 = {
      key: "Minutes",
      items: [] as { label: string; value: string }[],
    };
    // add 0 - 59 minutes
    for (let j = 0; j <= 59; j++) {
      col_2.items.push({ label: `${j} min`, value: `${j}` });
    }
    let col_3 = {
      key: "Seconds",
      items: [] as { label: string; value: string }[],
    };
    // add 1 - 59 seconds
    for (let j = 1; j <= 59; j++) {
      col_3.items.push({ label: `${j} sec`, value: `${j}` });
    }
    options.push(col_1);
    options.push(col_2);
    options.push(col_3);
    return options;
  }
  // ---------------------------------------------------

  function deleteInterval() {
    addHapticFeedback("light");
    // delete selected interval
    let intervalsCopy = [...props.intervals];
    intervalsCopy.splice(props.currentIntervalIndex, 1);
    props.setIntervals(intervalsCopy);
  }

  return (
    <>
      <TouchableOpacity onPress={() => deleteInterval()}>
        <View style={[styles.card, styles.cardShadow]}>
          <View style={styles.cardContent}>
            <View style={styles.itemRow}>
              <Feather
                name={props.type == IntervalType.Work ? "book" : "clock"}
                size={24}
                color="orange"
              />
              <Text style={styles.text}>{IntervalType[props.type]}</Text>
              <TouchableOpacity
                style={{ padding: 12.5 }}
                onPress={() => {
                  segmentedPickerControls.current?.show();
                }}
              >
                <Text style={styles.subtext}>{secondsToHMS(props.length)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <SegmentedPicker
        ref={segmentedPickerControls}
        onConfirm={(selections) => {
          addHapticFeedback("light");
          setSelections(selections);
          // change the time value of the selected interval
          let intervalsCopy = [...props.intervals];
          // convert selections object to time in seconds
          const timeInSeconds =
            parseInt(selections["Hours"]) * 3600 +
            parseInt(selections["Minutes"]) * 60 +
            parseInt(selections["Seconds"]);
          if (intervalsCopy[props.currentIntervalIndex] !== undefined) {
            intervalsCopy[props.currentIntervalIndex].length = timeInSeconds;
          }
          props.setIntervals(intervalsCopy);
        }}
        onValueChange={() => {
          addHapticFeedback("light");
        }}
        options={createPickerObject()}
        defaultSelections={selections}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 0,
  },
  itemRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontFamily: "Nunito-Medium",
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 0,
  },
  subtext: {
    fontFamily: "Nunito-Medium",
    fontSize: 16,
    color: COLORS.blue,
  },
});
