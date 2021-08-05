import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ShopsCreEmpsUIHelpers";

const ShopsCreEmpsUIContext = createContext();

export function useShopsCreEmpsUIContext() {
  return useContext(ShopsCreEmpsUIContext);
}

export const ShopsCreEmpsUIConsumer = ShopsCreEmpsUIContext.Consumer;

export function ShopsCreEmpsUIProvider({ShopsCreEmpsUIEvents, children}) {
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

  const initShopsCreEmp = {
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
    initShopsCreEmp,
    newShopsPageCreshopButtonClick: ShopsCreEmpsUIEvents.newShopsPageCreshopButtonClick,
    newShopsCreEmpButtonClick: ShopsCreEmpsUIEvents.newShopsCreEmpButtonClick,
    openEditShopsCreEmpDialog: ShopsCreEmpsUIEvents.openEditShopsCreEmpDialog,
    openDeleteShopsCreEmpDialog: ShopsCreEmpsUIEvents.openDeleteShopsCreEmpDialog,
    openDeleteShopsCreEmpsDialog: ShopsCreEmpsUIEvents.openDeleteShopsCreEmpsDialog,
    openFetchShopsCreEmpsDialog: ShopsCreEmpsUIEvents.openFetchShopsCreEmpsDialog,
    openUpdateShopsCreEmpsStatusDialog: ShopsCreEmpsUIEvents.openUpdateShopsCreEmpsStatusDialog
  };

  return <ShopsCreEmpsUIContext.Provider value={value}>{children}</ShopsCreEmpsUIContext.Provider>;
}
