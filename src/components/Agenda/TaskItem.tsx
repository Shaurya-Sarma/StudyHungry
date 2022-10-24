import React from "react";
import { StyleSheet, Text, View } from "react-native";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import COLORS from "../../res/colors/Colors";

export default function TaskItem() {
  return (
    <View style={[styles.listItem, styles.listItemBoxShadow]}>
      <Text>LIST OF TASKS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    height: 50,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 30,
    marginVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  listItemBoxShadow: generateBoxShadowStyle(
    0,
    0,
    COLORS.black,
    0.1,
    20,
    5,
    COLORS.black10
  ),
});
