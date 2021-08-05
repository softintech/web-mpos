import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./SalePossUIHelpers";

const SalePossUIContext = createContext();

export function useSalePossUIContext() {
  return useContext(SalePossUIContext);
}

export const SalePossUIConsumer = SalePossUIContext.Consumer;

export function SalePossUIProvider({SalePossUIEvents, children}) {
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

  const initSalePos = {
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
    initSalePos,
    newShopsPageCreshopButtonClick: SalePossUIEvents.newShopsPageCreshopButtonClick,
    newSalePosButtonClick: SalePossUIEvents.newSalePosButtonClick,
    openEditSalePosDialog: SalePossUIEvents.openEditSalePosDialog,
    openDeleteSalePosDialog: SalePossUIEvents.openDeleteSalePosDialog,
    openDeleteSalePossDialog: SalePossUIEvents.openDeleteSalePossDialog,
    openFetchSalePossDialog: SalePossUIEvents.openFetchSalePossDialog,
    openUpdateSalePossStatusDialog: SalePossUIEvents.openUpdateSalePossStatusDialog
  };

  return <SalePossUIContext.Provider value={value}>{children}</SalePossUIContext.Provider>;
}
