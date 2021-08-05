import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ServiceContractsUIHelpers";

const ServiceContractsUIContext = createContext();

export function useServiceContractsUIContext() {
  return useContext(ServiceContractsUIContext);
}

export const ServiceContractsUIConsumer = ServiceContractsUIContext.Consumer;

export function ServiceContractsUIProvider({ServiceContractsUIEvents, children}) {
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

  const initServiceContract = {
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
    initServiceContract,
    newShopsPageCreshopButtonClick: ServiceContractsUIEvents.newShopsPageCreshopButtonClick,
    newServiceContractButtonClick: ServiceContractsUIEvents.newServiceContractButtonClick,
    openEditServiceContractDialog: ServiceContractsUIEvents.openEditServiceContractDialog,
    openDeleteServiceContractDialog: ServiceContractsUIEvents.openDeleteServiceContractDialog,
    openDeleteServiceContractsDialog: ServiceContractsUIEvents.openDeleteServiceContractsDialog,
    openFetchServiceContractsDialog: ServiceContractsUIEvents.openFetchServiceContractsDialog,
    openUpdateServiceContractsStatusDialog: ServiceContractsUIEvents.openUpdateServiceContractsStatusDialog
  };

  return <ServiceContractsUIContext.Provider value={value}>{children}</ServiceContractsUIContext.Provider>;
}
