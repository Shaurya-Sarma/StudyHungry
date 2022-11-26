import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RoutineCard from "../../components/Routines/RoutineCard";
import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";
import { AntDesign } from "@expo/vector-icons";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { RoutineContext } from "../../contexts/RoutineContext";

export default function Routines({ navigation }: any) {
  const { width } = useWindowDimensions();
  const { routines } = useContext(RoutineContext);

  return (
    <>
      <FocusedStatusBar barStyle="light-content" />
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0, backgroundColor: COLORS.orange }}
      />
      <SafeAreaView
        edges={["left", "right", "bottom"]}
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          position: "relative",
        }}
      >
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>{STRINGS.routinesTitle}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.push("CreateRoutine");
              }}
            >
              <AntDesign name="pluscircle" size={44} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={[styles.main, { width: width }]}>
            <View style={{ height: "72%" }}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="always"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                {routines?.map((r: any, index: any) => {
                  return (
                    <RoutineCard
                      key={index}
                      name={r.name}
                      isEnabled={r.isEnabled}
                      intervals={r.intervals}
                    />
                  );
                })}
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Start Session</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: COLORS.orange,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 18,
    color: COLORS.white,
    textTransform: "uppercase",
    marginVertical: 5,
  },
});
