import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import COLORS from "../../res/colors/Colors";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AlertModal(props: {
  title: string;
  message: string;
  isAlertModalVisible: boolean;
  setIsAlertModalVisible: Function;
}) {
  return (
    <>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => props.setIsAlertModalVisible(false)}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        isVisible={props.isAlertModalVisible}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.message}>{props.message}</Text>
          <View style={styles.buttonList}>
            <TouchableOpacity
              onPress={() => props.setIsAlertModalVisible(false)}
            >
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
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 25,
  },
  title: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    fontFamily: "Nunito-Medium",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonList: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 18,
    color: COLORS.blue,
  },
});
