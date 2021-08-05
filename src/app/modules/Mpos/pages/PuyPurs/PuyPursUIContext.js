import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./PuyPursUIHelpers";

const PuyPursUIContext = createContext();

export function usePuyPursUIContext() {
  return useContext(PuyPursUIContext);
}

export const PuyPursUIConsumer = PuyPursUIContext.Consumer;

export function PuyPursUIProvider({PuyPursUIEvents, children}) {
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

  const initPuyPur = {
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
    initPuyPur,
    newShopsPageCreshopButtonClick: PuyPursUIEvents.newShopsPageCreshopButtonClick,
    newPuyPurButtonClick: PuyPursUIEvents.newPuyPurButtonClick,
    openEditPuyPurDialog: PuyPursUIEvents.openEditPuyPurDialog,
    openDeletePuyPurDialog: PuyPursUIEvents.openDeletePuyPurDialog,
    openDeletePuyPursDialog: PuyPursUIEvents.openDeletePuyPursDialog,
    openFetchPuyPursDialog: PuyPursUIEvents.openFetchPuyPursDialog,
    openUpdatePuyPursStatusDialog: PuyPursUIEvents.openUpdatePuyPursStatusDialog
  };

  return <PuyPursUIContext.Provider value={value}>{children}</PuyPursUIContext.Provider>;
}
