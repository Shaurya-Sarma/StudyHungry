import { Text, View } from "react-native";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import styles from "./styles.Tutorials";

export default function Tutorials() {
  return (
    <>
      <FocusedStatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.text}>This is the Tutorials page.</Text>
      </View>
    </>
  );
}
