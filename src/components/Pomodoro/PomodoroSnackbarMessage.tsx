import { Snackbar } from "react-native-paper";
import { useContext, useState, useEffect } from "react";
import { TimerContext } from "../../contexts/TimerContext";
import COLORS from "../../res/colors/Colors";
import { StyleSheet, Vibration } from "react-native";
import SETTINGS from "../../res/Settings";

export default function PomodoroSnackbarMessage(props: any) {
  // import timer variables
  const {
    isSnackbarVisible,
    setIsSnackbarVisible,
    snackbarWarning,
    triggerTimerReset,
  } = useContext(TimerContext);

  // set up counter for (un)flipped phone countdown
  // countdown of 20 seconds
  const [countdown, setCountdown] = useState(SETTINGS.countdownInterval);
  let intervalID: any;

  // on initialize
  useEffect(() => {
    // vibrate to notify the user
    // 500 ms vibrate, 1000 ms pause, repeat
    Vibration.vibrate([500, 1000], true);
    // every second reduce countdown by 1
    intervalID = setInterval(() => {
      setCountdown((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => {
      Vibration.cancel();
      clearInterval(intervalID);
    };
  }, []);

  // check if countdown has reached 0
  useEffect(() => {
    if (countdown == 0) {
      onDismissSnackBar();
      // restart timer in via timer.tsx
      triggerTimerReset.current = true;
      clearInterval(intervalID);
    }
  }, [countdown]);

  const onDismissSnackBar = () => setIsSnackbarVisible(false);

  return (
    <Snackbar
      wrapperStyle={{ top: 0 }}
      style={styles.warning}
      visible={isSnackbarVisible}
      onDismiss={onDismissSnackBar}
      duration={Infinity}
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
