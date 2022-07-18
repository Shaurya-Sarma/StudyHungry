import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./src/components/Navigation";
import COLORS from "./src/res/colors/Colors";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation></Navigation>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
