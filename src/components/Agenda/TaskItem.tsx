import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import generateBoxShadowStyle from "../../../helpers/BoxShadow";
import COLORS from "../../res/colors/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function TaskItem(props: any) {
  return (
    <View style={[styles.listItem, styles.listItemBoxShadow]}>
      <View style={styles.itemLeft}>
        <BouncyCheckbox
          onPress={(b: boolean) => {
            props.taskItems[props.index].isChecked = b;
          }}
          isChecked={props.isChecked}
          useNativeDriver={true}
          text={props.text}
          textStyle={styles.itemText}
          style={{ maxWidth: "90%" }}
          size={20}
          fillColor={COLORS.green}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
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
  itemText: {
    textDecorationLine: "none",
    fontSize: 16,
    color: COLORS.black,
    fontFamily: "Nunito-Medium",
  },
  itemLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
