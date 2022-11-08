import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import VideoCard from "../../components/Tutorials/VideoCard";
import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";

export default function Tutorials() {
  const { width } = useWindowDimensions();

  return (
    <>
      <FocusedStatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{STRINGS.tutorialsTitle}</Text>
        <View style={[styles.main, { width: width }]}>
          <View style={{ height: "80%" }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <VideoCard
                link={"https://reactnative.dev/docs/linking"}
                image={"https://reactnative.dev/img/tiny_logo.sdfasdpng"}
              />
              <VideoCard
                link={"https://reactnative.dev/docs/linking"}
                image={"https://reactnative.dev/img/tiny_logo.sdfasdpng"}
              />
              <VideoCard
                link={"https://reactnative.dev/docs/linking"}
                image={"https://reactnative.dev/img/tiny_logo.sdfasdpng"}
              />
              <VideoCard
                link={"https://reactnative.dev/docs/linking"}
                image={"https://reactnative.dev/img/tiny_logo.sdfasdpng"}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
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
    paddingTop: 10,
  },
});
