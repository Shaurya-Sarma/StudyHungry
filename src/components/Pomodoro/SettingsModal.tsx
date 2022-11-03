import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import COLORS from "../../res/colors/Colors";
import { RadioButton, Button } from "react-native-paper";
import { useContext } from "react";
import Modal from "react-native-modal";
import { TimerContext } from "../../contexts/TimerContext";

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
          <Text style={styles.title}>Focus Mode</Text>
          <RadioButton.Group
            onValueChange={(focusMode) => setFocusMode(focusMode)}
            value={focusMode}
          >
            <RadioButton.Item
              label="Off"
              value="Off"
              style={focusMode == "Off" ? styles.labelSelected : null}
              color={COLORS.purple}
            />
            <RadioButton.Item
              label="Flip Phone"
              value="Flip"
              style={focusMode == "Flip" ? styles.labelSelected : null}
              color={COLORS.purple}
            />
            <RadioButton.Item
              label="Lockdown"
              value="Lockdown"
              style={focusMode == "Lockdown" ? styles.labelSelected : null}
              color={COLORS.purple}
            />
          </RadioButton.Group>
          <View style={styles.buttonList}>
            <Button
              uppercase
              mode="text"
              textColor={COLORS.blue}
              labelStyle={styles.buttonText}
              onPress={() => props.setSettingsIsVisible(false)}
            >
              Exit
            </Button>
            <Button
              uppercase
              textColor={COLORS.blue}
              labelStyle={styles.buttonText}
              onPress={() => {
                props.setSettingsIsVisible(false);
                // TODO SAVE THE FOCUS MODE SETTINGS
              }}
            >
              Confirm
            </Button>
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
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
  },
  labelSelected: {
    backgroundColor: COLORS.purple10,
  },
});
