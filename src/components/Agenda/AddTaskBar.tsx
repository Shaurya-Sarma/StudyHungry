import React from "react";
import { StyleSheet, Text, View } from "react-native";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import COLORS from "../../res/colors/Colors";

export default function AddTaskBar() {
  return (
    <View style={[styles.itemBarBoxShadow, styles.itemBar]}>
      <Text style={styles.itemBarText}>Set your next goal...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemBar: {
    height: 50,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 30,
    marginVertical: 30,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  itemBarBoxShadow: generateBoxShadowStyle(
    0,
    0,
    COLORS.black,
    0.15,
    10,
    5,
    COLORS.black10
  ),
  itemBarText: {
    fontSize: 16,
    color: COLORS.purple,
    fontFamily: "Nunito-Regular",
  },
});
