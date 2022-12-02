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
  const { isTimerEnabled, setIsTimerEnabled, triggerTimerReset, focusMode } =
    useContext(TimerContext);

  // import sound player
  const { playTimerEndSound, playErrorSound } = useContext(SoundContext);

  // declare countdown timer controls
  const timerControls = useRef<ProgressRef>(null);

  // show settings menu
  const [isSettingsVisible, setSettingsIsVisible] = useState(false);

  // show alert modal box
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // on initialization set timer to inactive
  useEffect(() => {
    setTimeout(function () {
      if (timerControls != null && timerControls.current != null) {
        timerControls.current.pause();
      }
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
    if (timerControls != null && timerControls.current != null) {
      if (isTimerEnabled) {
        timerControls.current.pause();
      } else {
        timerControls.current.play();
      }
    }
  };

  // restart btn
  const restartTimer = () => {
    // deactivate timer
    setIsTimerEnabled(false);
    addHapticFeedback("light");
    if (timerControls != null && timerControls.current != null) {
      timerControls.current.reAnimate();
      setTimeout(function () {
        if (timerControls != null && timerControls.current != null) {
          timerControls.current.pause();
        }
      }, 100);
    }
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
          ref={timerControls}
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
