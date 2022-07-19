import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import { ActionButton } from "./ActionButton";

export default function Timer(props: {
  timerValue: number;
  color: string;
  accentColor: string;
}) {
  // declare countdown timer controls
  const timerControls = useRef<ProgressRef>(null);
  timerControls.current?.pause();

  return (
    <View>
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
        activeStrokeSecondaryColor={props.accentColor}
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
        duration={props.timerValue * 1000}
        progressValueStyle={styles.text}
      />
      <View style={styles.buttonList}>
        <ActionButton
          name="settings"
          themeColor={props.color}
          timerReference={timerControls}
        />
        <ActionButton
          name="play"
          themeColor={props.color}
          timerReference={timerControls}
        />
        <ActionButton
          name="restart"
          themeColor={props.color}
          timerReference={timerControls}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 64,
  },
  buttonList: {
    flexDirection: "row",
  },
});
