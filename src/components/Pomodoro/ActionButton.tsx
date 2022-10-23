import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import addHapticFeedback from "../../../helpers/HapticFeedback";
import COLORS from "../../res/colors/Colors";
import { PlayIcon, RestartIcon, SettingsIcon } from "../Icons";

// styling constants
const iconSize = 45;
const iconColor = COLORS.pureWhite;
const buttonSize = 75;

export const ActionButton = (props: {
  name: string;
  themeColor: string;
  timerReference: any;
}) => {
  // tracker for whether timer is active
  const [isEnabled, setIsEnabled] = useState(false);
  // handle button press for each button
  const openSettings = () => {
    addHapticFeedback("light");
    alert("settings");
  };
  const activateTimer = () => {
    addHapticFeedback("light");
    console.log(isEnabled);
    if (isEnabled) {
      props.timerReference.current.play();
    } else {
      props.timerReference.current.pause();
    }
    // toggle play or pause button
    setIsEnabled((isEnabled) => !isEnabled);
  };
  const restartTimer = () => {
    addHapticFeedback("light");
    props.timerReference.current.reAnimate();
    setIsEnabled((isEnabled) => (isEnabled = false));
    console.log(isEnabled);
    activateTimer();
  };

  // define type of action button based on prop passed
  if (props.name === "settings") {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: props.themeColor }]}
        onPress={() => openSettings()}
      >
        <SettingsIcon size={iconSize} fillColor={iconColor} />
      </TouchableOpacity>
    );
  } else if (props.name === "play") {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: props.themeColor }]}
        onPress={() => activateTimer()}
      >
        <PlayIcon size={iconSize} fillColor={iconColor} isEnabled={isEnabled} />
      </TouchableOpacity>
    );
  } else if (props.name === "restart") {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: props.themeColor }]}
        onPress={() => restartTimer()}
      >
        <RestartIcon size={iconSize} fillColor={iconColor} />
      </TouchableOpacity>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
    marginHorizontal: 15,
    marginTop: 40,
    width: buttonSize,
    height: buttonSize,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
