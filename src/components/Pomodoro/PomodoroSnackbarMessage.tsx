import { Snackbar } from "react-native-paper";
import { useContext, useState, useEffect } from "react";
import { TimerContext } from "../../contexts/TimerContext";
import COLORS from "../../res/colors/Colors";
import { StyleSheet } from "react-native";

export default function PomodoroSnackbarMessage(props: any) {
  // import timer variables
  const {
    isSnackbarVisible,
    setIsSnackbarVisible,
    snackbarWarning,
    setSnackbarResetTimer,
  } = useContext(TimerContext);

  // set up counter for (un)flipped phone countdown
  // countdown of 20 seconds
  const [countdown, setCountdown] = useState(20);
  let intervalID: any;

  //TODO DOESNT WORK COUNTDOWN DOES NOT TICK DOWN TO 0
  // on initialize
  useEffect(() => {
    // every second reduce countdown by 1
    intervalID = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  // check if countdown has reached 0
  useEffect(() => {
    if (countdown == 0) {
      setSnackbarResetTimer(false);
      // restart timer in via timer.tsx
      clearInterval(intervalID);
    }
  }, []);

  const onDismissSnackBar = () => setIsSnackbarVisible(false);

  return (
    <Snackbar
      wrapperStyle={{ top: 0 }}
      style={styles.warning}
      visible={isSnackbarVisible}
      onDismiss={onDismissSnackBar}
      duration={Infinity}
      action={{
        label: "HIDE",
        labelStyle: { ...styles.labelStyle },
        onPress: () => {
          onDismissSnackBar();
        },
      }}
    >
      {snackbarWarning}
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  warning: {
    backgroundColor: COLORS.red,
  },
  labelStyle: {
    color: COLORS.white,
    fontFamily: "Nunito-ExtraBold",
  },
});
