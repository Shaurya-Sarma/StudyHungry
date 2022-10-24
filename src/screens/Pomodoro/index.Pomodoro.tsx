import { useCallback } from "react";
import { useRef, useState } from "react";
import { View } from "react-native";
import { FlatList, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import pageData from "../../components/Pomodoro/pages";
import Paginator from "../../components/Pomodoro/Paginator";
import PomodoroPage from "../../components/Pomodoro/PomodoroPage";
import COLORS from "../../res/colors/Colors";

export default function Pomodoro() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // current index is set to the index of the page on screen
  const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    // console.log("Before setState index: " + viewableItems[0].index);
    setCurrentIndex(viewableItems[0].index);
    // console.log("After setState index: " + currentIndex);
    // console.log(
    //   "---------------------------------------------------------------"
    // );
  }, []);

  // next screen needs to be at least 50% visible before changing
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slidesRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Paginator data={pageData} dotIndex={currentIndex} />
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
