import React, { useCallback } from "react";
import { useRef, useContext } from "react";
import { View } from "react-native";
import { FlatList, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import AccelerometerObserver from "../../components/Pomodoro/AccelerometerObserver";
import LockdownObserver from "../../components/Pomodoro/LockdownObserver";
import pageData from "../../components/Pomodoro/pages";
import Paginator from "../../components/Pomodoro/Paginator";
import PomodoroPage from "../../components/Pomodoro/PomodoroPage";
import { TimerContext } from "../../contexts/TimerContext";
import COLORS from "../../res/colors/Colors";

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
        <Paginator data={pageData} />
        <View style={{ flex: 3 }}>
          <FlatList
            data={pageData}
            renderItem={({ item }) => <PomodoroPage itemData={item} />}
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
        </View>
      </SafeAreaView>
      <AccelerometerObserver />
      <LockdownObserver />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
