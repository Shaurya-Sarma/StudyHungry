import { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View } from "react-native";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import addHapticFeedback from "../../../helpers/HapticFeedback";
import { TimerContext } from "../../contexts/TimerContext";
import SETTINGS from "../../res/Settings";
import ActionButton from "./ActionButton";
import SettingsModal from "./SettingsModal";

export default function Timer(props: {
  timerValue: number;
  color: string;
  name: string;
}) {
  // import timer variables
  const {
    isTimerEnabled,
    setIsTimerEnabled,
    triggerTimerReset,
    focusMode,
    setFocusMode,
  } = useContext(TimerContext);

  // declare countdown timer controls
  const timerControls = useRef<ProgressRef>(null);

  // show settings menu
  const [isSettingsVisible, setSettingsIsVisible] = useState(false);

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

  // display alert message for user when pomodoro finished
  // ---------------------------------------------------------------

  function timerCompleted() {
    if (props.name == "work") {
      alert("Congrats! Nice work! Take a break :D");
    }
    if (props.name == "short_break") {
      alert("Feeling Refreshed? Let's get back to work!");
    }
    if (props.name == "long_break") {
      alert("Let's keep working hard! You've got this!");
    }
    restartTimer();
  }

  // reset timer when flipped focus mode countdown ends or lockdown mode is breached
  // ---------------------------------------------------------------

  useEffect(() => {
    if (triggerTimerReset.current) {
      restartTimer();
      triggerTimerReset.current = false;
      if (focusMode == "Flip") {
        alert(
          "Timer has been reset. Either disable focus mode or start a new focused working session"
        );
      } else if (focusMode == "Lockdown") {
        alert("Timer has been reset. Lockdown mode has been deactivated");
        setFocusMode("Off");
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
  },
});
