import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import addHapticFeedback from "../../../helpers/HapticFeedback";
import { ActionButton } from "./ActionButton";
import SettingsModal from "./SettingsModal";

export default function Timer(props: {
  timerValue: number;
  color: string;
  name: string;
}) {
  // declare countdown timer controls
  const timerControls = useRef<ProgressRef>(null);

  // tracker for whether timer is active
  const [isEnabled, setIsEnabled] = useState(false);
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
    alert("settings");
  };

  // play & pause btn
  const toggleTimer = () => {
    // toggle play or pause button
    setIsEnabled(!isEnabled);
    addHapticFeedback("light");
    if (timerControls != null && timerControls.current != null) {
      if (isEnabled) {
        timerControls.current.pause();
      } else {
        timerControls.current.play();
      }
    }
  };

  // restart btn
  const restartTimer = () => {
    // deactivate timer
    setIsEnabled(false);
    addHapticFeedback("light");
    if (timerControls != null && timerControls.current != null) {
      timerControls.current.reAnimate();
      timerControls.current.pause();
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
          duration={props.timerValue * 10}
          progressValueStyle={styles.text}
          onAnimationComplete={timerCompleted}
        />
      </View>
      <View style={styles.buttonList}>
        <ActionButton
          name="settings"
          themeColor={props.color}
          buttonAction={openSettings}
          isTimerEnabled={isEnabled}
        />
        <ActionButton
          name="play"
          themeColor={props.color}
          buttonAction={toggleTimer}
          isTimerEnabled={isEnabled}
        />
        <SettingsModal isSettingsVisible={isSettingsVisible} />
        <ActionButton
          name="restart"
          themeColor={props.color}
          buttonAction={restartTimer}
          isTimerEnabled={isEnabled}
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
  },
  timer: {
    marginVertical: 25,
  },
});
