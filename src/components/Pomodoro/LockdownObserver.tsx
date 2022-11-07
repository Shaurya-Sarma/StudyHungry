import { useContext, useEffect, useRef, useState } from "react";
import { AppState, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

import { TimerContext } from "../../contexts/TimerContext";

export default function LockdownObserver(props: any) {
  // import timer variables
  const { focusMode, triggerTimerReset, setIsTimerEnabled } =
    useContext(TimerContext);

  // handle changes to app state or activity
  const appState = useRef(AppState.currentState);
  const [currentAppState, setCurrentAppState] = useState(appState.current);

  // display lockdown mode enabled snackbar
  const [showLockdownSnackbar, setShowLockdownSnackbar] = useState(false);

  // retrieve app state
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      setCurrentAppState(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // handle Lockdown mode action
  useEffect(() => {
    if (focusMode == "Lockdown") {
      setShowLockdownSnackbar(true);
      // when user exits the app restart the timer
      if (currentAppState == "background") {
        // restart timer in via timer.tsx and disable lockdown mode
        triggerTimerReset.current = true;
        setIsTimerEnabled(false);
        //TODO WHEN TIMER IS PAUSED AND USER EXITS APP THE TIMER RESET DOESNT TRIGGER UNTIL NEW ACTION
      }
    } else {
      setShowLockdownSnackbar(false);
    }
  }, [currentAppState, focusMode]);

  const onDismissSnackBar = () => setShowLockdownSnackbar(false);

  return showLockdownSnackbar ? (
    <Snackbar
      wrapperStyle={{ top: 0 }}
      visible={showLockdownSnackbar}
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
      Lockdown Mode is currently active. Leaving the app will restart the timer!
    </Snackbar>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: "Nunito-ExtraBold",
  },
});
