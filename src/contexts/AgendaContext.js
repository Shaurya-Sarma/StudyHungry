import { createContext, useState } from "react";

const AgendaContext = createContext();

const AgendaProvider = ({ children }) => {
  const [taskItems, setTaskItems] = useState([]);

  return (
    <AgendaContext.Provider
      value={{
        taskItems,
        setTaskItems,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
};

export { AgendaContext, AgendaProvider };
