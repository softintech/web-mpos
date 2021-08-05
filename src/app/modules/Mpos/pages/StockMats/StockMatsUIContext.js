import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./StockMatsUIHelpers";

const StockMatsUIContext = createContext();

export function useStockMatsUIContext() {
  return useContext(StockMatsUIContext);
}

export const StockMatsUIConsumer = StockMatsUIContext.Consumer;

export function StockMatsUIProvider({StockMatsUIEvents, children}) {
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

  const initStockMat = {
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
    initStockMat,
    newShopsPageCreshopButtonClick: StockMatsUIEvents.newShopsPageCreshopButtonClick,
    newStockMatButtonClick: StockMatsUIEvents.newStockMatButtonClick,
    openEditStockMatDialog: StockMatsUIEvents.openEditStockMatDialog,
    openDeleteStockMatDialog: StockMatsUIEvents.openDeleteStockMatDialog,
    openDeleteStockMatsDialog: StockMatsUIEvents.openDeleteStockMatsDialog,
    openFetchStockMatsDialog: StockMatsUIEvents.openFetchStockMatsDialog,
    openUpdateStockMatsStatusDialog: StockMatsUIEvents.openUpdateStockMatsStatusDialog
  };

  return <StockMatsUIContext.Provider value={value}>{children}</StockMatsUIContext.Provider>;
}
