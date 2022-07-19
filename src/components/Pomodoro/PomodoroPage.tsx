import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { ActionButton } from "./ActionButton";
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
      <View style={styles.buttonList}>
        <ActionButton name="settings" themeColor={itemData.primaryColor} />
        <ActionButton name="play" themeColor={itemData.primaryColor} />
        <ActionButton name="restart" themeColor={itemData.primaryColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonList: {
    flexDirection: "row",
  },
});
