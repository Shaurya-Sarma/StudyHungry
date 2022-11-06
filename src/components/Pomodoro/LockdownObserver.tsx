import { useContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { TimerContext } from "../../contexts/TimerContext";

export default function LockdownObserver(props: any) {
  // import timer variables
  const { focusMode } = useContext(TimerContext);

  const appState = useRef(AppState.currentState);
  const [currentAppState, setCurrentAppState] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      setCurrentAppState(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (currentAppState == "background" && focusMode == "Lockdown") {
      console.log("SEND PUSH NOTIF ALERT ALERT");
    }
  }, [currentAppState]);

  return <></>;
}
