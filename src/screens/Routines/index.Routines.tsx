import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";

export default function Routines() {
  const { width } = useWindowDimensions();

  return (
    <>
      <FocusedStatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{STRINGS.routinesTitle}</Text>
        <View style={[styles.main, { width: width }]}></View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.orange,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    color: COLORS.white,
    fontFamily: "Nunito-ExtraBold",
    fontSize: 32,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  main: {
    backgroundColor: COLORS.white,
    height: "100%",
    borderTopRightRadius: 40,
  },
  heading: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
});
