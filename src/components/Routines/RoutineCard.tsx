import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import COLORS from "../../res/colors/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function RoutineCard(props: any) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <>
      <View style={[styles.card, styles.cardShadow]}>
        <View style={styles.cardContent}>
          <View style={[styles.row, styles.borderBottom]}>
            <Text style={styles.title}>Default</Text>
            <Switch
              trackColor={{ false: COLORS.grey, true: COLORS.redOrange }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.itemList}>
              <View style={styles.itemRow}>
                <Feather name="book" size={30} color="orange" />
                <Text style={styles.text}>Work</Text>
                <Text style={styles.subtext}>25:00</Text>
              </View>
              <View style={styles.itemRow}>
                <Feather name="clock" size={30} color="orange" />
                <Text style={styles.text}>Break</Text>
                <Text style={styles.subtext}>10:00</Text>
              </View>
              <View style={styles.itemRow}>
                <Feather name="book" size={30} color="orange" />
                <Text style={styles.text}>Work</Text>
                <Text style={styles.subtext}>15:00</Text>
              </View>
              <View style={styles.itemRow}>
                <MaterialIcons name="timer" size={32} color="purple" />
                <Text style={styles.text}>Total</Text>
                <Text style={styles.subtext}>3:00:00</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 20,
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
  },
  row: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
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
    marginVertical: 15,
  },
  itemRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
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
