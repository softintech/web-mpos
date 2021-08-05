import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./StockCountsUIHelpers";

const StockCountsUIContext = createContext();

export function useStockCountsUIContext() {
  return useContext(StockCountsUIContext);
}

export const StockCountsUIConsumer = StockCountsUIContext.Consumer;

export function StockCountsUIProvider({StockCountsUIEvents, children}) {
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

  const initStockCount = {
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
    initStockCount,
    newShopsPageCreshopButtonClick: StockCountsUIEvents.newShopsPageCreshopButtonClick,
    newStockCountButtonClick: StockCountsUIEvents.newStockCountButtonClick,
    openEditStockCountDialog: StockCountsUIEvents.openEditStockCountDialog,
    openDeleteStockCountDialog: StockCountsUIEvents.openDeleteStockCountDialog,
    openDeleteStockCountsDialog: StockCountsUIEvents.openDeleteStockCountsDialog,
    openFetchStockCountsDialog: StockCountsUIEvents.openFetchStockCountsDialog,
    openUpdateStockCountsStatusDialog: StockCountsUIEvents.openUpdateStockCountsStatusDialog
  };

  return <StockCountsUIContext.Provider value={value}>{children}</StockCountsUIContext.Provider>;
}
