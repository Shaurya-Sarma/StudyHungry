import { useCallback, useContext, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { RoutineContext } from "../../../contexts/RoutineContext";
import COLORS from "../../../res/colors/Colors";
import STRINGS from "../../../res/strings/en-EN";
import FocusedStatusBar from "../../FocusedStatusBar";
import Interval from "../Interval";
import SessionInterval from "./SessionInterval";
import SessionPaginator from "./SessionPaginator";

export default function SessionScreen({ navigation, route }: any, props: any) {
  // ---------------------------------------------------------------------------------------
  // {route} has three vars
  // routine: Routine => holds the selected Routine
  // ---------------------------------------------------------------------------------------

  // import routine variables
  const { setCurrentPageIndex } = useContext(RoutineContext);

  const data: Interval[] = route.params?.routine.intervals;

  // flat list vars
  // ---------------------------------------------------------------------------------------
  const _onViewableItemsChanged = useCallback(
    ({ viewableItems, changed }: any) => {
      setCurrentPageIndex(viewableItems[0].index);
    },
    []
  );
  const flatListRef = useRef<any>(null);

  const scrollToNextPage = () => {
    console.log("scroll to index called !");
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: setCurrentPageIndex((current: number) => current++),
    });
  };
  // ---------------------------------------------------------------------------------------

  function exitSession() {
    //! display alert to confirm user exit
    navigation.pop();
  }

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
                scrollToNextPage={scrollToNextPage}
                itemIndex={index}
              />
            )}
            // scrollEnabled={false}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            scrollEventThrottle={32}
            onViewableItemsChanged={_onViewableItemsChanged}
            ref={flatListRef}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => exitSession()}>
          <Text style={styles.buttonText}>{STRINGS.exitSessionButton}</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
});
