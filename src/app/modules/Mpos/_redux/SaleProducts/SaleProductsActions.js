import * as requestFromServer from "./SaleProductsCrud";
import {SaleProductsSlice, callTypes} from "./SaleProductsSlice";

const {actions} = SaleProductsSlice;

export const fetchSaleProducts = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSaleProducts(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.SaleProductsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find SaleProducts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSaleProduct = id => dispatch => {
  if (!id) {
    return dispatch(actions.SaleProductFetched({ SaleProductForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSaleProductById(id)
    .then(response => {
      const SaleProduct = response.data;
      dispatch(actions.SaleProductFetched({ SaleProductForEdit: SaleProduct }));
    })
    .catch(error => {
      error.clientMessage = "Can't find SaleProduct";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSaleProduct = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSaleProduct(id)
    .then(response => {
      dispatch(actions.SaleProductDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete SaleProduct";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createSaleProduct = SaleProductForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSaleProduct(SaleProductForCreation)
    .then(response => {
      const { SaleProduct } = response.data;
      dispatch(actions.SaleProductCreated({ SaleProduct }));
    })
    .catch(error => {
      error.clientMessage = "Can't create SaleProduct";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSaleProduct = SaleProduct => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateSaleProduct(SaleProduct)
    .then(() => {
      dispatch(actions.SaleProductUpdated({ SaleProduct }));
    })
    .catch(error => {
      error.clientMessage = "Can't update SaleProduct";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSaleProductsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForSaleProducts(ids, status)
    .then(() => {
      dispatch(actions.SaleProductsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update SaleProducts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSaleProducts = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSaleProducts(ids)
    .then(() => {
      dispatch(actions.SaleProductsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete SaleProducts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
