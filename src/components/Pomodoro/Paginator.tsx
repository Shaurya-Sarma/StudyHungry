import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import COLORS from "../../res/colors/Colors";
import Animated from "react-native-reanimated";

const Paginator = ({ data, scrollX }: any) => {
  // const width: any = useWindowDimensions();

  return (
    <View style={styles.row}>
      {data.map((_: any, i: any) => {
        // // i represents the index of pagination
        // // animate the active pagination dot by increasing the width
        // const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        // // make current dot twice as big as previous and next dots
        // const dotWidth = scrollX.interpolate({
        //   inputRange,
        //   outRange: [0.3, 1, 0.3],
        //   extrapolate: "clamp",
        // });
        return (
          <Animated.View
            style={[styles.dot, { opacity: 0.5 }]}
            key={i.toString()}
          />
        );
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
