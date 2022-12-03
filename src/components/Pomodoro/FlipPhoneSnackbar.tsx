import { useContext, useState, useEffect } from "react";
import { TimerContext } from "../../contexts/TimerContext";
import COLORS from "../../res/colors/Colors";
import { StyleSheet, Vibration } from "react-native";
import SETTINGS from "../../res/Settings";
import { SoundContext } from "../../contexts/SoundContext";
import STRINGS from "../../res/strings/en-EN";
import SnackbarMessage from "../SnackbarMessage";

export default function FlipPhoneSnackbar(props: any) {
  // import timer variables
  // ----------------------------------------------------------------
  const {
    triggerTimerReset,
    isTimerWorkEnabled,
    setIsTimerWorkEnabled,
    isTimerShortBreakEnabled,
    setIsTimerShortBreakEnabled,
    isTimerLongBreakEnabled,
    setIsTimerLongBreakEnabled,
  } = useContext(TimerContext);

  const isTimerEnabled =
    props.itemIndex == 0
      ? isTimerWorkEnabled
      : props.itemIndex == 1
      ? isTimerShortBreakEnabled
      : isTimerLongBreakEnabled;

  const setIsTimerEnabled =
    props.itemIndex == 0
      ? setIsTimerWorkEnabled
      : props.itemIndex == 1
      ? setIsTimerShortBreakEnabled
      : setIsTimerLongBreakEnabled;
  // ----------------------------------------------------------------

  // import sound player
  const { playTimerBuzzSound } = useContext(SoundContext);

  // set up counter for (un)flipped phone countdown
  // countdown of 20 seconds
  const [countdown, setCountdown] = useState(SETTINGS.countdownInterval);
  let intervalID: any;

  // on initialize
  useEffect(() => {
    // vibrate to notify the user
    // 500 ms vibrate, 1000 ms pause, repeat
    Vibration.vibrate([1000], true);

    // every second reduce countdown by 1
    intervalID = setInterval(() => {
      setCountdown((prev) => {
        return prev - 1;
      });
      playTimerBuzzSound();
    }, 1000);

    return () => {
      Vibration.cancel();
      clearInterval(intervalID);
    };
  }, []);

  // check if countdown has reached 0
  useEffect(() => {
    if (countdown == 0) {
      props.setShowFlipPhoneSnackbar(false); // restart timer in via timer.tsx
      triggerTimerReset.current = true;
      // trigger component rerender
      setIsTimerEnabled(!isTimerEnabled);

      clearInterval(intervalID);
    }
  }, [countdown]);

  return (
    <SnackbarMessage
      message={STRINGS.flipPhoneSnackbarMessage}
      isVisible={props.showFlipPhoneSnackbar}
      setIsVisible={props.setShowFlipPhoneSnackbar}
      snackbarStyle={styles.warning}
      haveLabel={false}
    />
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
