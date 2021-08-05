import * as requestFromServer from "./StockCountsCrud";
import {StockCountsSlice, callTypes} from "./StockCountsSlice";

const {actions} = StockCountsSlice;

export const fetchStockCounts = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findStockCounts(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.StockCountsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find StockCounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchStockCount = id => dispatch => {
  if (!id) {
    return dispatch(actions.StockCountFetched({ StockCountForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getStockCountById(id)
    .then(response => {
      const StockCount = response.data;
      dispatch(actions.StockCountFetched({ StockCountForEdit: StockCount }));
    })
    .catch(error => {
      error.clientMessage = "Can't find StockCount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStockCount = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStockCount(id)
    .then(response => {
      dispatch(actions.StockCountDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete StockCount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createStockCount = StockCountForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createStockCount(StockCountForCreation)
    .then(response => {
      const { StockCount } = response.data;
      dispatch(actions.StockCountCreated({ StockCount }));
    })
    .catch(error => {
      error.clientMessage = "Can't create StockCount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStockCount = StockCount => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStockCount(StockCount)
    .then(() => {
      dispatch(actions.StockCountUpdated({ StockCount }));
    })
    .catch(error => {
      error.clientMessage = "Can't update StockCount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateStockCountsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForStockCounts(ids, status)
    .then(() => {
      dispatch(actions.StockCountsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update StockCounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteStockCounts = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteStockCounts(ids)
    .then(() => {
      dispatch(actions.StockCountsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete StockCounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
