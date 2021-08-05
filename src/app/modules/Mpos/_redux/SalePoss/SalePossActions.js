import * as requestFromServer from "./SalePossCrud";
import {SalePossSlice, callTypes} from "./SalePossSlice";

const {actions} = SalePossSlice;

export const fetchSalePoss = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSalePoss(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.SalePossFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find SalePoss";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSalePos = id => dispatch => {
  if (!id) {
    return dispatch(actions.SalePosFetched({ SalePosForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSalePosById(id)
    .then(response => {
      const SalePos = response.data;
      dispatch(actions.SalePosFetched({ SalePosForEdit: SalePos }));
    })
    .catch(error => {
      error.clientMessage = "Can't find SalePos";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSalePos = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSalePos(id)
    .then(response => {
      dispatch(actions.SalePosDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete SalePos";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createSalePos = SalePosForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSalePos(SalePosForCreation)
    .then(response => {
      const { SalePos } = response.data;
      dispatch(actions.SalePosCreated({ SalePos }));
    })
    .catch(error => {
      error.clientMessage = "Can't create SalePos";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSalePos = SalePos => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateSalePos(SalePos)
    .then(() => {
      dispatch(actions.SalePosUpdated({ SalePos }));
    })
    .catch(error => {
      error.clientMessage = "Can't update SalePos";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSalePossStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForSalePoss(ids, status)
    .then(() => {
      dispatch(actions.SalePossStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update SalePoss status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSalePoss = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSalePoss(ids)
    .then(() => {
      dispatch(actions.SalePossDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete SalePoss";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
