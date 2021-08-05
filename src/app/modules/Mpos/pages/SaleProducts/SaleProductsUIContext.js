import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./SaleProductsUIHelpers";

const SaleProductsUIContext = createContext();

export function useSaleProductsUIContext() {
  return useContext(SaleProductsUIContext);
}

export const SaleProductsUIConsumer = SaleProductsUIContext.Consumer;

export function SaleProductsUIProvider({SaleProductsUIEvents, children}) {
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

  const initSaleProduct = {
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
    initSaleProduct,
    newShopsPageCreshopButtonClick: SaleProductsUIEvents.newShopsPageCreshopButtonClick,
    newSaleProductButtonClick: SaleProductsUIEvents.newSaleProductButtonClick,
    openEditSaleProductDialog: SaleProductsUIEvents.openEditSaleProductDialog,
    openDeleteSaleProductDialog: SaleProductsUIEvents.openDeleteSaleProductDialog,
    openDeleteSaleProductsDialog: SaleProductsUIEvents.openDeleteSaleProductsDialog,
    openFetchSaleProductsDialog: SaleProductsUIEvents.openFetchSaleProductsDialog,
    openUpdateSaleProductsStatusDialog: SaleProductsUIEvents.openUpdateSaleProductsStatusDialog
  };

  return <SaleProductsUIContext.Provider value={value}>{children}</SaleProductsUIContext.Provider>;
}
