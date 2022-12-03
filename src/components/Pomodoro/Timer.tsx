import { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View } from "react-native";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import addHapticFeedback from "../../../helpers/HapticFeedback";
import { SoundContext } from "../../contexts/SoundContext";
import { TimerContext } from "../../contexts/TimerContext";
import SETTINGS from "../../res/Settings";
import ActionButton from "./ActionButton";
import AlertModal from "../AlertModal";
import SettingsModal from "./SettingsModal";

export default function Timer(props: {
  timerValue: number;
  color: string;
  name: string;
  itemIndex: number;
}) {
  // import timer variables
  const {
    isTimerWorkEnabled,
    setIsTimerWorkEnabled,
    isTimerShortBreakEnabled,
    setIsTimerShortBreakEnabled,
    isTimerLongBreakEnabled,
    setIsTimerLongBreakEnabled,
    triggerTimerReset,
    focusMode,
  } = useContext(TimerContext);

  // import sound player
  const { playTimerEndSound, playErrorSound } = useContext(SoundContext);

  // declare countdown timer controls
  // 0 --> work
  // 1 --> short break
  // 2 --> long break
  // ----------------------------------------------------------------
  const timerControlsWork = useRef<ProgressRef>(null);
  const timerControlsShortBreak = useRef<ProgressRef>(null);
  const timerControlsLongBreak = useRef<ProgressRef>(null);

  const timerControls =
    props.itemIndex == 0
      ? timerControlsWork
      : props.itemIndex == 1
      ? timerControlsShortBreak
      : timerControlsLongBreak;

  const isTimerEnabled =
    props.itemIndex == 0
      ? isTimerWorkEnabled
      : props.itemIndex == 1
      ? isTimerShortBreakEnabled
      : isTimerLongBreakEnabled;

  const setIsTimerEnabled =
    props.itemIndex == 0
      ? setIsTimerWorkEnabled
      : props.itemIndex == 1
      ? setIsTimerShortBreakEnabled
      : setIsTimerLongBreakEnabled;

  // ----------------------------------------------------------------

  // show settings menu
  const [isSettingsVisible, setSettingsIsVisible] = useState(false);

  // show alert modal box
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // on initialization set timer to inactive
  useEffect(() => {
    setTimeout(function () {
      timerControls.current?.pause();
    }, 100);
  }, []);

  // handle button press for each button
  // ---------------------------------------------------------------
  // settings btn
  const openSettings = () => {
    addHapticFeedback("light");
    setSettingsIsVisible(true);
  };

  // play & pause btn
  const toggleTimer = () => {
    // toggle play or pause button
    setIsTimerEnabled(!isTimerEnabled);
    addHapticFeedback("light");
    if (isTimerEnabled) {
      timerControls.current?.pause();
    } else {
      timerControls.current?.play();
    }
  };

  // restart btn
  const restartTimer = () => {
    // deactivate timer
    setIsTimerEnabled(false);
    addHapticFeedback("light");
    timerControls.current?.reAnimate();
    setTimeout(function () {
      timerControls.current?.pause();
    }, 100);
  };

  // set alert message for user when pomodoro finished and toggle alert modal
  // ---------------------------------------------------------------

  function timerCompleted() {
    setIsAlertModalVisible(true);
    if (props.name == "work") {
      setAlertTitle("Focused Session Completed 👏");
      setAlertMessage("Congrats and nice work! Take a break :D");
    }
    if (props.name == "short_break") {
      setAlertTitle("The Break Has Ended ✏️");
      setAlertMessage("Feeling Refreshed? Let's get back to work!");
    }
    if (props.name == "long_break") {
      setAlertTitle("The Break Has Ended 📖");
      setAlertMessage("Let's keep working hard! You've got this!");
    }
    restartTimer();
    // play success sound
    playTimerEndSound();
  }

  // reset timer when flipped focus mode countdown ends or lockdown mode is breached
  // ---------------------------------------------------------------

  useEffect(() => {
    if (triggerTimerReset.current) {
      restartTimer();
      triggerTimerReset.current = false;
      setIsAlertModalVisible(true);
      playErrorSound();
      if (focusMode == "Flip") {
        setAlertTitle("Timer Reset ❌");
        setAlertMessage(
          "Phone was not flipped in time. Please start a new focused working session."
        );
      } else if (focusMode == "Lockdown") {
        setAlertTitle("Timer Reset ❌");
        setAlertMessage("App was exited. Stay in the app for lockdown mode.");
      }
    }
  }, [triggerTimerReset.current]);

  return (
    <View>
      <View style={styles.timer}>
        <CircularProgress
          ref={
            props.itemIndex == 0
              ? timerControlsWork
              : props.itemIndex == 1
              ? timerControlsShortBreak
              : timerControlsLongBreak
          }
          value={0}
          radius={150}
          maxValue={props.timerValue}
          initialValue={props.timerValue}
          progressValueColor={props.color}
          activeStrokeWidth={50}
          inActiveStrokeWidth={50}
          activeStrokeColor={props.color}
          inActiveStrokeColor={props.color}
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
          duration={props.timerValue * SETTINGS.timerDurationMultiplier}
          progressValueStyle={styles.text}
          onAnimationComplete={timerCompleted}
        />
      </View>
      <View style={styles.buttonList}>
        {props.name == "work" ? (
          <>
            <ActionButton
              name="settings"
              themeColor={props.color}
              buttonAction={openSettings}
            />
            <SettingsModal
              isSettingsVisible={isSettingsVisible}
              setSettingsIsVisible={setSettingsIsVisible}
            />
          </>
        ) : (
          <></>
        )}

        <ActionButton
          name="play"
          themeColor={props.color}
          buttonAction={toggleTimer}
          itemIndex={props.itemIndex}
        />

        <ActionButton
          name="restart"
          themeColor={props.color}
          buttonAction={restartTimer}
        />
      </View>
      <AlertModal
        title={alertTitle}
        message={alertMessage}
        isAlertModalVisible={isAlertModalVisible}
        setIsAlertModalVisible={setIsAlertModalVisible}
      ></AlertModal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Nunito-Black",
    fontSize: 64,
  },
  buttonList: {
    flexDirection: "row",
    marginBottom: 125,
    justifyContent: "center",
  },
  timer: {
    marginTop: 25,
    marginLeft: 7.5,
  },
});
