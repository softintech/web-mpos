import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ServiceAlsUIHelpers";

const ServiceAlsUIContext = createContext();

export function useServiceAlsUIContext() {
  return useContext(ServiceAlsUIContext);
}

export const ServiceAlsUIConsumer = ServiceAlsUIContext.Consumer;

export function ServiceAlsUIProvider({ServiceAlsUIEvents, children}) {
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

  const initServiceAl = {
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
    initServiceAl,
    newShopsPageCreshopButtonClick: ServiceAlsUIEvents.newShopsPageCreshopButtonClick,
    newServiceAlButtonClick: ServiceAlsUIEvents.newServiceAlButtonClick,
    openEditServiceAlDialog: ServiceAlsUIEvents.openEditServiceAlDialog,
    openDeleteServiceAlDialog: ServiceAlsUIEvents.openDeleteServiceAlDialog,
    openDeleteServiceAlsDialog: ServiceAlsUIEvents.openDeleteServiceAlsDialog,
    openFetchServiceAlsDialog: ServiceAlsUIEvents.openFetchServiceAlsDialog,
    openUpdateServiceAlsStatusDialog: ServiceAlsUIEvents.openUpdateServiceAlsStatusDialog
  };

  return <ServiceAlsUIContext.Provider value={value}>{children}</ServiceAlsUIContext.Provider>;
}
