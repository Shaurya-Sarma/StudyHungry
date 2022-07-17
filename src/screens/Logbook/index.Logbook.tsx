import { Text, View } from "react-native";
import styles from "./styles.Logbook";

export default function Logbook() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Logbook page.</Text>
    </View>
  );
}