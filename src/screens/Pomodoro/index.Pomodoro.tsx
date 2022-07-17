import { Text, View } from "react-native";
import styles from "./styles.Pomodoro";

export default function Pomodoro() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Pomodoro page.</Text>
    </View>
  );
}