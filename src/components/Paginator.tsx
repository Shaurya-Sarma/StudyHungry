import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import COLORS from "../res/colors/Colors";

const Paginator = (props: { data: any; pageIndex: number }) => {
  return (
    <View style={styles.row}>
      {props.data.map((_: any, i: any) => {
        if (props.pageIndex == i) {
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
