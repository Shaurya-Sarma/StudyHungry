import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import RoutineCard from "../../components/Routines/RoutineCard";
import COLORS from "../../res/colors/Colors";
import STRINGS from "../../res/strings/en-EN";
import { AntDesign } from "@expo/vector-icons";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { RoutineContext } from "../../contexts/RoutineContext";
import { Feather } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import {
  getRoutines,
  removeRoutine,
  storeRoutineItem,
} from "../../api/AsyncStorage";
import Routine from "../../components/Routines/Routine";
import SnackbarMessage from "../../components/SnackbarMessage";

export default function Routines({ navigation }: any) {
  const { width } = useWindowDimensions();
  const { routines, setRoutines, defaultIntervalList } =
    useContext(RoutineContext);

  // delete a routine
  function deleteRoutine(index: number) {
    let routinesCopy = [...routines];
    routinesCopy.splice(index, 1);
    removeRoutine(routines[index].uuid);
    setRoutines(routinesCopy);
  }

  const [showSnackbar, setShowSnackbar] = useState(false);

  // start a study session
  function startSession() {
    // find which routine is enabled
    let canStartSession = false;
    let selectedRoutine: Routine | null = null;
    routines.forEach((r: Routine) => {
      if (r.isEnabled) {
        canStartSession = true;
        selectedRoutine = r;
      }
    });

    if (canStartSession) {
      // navigate to session page
      navigation.navigate({
        name: "SessionScreen",
        params: { routine: selectedRoutine }, // pass routine object
      });
    } else {
      setShowSnackbar(true);
    }
  }

  // set up swipeable and delete icon
  //-------------------------------------------------------
  const RightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <Animated.View style={styles.deleteContainer}>
        <Feather
          style={styles.deleteIcon}
          name="trash"
          size={32}
          color={COLORS.white}
        />
      </Animated.View>
    );
  };
  //-------------------------------------------------------

  // on initialize retrieve the data
  useEffect(() => {
    // use to clear async storage: DEV
    // AsyncStorage.clear();
    const retrieveData = async () => {
      const dataKeyValue = await getRoutines();
      const data = dataKeyValue?.map((pair) => {
        if (pair[1] !== null) {
          return JSON.parse(pair[1]);
        }
      });
      // default routine is not saved to storage
      // manually add the default routine if there are no other routines
      if (data?.length == 0)
        data?.unshift(new Routine("Default", defaultIntervalList, true));
      setRoutines(data);
    };

    retrieveData();
  }, []);

  // on page destruct save the data in current state
  useEffect(() => {
    return () => {
      for (let i = 0; i > routines.length; i++) {
        storeRoutineItem(routines[i]);
      }
    };
  });

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
                navigation.navigate({
                  name: "RoutineForm",
                  params: { createNewRoutine: true },
                });
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
                {routines.map((r: Routine, index: any) => {
                  storeRoutineItem(r); // store data to local storage

                  return (
                    <Swipeable
                      key={r.uuid}
                      overshootRight={true}
                      onSwipeableOpen={(direction: "left" | "right") => {
                        deleteRoutine(index);
                      }}
                      renderRightActions={RightActions}
                      containerStyle={{ paddingVertical: 10 }}
                    >
                      <RoutineCard
                        key={r.uuid}
                        navigation={navigation}
                        name={r.name}
                        isEnabled={r.isEnabled}
                        intervals={r.intervals}
                        index={index}
                      />
                    </Swipeable>
                  );
                })}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => startSession()}
            >
              <Text style={styles.buttonText}>
                {STRINGS.startSessionButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <SnackbarMessage
        message={STRINGS.startSessionSnackbarMessage}
        isVisible={showSnackbar}
        durationSeconds={5000}
        setIsVisible={setShowSnackbar}
        haveLabel={true}
        labelStyle={{ fontFamily: "Nunito-ExtraBold" }}
      />
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
  deleteContainer: {
    width: "90%",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: COLORS.red,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
  },
  deleteIcon: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
});
