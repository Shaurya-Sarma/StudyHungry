import { useContext } from "react";
import { RoutineContext } from "../../../contexts/RoutineContext";
import Paginator from "../../Paginator";

const SessionPaginator = ({ data }: any) => {
  // import routine variables
  const { currentPageIndex } = useContext(RoutineContext);

  return <Paginator data={data} pageIndex={currentPageIndex} />;
};

export default SessionPaginator;
