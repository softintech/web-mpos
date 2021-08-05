import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./PuyMatsUIHelpers";

const PuyMatsUIContext = createContext();

export function usePuyMatsUIContext() {
  return useContext(PuyMatsUIContext);
}

export const PuyMatsUIConsumer = PuyMatsUIContext.Consumer;

export function PuyMatsUIProvider({PuyMatsUIEvents, children}) {
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

  const initPuyMat = {
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
    initPuyMat,
    newShopsPageCreshopButtonClick: PuyMatsUIEvents.newShopsPageCreshopButtonClick,
    newPuyMatButtonClick: PuyMatsUIEvents.newPuyMatButtonClick,
    openEditPuyMatDialog: PuyMatsUIEvents.openEditPuyMatDialog,
    openDeletePuyMatDialog: PuyMatsUIEvents.openDeletePuyMatDialog,
    openDeletePuyMatsDialog: PuyMatsUIEvents.openDeletePuyMatsDialog,
    openFetchPuyMatsDialog: PuyMatsUIEvents.openFetchPuyMatsDialog,
    openUpdatePuyMatsStatusDialog: PuyMatsUIEvents.openUpdatePuyMatsStatusDialog
  };

  return <PuyMatsUIContext.Provider value={value}>{children}</PuyMatsUIContext.Provider>;
}
