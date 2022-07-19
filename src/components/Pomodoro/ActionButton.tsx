import { StyleSheet, TouchableOpacity } from "react-native";
import addHapticFeedback from "../../../helpers/HapticFeedback";
import COLORS from "../../res/colors/Colors";
import { PlayIcon, RestartIcon, SettingsIcon } from "../Icons";

// handle button press for each button
function actionHandler(actionType: string) {
  addHapticFeedback("medium");
  if (actionType === "settings") {
    //TODO open pop up settings screen with focus mode
  } else if (actionType === "restart") {
    //TODO restart the timer
  } else if (actionType === "play") {
    //TODO play and stop the timer
  }
}
// styling constants
const iconSize = 45;
const iconColor = COLORS.pureWhite;
const buttonSize = 75;

export const ActionButton = (props: { name: string; themeColor: string }) => {
  let iconTag;
  // define type of action button based on prop passed
  if (props.name === "settings") {
    iconTag = <SettingsIcon size={iconSize} fillColor={iconColor} />;
  } else if (props.name === "play") {
    iconTag = (
      <PlayIcon size={iconSize} fillColor={iconColor} isPaused={false} />
    );
  } else if (props.name === "restart") {
    iconTag = <RestartIcon size={iconSize} fillColor={iconColor} />;
  }
  // return the icon button
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.themeColor }]}
      onPress={() => actionHandler(props.name)}
    >
      {iconTag}
    </TouchableOpacity>
  );
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
