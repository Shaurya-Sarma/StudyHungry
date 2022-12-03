import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Vibration,
} from "react-native";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import { RoutineContext } from "../../../contexts/RoutineContext";
import COLORS from "../../../res/colors/Colors";
import SETTINGS from "../../../res/Settings";
import STRINGS from "../../../res/strings/en-EN";
import Interval, { IntervalType } from "../Interval";
import { SoundContext } from "../../../contexts/SoundContext";
import AlertModal from "../../AlertModal";

export default function SessionInterval(props: {
  interval: Interval;
  numOfIntervals: number;
  scrollToNextPage: Function;
  itemIndex: number;
  showSnackbar: boolean;
  setShowSnackbar: Function;
}) {
  const windowWidth = useWindowDimensions();

  const { currentPageIndex, setCurrentPageIndex } = useContext(RoutineContext);

  const { playTimerEndSound, playSessionEndSound } = useContext(SoundContext);

  // show alert modal box
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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

  // on initialization set timer to inactive
  useEffect(() => {
    setTimeout(function () {
      if (currentPageIndex !== props.itemIndex) {
        timerControls.current?.pause();
      } else {
        timerControls.current?.play();
      }
    }, 100);
  }, [currentPageIndex]);

  function timerCompleted() {
    Vibration.vibrate();
    // make sure currentPageIndex within bounds
    if (props.itemIndex + 1 >= props.numOfIntervals) {
      // session ended: display alert
      playSessionEndSound();
      setIsAlertModalVisible(true);
      setAlertTitle(STRINGS.sessionEndedAlertTitle);
      setAlertMessage(STRINGS.sessionEndedAlertMessage);
    } else {
      // show snackbar and paginate to next page
      props.setShowSnackbar(true);
      playTimerEndSound();
      setCurrentPageIndex((currentPageIndex: any) => currentPageIndex + 1);
    }
  }
  // ---------------------------------------------------------------------------------------

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
      <AlertModal
        title={alertTitle}
        message={alertMessage}
        isAlertModalVisible={isAlertModalVisible}
        setIsAlertModalVisible={setIsAlertModalVisible}
        goBack={true}
      />
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
