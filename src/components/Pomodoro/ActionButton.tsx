import { StyleSheet, TouchableOpacity, View } from "react-native";
import COLORS from "../../res/colors/Colors";
import { PlayIcon, RestartIcon, SettingsIcon } from "./Icons";

// styling constants
const iconSize = 45;
const iconColor = COLORS.pureWhite;
const buttonSize = 75;

export default function ActionButton(props: {
  name: string;
  themeColor: string;
  buttonAction: any;
  itemIndex?: number;
}) {
  // define type of action button based on prop passed
  if (props.name === "settings") {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: props.themeColor }]}
        onPress={props.buttonAction}
      >
        <SettingsIcon size={iconSize} fillColor={iconColor} />
      </TouchableOpacity>
    );
  } else if (props.name === "play") {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: props.themeColor }]}
        onPress={props.buttonAction}
      >
        <PlayIcon
          size={iconSize}
          fillColor={iconColor}
          itemIndex={props.itemIndex}
        />
      </TouchableOpacity>
    );
  } else if (props.name === "restart") {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: props.themeColor }]}
        onPress={props.buttonAction}
      >
        <RestartIcon size={iconSize} fillColor={iconColor} />
      </TouchableOpacity>
    );
  } else {
    return <View />;
  }
}

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
