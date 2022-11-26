import { createContext, useState } from "react";
import Interval, { IntervalType } from "../components/Routines/Interval";
import Routine from "../components/Routines/Routine";

const RoutineContext = createContext();

const RoutineProvider = ({ children }) => {
  // define default routine as Interval[]
  let intervalList = [];
  // create intervals for default: 25 minute work, 5 minute break (repeat 4 times)
  for (let i = 1; i <= 4; i++) {
    intervalList.push(new Interval(IntervalType.Work, 1500));
    intervalList.push(new Interval(IntervalType.Break, 300));
  }
  // initialize array of Routine[]
  const [routines, setRoutines] = useState([
    new Routine("Default", intervalList),
  ]);

  return (
    <RoutineContext.Provider
      value={{
        routines,
        setRoutines,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export { RoutineContext, RoutineProvider };
