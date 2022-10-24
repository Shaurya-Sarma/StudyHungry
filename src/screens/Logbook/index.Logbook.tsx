import { Text, View } from "react-native";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import styles from "./styles.Logbook";

export default function Logbook() {
  return (
    <>
      <FocusedStatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.text}>This is the Logbook page.</Text>
      </View>
    </>
  );
}
