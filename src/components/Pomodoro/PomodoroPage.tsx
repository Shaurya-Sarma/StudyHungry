import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Timer from "./Timer";

export default function PomodoroPage({ itemData }: { itemData: any }) {
  const windowWidth = useWindowDimensions();

  return (
    <View style={[styles.container, windowWidth]}>
      <Text>{itemData.title}</Text>
      <Timer
        timerValue={itemData.timerValue}
        color={itemData.primaryColor}
        accentColor={itemData.accentColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
