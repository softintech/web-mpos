import * as requestFromServer from "./ShopsCreEmpsCrud";
import {ShopsCreEmpsSlice, callTypes} from "./ShopsCreEmpsSlice";

const {actions} = ShopsCreEmpsSlice;

export const fetchShopsCreEmps = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findShopsCreEmps(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.ShopsCreEmpsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ShopsCreEmps";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchShopsCreEmp = id => dispatch => {
  if (!id) {
    return dispatch(actions.ShopsCreEmpFetched({ ShopsCreEmpForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getShopsCreEmpById(id)
    .then(response => {
      const ShopsCreEmp = response.data;
      dispatch(actions.ShopsCreEmpFetched({ ShopsCreEmpForEdit: ShopsCreEmp }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ShopsCreEmp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteShopsCreEmp = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteShopsCreEmp(id)
    .then(response => {
      dispatch(actions.ShopsCreEmpDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ShopsCreEmp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createShopsCreEmp = ShopsCreEmpForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createShopsCreEmp(ShopsCreEmpForCreation)
    .then(response => {
      const { ShopsCreEmp } = response.data;
      dispatch(actions.ShopsCreEmpCreated({ ShopsCreEmp }));
    })
    .catch(error => {
      error.clientMessage = "Can't create ShopsCreEmp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateShopsCreEmp = ShopsCreEmp => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateShopsCreEmp(ShopsCreEmp)
    .then(() => {
      dispatch(actions.ShopsCreEmpUpdated({ ShopsCreEmp }));
    })
    .catch(error => {
      error.clientMessage = "Can't update ShopsCreEmp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateShopsCreEmpsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForShopsCreEmps(ids, status)
    .then(() => {
      dispatch(actions.ShopsCreEmpsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update ShopsCreEmps status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteShopsCreEmps = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteShopsCreEmps(ids)
    .then(() => {
      dispatch(actions.ShopsCreEmpsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ShopsCreEmps";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
