import { useContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { TimerContext } from "../../contexts/TimerContext";
import STRINGS from "../../res/strings/en-EN";
import SnackbarMessage from "../SnackbarMessage";

export default function LockdownObserver(props: any) {
  // import timer variables
  // ----------------------------------------------------------------
  const {
    focusMode,
    triggerTimerReset,
    isTimerWorkEnabled,
    setIsTimerWorkEnabled,
  } = useContext(TimerContext);
  // ----------------------------------------------------------------

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
        // trigger component rerender
        setIsTimerWorkEnabled(!isTimerWorkEnabled);
      }
    } else {
      setShowLockdownSnackbar(false);
    }
  }, [currentAppState, focusMode]);

  return showLockdownSnackbar ? (
    <SnackbarMessage
      message={STRINGS.lockdownSnackbarMessage}
      isVisible={showLockdownSnackbar}
      setIsVisible={setShowLockdownSnackbar}
      haveLabel={true}
      labelStyle={{ fontFamily: "Nunito-ExtraBold" }}
    />
  ) : (
    <></>
  );
}
