import * as requestFromServer from "./PuySupsCrud";
import {PuySupsSlice, callTypes} from "./PuySupsSlice";

const {actions} = PuySupsSlice;

export const fetchPuySups = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPuySups(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.PuySupsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find PuySups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchPuySup = id => dispatch => {
  if (!id) {
    return dispatch(actions.PuySupFetched({ PuySupForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPuySupById(id)
    .then(response => {
      const PuySup = response.data;
      dispatch(actions.PuySupFetched({ PuySupForEdit: PuySup }));
    })
    .catch(error => {
      error.clientMessage = "Can't find PuySup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePuySup = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePuySup(id)
    .then(response => {
      dispatch(actions.PuySupDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete PuySup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createPuySup = PuySupForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPuySup(PuySupForCreation)
    .then(response => {
      const { PuySup } = response.data;
      dispatch(actions.PuySupCreated({ PuySup }));
    })
    .catch(error => {
      error.clientMessage = "Can't create PuySup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePuySup = PuySup => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePuySup(PuySup)
    .then(() => {
      dispatch(actions.PuySupUpdated({ PuySup }));
    })
    .catch(error => {
      error.clientMessage = "Can't update PuySup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updatePuySupsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPuySups(ids, status)
    .then(() => {
      dispatch(actions.PuySupsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update PuySups status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deletePuySups = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePuySups(ids)
    .then(() => {
      dispatch(actions.PuySupsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete PuySups";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
