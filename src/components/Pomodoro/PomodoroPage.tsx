import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Timer from "./Timer";

export default function PomodoroPage(props: {
  itemIndex: number;
  itemData: any;
}) {
  const windowWidth = useWindowDimensions();

  return (
    <>
      <View style={[styles.container, windowWidth]}>
        <Text style={[styles.subtitle]}>{props.itemData.subtitle}</Text>
        <Text style={[styles.title, { color: props.itemData.primaryColor }]}>
          {props.itemData.title}
        </Text>
        <Timer
          timerValue={props.itemData.timerValue}
          color={props.itemData.primaryColor}
          name={props.itemData.name}
          itemIndex={props.itemIndex}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 40,
    marginTop: -90,
  },
  title: {
    fontFamily: "Nunito-Black",
    fontSize: 60,
    textTransform: "uppercase",
    marginTop: -10,
  },
});
