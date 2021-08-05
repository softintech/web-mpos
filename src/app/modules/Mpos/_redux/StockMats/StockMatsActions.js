import * as requestFromServer from "./StockMatsCrud";
import {StockMatsSlice, callTypes} from "./StockMatsSlice";

const {actions} = StockMatsSlice;

export const fetchStockMats = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findStockMats(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.StockMatsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find StockMats";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchStockMat = id => dispatch => {
  if (!id) {
    return dispatch(actions.StockMatFetched({ StockMatForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getStockMatById(id)
    .then(response => {
      const StockMat = response.data;
      dispatch(actions.StockMatFetched({ StockMatForEdit: StockMat }));
    })
    .catch(error => {
      error.clientMessage = "Can't find StockMat";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStockMat = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStockMat(id)
    .then(response => {
      dispatch(actions.StockMatDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete StockMat";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createStockMat = StockMatForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStockMat(StockMatForCreation)
    .then(response => {
      const { StockMat } = response.data;
      dispatch(actions.StockMatCreated({ StockMat }));
    })
    .catch(error => {
      error.clientMessage = "Can't create StockMat";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStockMat = StockMat => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStockMat(StockMat)
    .then(() => {
      dispatch(actions.StockMatUpdated({ StockMat }));
    })
    .catch(error => {
      error.clientMessage = "Can't update StockMat";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStockMatsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForStockMats(ids, status)
    .then(() => {
      dispatch(actions.StockMatsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update StockMats status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStockMats = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStockMats(ids)
    .then(() => {
      dispatch(actions.StockMatsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete StockMats";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
