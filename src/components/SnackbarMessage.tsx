import { Snackbar } from "react-native-paper";
import { useContext } from "react";
import { TimerContext } from "../contexts/TimerContext";

export default function SnackbarMessage() {
  // import timer variables
  const { isSnackbarVisible, setIsSnackbarVisible, snackbarWarning } =
    useContext(TimerContext);

  const onDismissSnackBar = () => setIsSnackbarVisible(false);

  return (
    <Snackbar
      wrapperStyle={{ top: 0 }}
      visible={isSnackbarVisible}
      onDismiss={onDismissSnackBar}
      duration={5000}
      action={{
        label: "Hide",
        onPress: () => {
          onDismissSnackBar();
        },
      }}
    >
      {snackbarWarning}
    </Snackbar>
  );
}
