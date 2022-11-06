import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import COLORS from "../../res/colors/Colors";
import Animated from "react-native-reanimated";
import { TimerContext } from "../../contexts/TimerContext";

const Paginator = ({ data }: any) => {
  // import timer variables
  const { currentPageIndex } = useContext(TimerContext);

  return (
    <View style={styles.row}>
      {data.map((_: any, i: any) => {
        if (currentPageIndex == i) {
          return (
            <Animated.View
              style={[styles.dot, { opacity: 1 }]}
              key={i.toString()}
            />
          );
        } else {
          return (
            <Animated.View
              style={[styles.dot, { opacity: 0.5 }]}
              key={i.toString()}
            />
          );
        }
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 30,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: COLORS.purple,
  },
});
