import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Timer from "./Timer";

export default function PomodoroPage({ itemData }: { itemData: any }) {
  const windowWidth = useWindowDimensions();

  return (
    <View style={[styles.container, windowWidth]}>
      <Text style={[styles.subtitle]}>{itemData.subtitle}</Text>
      <Text style={[styles.title, { color: itemData.primaryColor }]}>
        {itemData.title}
      </Text>
      <Timer
        timerValue={itemData.timerValue}
        color={itemData.primaryColor}
        name={itemData.name}
      />
    </View>
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
