import { createContext, useState, useRef } from "react";

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  // tracker for whether timer is active
  const [isTimerEnabled, setIsTimerEnabled] = useState(false);

  // determine state of pomodoro focus mode
  const [focusMode, setFocusMode] = useState("Off");

  // toggle the snackbar warning for timer
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  // define snackbar warning for timer warning
  const [snackbarWarning, setSnackbarWarning] = useState(
    "Error, timer will restart"
  );

  const snackbarTriggerTimerReset = useRef(false);

  // define current page of pomodoro
  // 0 --> work
  // 1 --> short break
  // 2 --> long break
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  return (
    <TimerContext.Provider
      value={{
        isTimerEnabled,
        setIsTimerEnabled,
        focusMode,
        setFocusMode,
        isSnackbarVisible,
        setIsSnackbarVisible,
        snackbarWarning,
        setSnackbarWarning,
        currentPageIndex,
        setCurrentPageIndex,
        snackbarTriggerTimerReset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };
