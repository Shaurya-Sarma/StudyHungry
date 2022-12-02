import { useContext } from "react";
import { TimerContext } from "../../contexts/TimerContext";
import Paginator from "../Paginator";

const PomodoroPaginator = ({ data }: any) => {
  // import timer variables
  const { currentPageIndex } = useContext(TimerContext);

  return <Paginator data={data} pageIndex={currentPageIndex} />;
};

export default PomodoroPaginator;
