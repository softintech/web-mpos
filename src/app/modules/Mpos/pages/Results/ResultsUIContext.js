import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ResultsUIHelpers";

const ResultsUIContext = createContext();

export function useResultsUIContext() {
  return useContext(ResultsUIContext);
}

export const ResultsUIConsumer = ResultsUIContext.Consumer;

export function ResultsUIProvider({ResultsUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initResult = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    gender: "Female",
    status: 0,
    dateOfBbirth: "",
    ipAddress: "",
    type: 1
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initResult,
    newShopsPageCreshopButtonClick: ResultsUIEvents.newShopsPageCreshopButtonClick,
    newResultButtonClick: ResultsUIEvents.newResultButtonClick,
    openEditResultDialog: ResultsUIEvents.openEditResultDialog,
    openDeleteResultDialog: ResultsUIEvents.openDeleteResultDialog,
    openDeleteResultsDialog: ResultsUIEvents.openDeleteResultsDialog,
    openFetchResultsDialog: ResultsUIEvents.openFetchResultsDialog,
    openUpdateResultsStatusDialog: ResultsUIEvents.openUpdateResultsStatusDialog
  };

  return <ResultsUIContext.Provider value={value}>{children}</ResultsUIContext.Provider>;
}
