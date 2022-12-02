import React, { useCallback } from "react";
import { useRef, useContext } from "react";
import { View } from "react-native";
import { FlatList, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import AccelerometerObserver from "../../components/Pomodoro/AccelerometerObserver";
import LockdownObserver from "../../components/Pomodoro/LockdownObserver";
import pageData from "../../components/Pomodoro/pages";
import PomodoroPage from "../../components/Pomodoro/PomodoroPage";
import { TimerContext } from "../../contexts/TimerContext";
import COLORS from "../../res/colors/Colors";
import PomodoroPaginator from "../../components/Pomodoro/PomodoroPaginator";

export default function Pomodoro() {
  // import timer variables
  const { setCurrentPageIndex } = useContext(TimerContext);

  const scrollX = useRef(new Animated.Value(0)).current;

  // current index is set to the index of the page on screen
  const _onViewableItemsChanged = useCallback(
    ({ viewableItems, changed }: any) => {
      setCurrentPageIndex(viewableItems[0].index);
    },
    []
  );

  // next screen needs to be at least 50% visible before changing
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slidesRef = useRef(null);

  return (
    <>
      <FocusedStatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <PomodoroPaginator data={pageData} />
        <FlatList
          data={pageData}
          renderItem={({ item, index }) => (
            <PomodoroPage itemData={item} itemIndex={index} />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </SafeAreaView>
      <AccelerometerObserver />
      <LockdownObserver />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
});
