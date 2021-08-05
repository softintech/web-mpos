import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./PuySupsUIHelpers";

const PuySupsUIContext = createContext();

export function usePuySupsUIContext() {
  return useContext(PuySupsUIContext);
}

export const PuySupsUIConsumer = PuySupsUIContext.Consumer;

export function PuySupsUIProvider({PuySupsUIEvents, children}) {
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

  const initPuySup = {
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
    initPuySup,
    newShopsPageCreshopButtonClick: PuySupsUIEvents.newShopsPageCreshopButtonClick,
    newPuySupButtonClick: PuySupsUIEvents.newPuySupButtonClick,
    openEditPuySupDialog: PuySupsUIEvents.openEditPuySupDialog,
    openDeletePuySupDialog: PuySupsUIEvents.openDeletePuySupDialog,
    openDeletePuySupsDialog: PuySupsUIEvents.openDeletePuySupsDialog,
    openFetchPuySupsDialog: PuySupsUIEvents.openFetchPuySupsDialog,
    openUpdatePuySupsStatusDialog: PuySupsUIEvents.openUpdatePuySupsStatusDialog
  };

  return <PuySupsUIContext.Provider value={value}>{children}</PuySupsUIContext.Provider>;
}
