import * as requestFromServer from "./PuyMatsCrud";
import {PuyMatsSlice, callTypes} from "./PuyMatsSlice";

const {actions} = PuyMatsSlice;

export const fetchPuyMats = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPuyMats(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.PuyMatsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find PuyMats";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPuyMat = id => dispatch => {
  if (!id) {
    return dispatch(actions.PuyMatFetched({ PuyMatForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPuyMatById(id)
    .then(response => {
      const PuyMat = response.data;
      dispatch(actions.PuyMatFetched({ PuyMatForEdit: PuyMat }));
    })
    .catch(error => {
      error.clientMessage = "Can't find PuyMat";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePuyMat = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePuyMat(id)
    .then(response => {
      dispatch(actions.PuyMatDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete PuyMat";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPuyMat = PuyMatForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPuyMat(PuyMatForCreation)
    .then(response => {
      const { PuyMat } = response.data;
      dispatch(actions.PuyMatCreated({ PuyMat }));
    })
    .catch(error => {
      error.clientMessage = "Can't create PuyMat";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePuyMat = PuyMat => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePuyMat(PuyMat)
    .then(() => {
      dispatch(actions.PuyMatUpdated({ PuyMat }));
    })
    .catch(error => {
      error.clientMessage = "Can't update PuyMat";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePuyMatsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPuyMats(ids, status)
    .then(() => {
      dispatch(actions.PuyMatsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update PuyMats status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePuyMats = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePuyMats(ids)
    .then(() => {
      dispatch(actions.PuyMatsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete PuyMats";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
