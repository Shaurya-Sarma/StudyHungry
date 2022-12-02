import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import COLORS from "../../../res/colors/Colors";
import SETTINGS from "../../../res/Settings";
import STRINGS from "../../../res/strings/en-EN";
import Interval, { IntervalType } from "../Interval";

export default function SessionInterval(props: {
  interval: Interval;
  scrollToNextPage: Function;
  itemIndex: number;
}) {
  const windowWidth = useWindowDimensions();

  // declare countdown timer controls and vars
  // ---------------------------------------------------------------------------------------
  const timerControls = useRef<ProgressRef>(null);
  const timerColor =
    IntervalType[props.interval.type] == "Work" ? COLORS.blue : COLORS.green;
  const timerSubtitle =
    IntervalType[props.interval.type] == "Work"
      ? STRINGS.pomodoroTitleFocusSub
      : STRINGS.pomodoroTitleShortBreakSub;
  const timerTitle =
    IntervalType[props.interval.type] == "Work"
      ? STRINGS.pomodoroTitleFocusMain
      : STRINGS.pomodoroTitleShortBreakMain;
  // ---------------------------------------------------------------------------------------
  // on initialization set timer to inactive
  //! need to pause all other timers except current one (use currentPageIndex from routines.context )
  //! only set the current one active
  useEffect(() => {
    setTimeout(function () {
      if (timerControls != null && timerControls.current != null) {
        timerControls.current.pause();
      }
    }, 100);
  }, []);

  function timerCompleted() {
    // show snackbar and paginate to next page
    // props.scrollToNextPage;
    console.log("timer done! ");
  }

  return (
    <>
      <View style={[windowWidth, styles.container]}>
        <Text style={[styles.subtitle]}>{timerSubtitle}</Text>
        <Text
          style={[
            styles.title,
            {
              color: timerColor,
            },
          ]}
        >
          {timerTitle}
        </Text>
        <View style={styles.timer}>
          <CircularProgress
            ref={timerControls}
            value={0}
            radius={150}
            maxValue={props.interval.length}
            initialValue={props.interval.length}
            progressValueColor={timerColor}
            activeStrokeWidth={50}
            inActiveStrokeWidth={50}
            activeStrokeColor={timerColor}
            inActiveStrokeColor={timerColor}
            inActiveStrokeOpacity={0.1}
            strokeLinecap="round"
            progressFormatter={(seconds) => {
              "worklet"; // React Native Reanimated needs function to be defined "worklet"
              // convert time in seconds into formatted time in MM:SS
              return (
                Math.floor(seconds / 60) +
                ":" +
                ("0" + Math.floor(seconds % 60)).slice(-2)
              );
            }}
            duration={props.interval.length * SETTINGS.timerDurationMultiplier}
            progressValueStyle={styles.timerText}
            onAnimationComplete={timerCompleted}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  subtitle: {
    marginTop: 30,
    fontFamily: "Nunito-SemiBold",
    fontSize: 40,
  },
  title: {
    fontFamily: "Nunito-Black",
    fontSize: 60,
    textTransform: "uppercase",
    marginTop: -10,
  },
  timerText: {
    fontFamily: "Nunito-Black",
    fontSize: 64,
  },
  timer: {
    marginTop: 27.5,
  },
});
