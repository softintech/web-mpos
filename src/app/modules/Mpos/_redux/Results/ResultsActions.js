import * as requestFromServer from "./ResultsCrud";
import {ResultsSlice, callTypes} from "./ResultsSlice";

const {actions} = ResultsSlice;

export const fetchResults = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findResults(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.ResultsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find Results";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchResult = id => dispatch => {
  if (!id) {
    return dispatch(actions.ResultFetched({ ResultForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getResultById(id)
    .then(response => {
      const Result = response.data;
      dispatch(actions.ResultFetched({ ResultForEdit: Result }));
    })
    .catch(error => {
      error.clientMessage = "Can't find Result";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteResult = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteResult(id)
    .then(response => {
      dispatch(actions.ResultDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete Result";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createResult = ResultForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createResult(ResultForCreation)
    .then(response => {
      const { Result } = response.data;
      dispatch(actions.ResultCreated({ Result }));
    })
    .catch(error => {
      error.clientMessage = "Can't create Result";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateResult = Result => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateResult(Result)
    .then(() => {
      dispatch(actions.ResultUpdated({ Result }));
    })
    .catch(error => {
      error.clientMessage = "Can't update Result";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateResultsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForResults(ids, status)
    .then(() => {
      dispatch(actions.ResultsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update Results status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteResults = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteResults(ids)
    .then(() => {
      dispatch(actions.ResultsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete Results";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
