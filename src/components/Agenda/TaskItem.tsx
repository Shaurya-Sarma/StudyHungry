import React from "react";
import { StyleSheet, Text, View } from "react-native";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import COLORS from "../../res/colors/Colors";

export default function TaskItem() {
  return (
    <View style={[styles.listItem, styles.listItemBoxShadow]}>
      <Text style={styles.listItemText}>read this book and go to sleep</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    height: 47.5,
    backgroundColor: COLORS.white,
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
    0.15,
    10,
    5,
    COLORS.black10
  ),
  listItemText: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: "Nunito-Medium",
  },
});
