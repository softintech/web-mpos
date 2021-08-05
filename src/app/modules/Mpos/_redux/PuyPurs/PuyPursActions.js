import * as requestFromServer from "./PuyPursCrud";
import {PuyPursSlice, callTypes} from "./PuyPursSlice";

const {actions} = PuyPursSlice;

export const fetchPuyPurs = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPuyPurs(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.PuyPursFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find PuyPurs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPuyPur = id => dispatch => {
  if (!id) {
    return dispatch(actions.PuyPurFetched({ PuyPurForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPuyPurById(id)
    .then(response => {
      const PuyPur = response.data;
      dispatch(actions.PuyPurFetched({ PuyPurForEdit: PuyPur }));
    })
    .catch(error => {
      error.clientMessage = "Can't find PuyPur";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePuyPur = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePuyPur(id)
    .then(response => {
      dispatch(actions.PuyPurDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete PuyPur";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPuyPur = PuyPurForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPuyPur(PuyPurForCreation)
    .then(response => {
      const { PuyPur } = response.data;
      dispatch(actions.PuyPurCreated({ PuyPur }));
    })
    .catch(error => {
      error.clientMessage = "Can't create PuyPur";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePuyPur = PuyPur => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePuyPur(PuyPur)
    .then(() => {
      dispatch(actions.PuyPurUpdated({ PuyPur }));
    })
    .catch(error => {
      error.clientMessage = "Can't update PuyPur";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePuyPursStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPuyPurs(ids, status)
    .then(() => {
      dispatch(actions.PuyPursStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update PuyPurs status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePuyPurs = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePuyPurs(ids)
    .then(() => {
      dispatch(actions.PuyPursDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete PuyPurs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
