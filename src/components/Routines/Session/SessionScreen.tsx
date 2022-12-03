import { useContext, useRef, useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { RoutineContext } from "../../../contexts/RoutineContext";
import COLORS from "../../../res/colors/Colors";
import STRINGS from "../../../res/strings/en-EN";
import FocusedStatusBar from "../../FocusedStatusBar";
import SnackbarMessage from "../../SnackbarMessage";
import Interval from "../Interval";
import SessionInterval from "./SessionInterval";
import SessionPaginator from "./SessionPaginator";

export default function SessionScreen({ navigation, route }: any, props: any) {
  // ---------------------------------------------------------------------------------------
  // {route} has three vars
  // routine: Routine => holds the selected Routine
  const data: Interval[] = route.params?.routine.intervals;
  // ---------------------------------------------------------------------------------------

  // import routine variables
  const { currentPageIndex, setCurrentPageIndex } = useContext(RoutineContext);
  const [inProgress, setInProgress] = useState(true);

  // snackbar settings
  const [showSnackbar, setShowSnackbar] = useState(false);

  // flat list vars
  // ---------------------------------------------------------------------------------------
  const flatListRef = useRef<any>(null);

  const scrollToNextPage = () => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: currentPageIndex,
    });
  };
  // ---------------------------------------------------------------------------------------

  // trigger auto pagination
  useEffect(() => {
    if (currentPageIndex != 0) {
      scrollToNextPage();
    }
  }, [currentPageIndex]);

  //! confirmation if user tries to exit screen: WIP

  // useEffect(() => {
  //   navigation.addListener("beforeRemove", (e: any) => {
  //     // Prevent default behavior of leaving the screen
  //     e.preventDefault();

  //     // Prompt the user before leaving the screen
  //     Alert.alert(
  //       "Warning! Exiting Session",
  //       "Progress will be reset. Do you want to continue?",
  //       [
  //         { text: "Cancel", style: "cancel", onPress: () => {} },
  //         {
  //           text: "OK",
  //           style: "destructive",
  //           // If the user confirmed, then we dispatch the action we blocked earlier
  //           // This will continue the action that had triggered the removal of the screen
  //           onPress: () => navigation.dispatch(e.data.action),
  //         },
  //       ]
  //     );
  //   });
  // }, [navigation]);
  // ---------------------------------------------------------------------------------------

  return (
    <>
      <FocusedStatusBar barStyle="dark-content" />
      <SafeAreaView style={{ backgroundColor: COLORS.white }}>
        <View style={styles.container}>
          <SessionPaginator data={data} />
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <SessionInterval
                interval={item}
                numOfIntervals={data.length}
                scrollToNextPage={scrollToNextPage}
                itemIndex={index}
                showSnackbar={showSnackbar}
                setShowSnackbar={setShowSnackbar}
              />
            )}
            onScrollToIndexFailed={() => {
              setCurrentPageIndex(0);
            }}
            scrollEnabled={false}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            scrollEventThrottle={32}
            ref={flatListRef}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.pop()}
        >
          <Text style={styles.buttonText}>{STRINGS.exitSessionButton}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SnackbarMessage
        message={STRINGS.intervalCompletedSnackbarMessage}
        isVisible={showSnackbar}
        durationSeconds={5000}
        setIsVisible={setShowSnackbar}
        haveLabel={true}
        snackbarStyle={styles.snackbar}
        labelStyle={{ fontFamily: "Nunito-ExtraBold", color: COLORS.white }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "87.5%",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.purple,
    borderRadius: 5,
    padding: 10,
    width: "90%",
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Nunito-ExtraBold",
    textAlign: "center",
    fontSize: 18,
    color: COLORS.white,
    textTransform: "uppercase",
    marginVertical: 5,
  },
  snackbar: {
    color: COLORS.white,
    backgroundColor: COLORS.purple,
  },
});
