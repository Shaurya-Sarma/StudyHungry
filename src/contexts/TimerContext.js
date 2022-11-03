import { createContext, useState } from "react";

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
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };
