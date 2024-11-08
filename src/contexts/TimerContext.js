import { createContext, useState, useRef } from "react";

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  // tracker for whether timer is active
  const [isTimerWorkEnabled, setIsTimerWorkEnabled] = useState(false);
  const [isTimerShortBreakEnabled, setIsTimerShortBreakEnabled] =
    useState(false);
  const [isTimerLongBreakEnabled, setIsTimerLongBreakEnabled] = useState(false);
  // determine state of pomodoro focus mode
  const [focusMode, setFocusMode] = useState("Off");

  const triggerTimerReset = useRef(false);

  // define current page of pomodoro
  // 0 --> work
  // 1 --> short break
  // 2 --> long break
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  return (
    <TimerContext.Provider
      value={{
        isTimerWorkEnabled,
        setIsTimerWorkEnabled,
        isTimerShortBreakEnabled,
        setIsTimerShortBreakEnabled,
        isTimerLongBreakEnabled,
        setIsTimerLongBreakEnabled,
        focusMode,
        setFocusMode,
        currentPageIndex,
        setCurrentPageIndex,
        triggerTimerReset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };
