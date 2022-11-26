import COLORS from "../../res/colors/Colors";
import { StyleSheet, View, Text } from "react-native";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import { Feather } from "@expo/vector-icons";
import { IntervalType } from "./Interval";
import { secondsToHMS, secondsToMS } from "../../../helpers/TimeConverter";

export default function IntervalCard(props: {
  type: IntervalType;
  length: number;
}) {
  return (
    <View style={[styles.card, styles.cardShadow]}>
      <View style={styles.cardContent}>
        <View style={styles.itemRow}>
          <Feather
            name={props.type == IntervalType.Work ? "book" : "clock"}
            size={24}
            color="orange"
          />
          <Text style={styles.text}>{IntervalType[props.type]}</Text>
          <Text style={styles.subtext}>{secondsToMS(props.length)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 15,
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
    color: COLORS.darkGrey,
  },
});
