import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-svg";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import COLORS from "../../res/colors/Colors";

export default function AddTaskBar() {
  return (
    <View style={[styles.itemBar, styles.itemBarBoxShadow]}>
      <Text>Set your next goal...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemBar: {
    height: 50,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginHorizontal: 30,
    marginVertical: 12,
    borderRadius: 50,
  },
  itemBarBoxShadow: generateBoxShadowStyle(
    0,
    0,
    COLORS.black,
    0.1,
    20,
    5,
    COLORS.black10
  ),
});
