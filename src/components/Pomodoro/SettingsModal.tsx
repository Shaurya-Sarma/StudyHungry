import { Text, View, Button, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import COLORS from "../../res/colors/Colors";
import { RadioButton } from "react-native-paper";
import { useContext } from "react";
import Modal from "react-native-modal";
import { TimerContext } from "../../contexts/TimerContext";
import STRINGS from "../../res/strings/en-EN";

export default function SettingsModal(props: any) {
  // import timer variables
  const { focusMode, setFocusMode } = useContext(TimerContext);

  return (
    <>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => props.setSettingsIsVisible(false)}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        isVisible={props.isSettingsVisible}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{STRINGS.settingsModalTitle}</Text>
          <RadioButton.Group
            onValueChange={(focusMode) => setFocusMode(focusMode)}
            value={focusMode}
          >
            <RadioButton.Item
              label={STRINGS.focusModeOffDescription}
              value="Off"
              style={focusMode == "Off" ? styles.labelSelected : null}
              color={COLORS.purple}
            />
            <RadioButton.Item
              label={STRINGS.focusModeFlipDescription}
              value="Flip"
              style={focusMode == "Flip" ? styles.labelSelected : null}
              color={COLORS.purple}
            />
            <RadioButton.Item
              label={STRINGS.focusModeLockdownDescription}
              value="Lockdown"
              style={focusMode == "Lockdown" ? styles.labelSelected : null}
              color={COLORS.purple}
            />
          </RadioButton.Group>
          <View style={styles.buttonList}>
            <TouchableOpacity onPress={() => props.setSettingsIsVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 240,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 35,
  },
  title: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonList: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 18,
    color: COLORS.blue,
  },
  labelSelected: {
    backgroundColor: COLORS.purple10,
  },
});
