import * as requestFromServer from "./ServiceAlsCrud";
import {ServiceAlsSlice, callTypes} from "./ServiceAlsSlice";

const {actions} = ServiceAlsSlice;

export const fetchServiceAls = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findServiceAls(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.ServiceAlsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ServiceAls";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchServiceAl = id => dispatch => {
  if (!id) {
    return dispatch(actions.ServiceAlFetched({ ServiceAlForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getServiceAlById(id)
    .then(response => {
      const ServiceAl = response.data;
      dispatch(actions.ServiceAlFetched({ ServiceAlForEdit: ServiceAl }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ServiceAl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteServiceAl = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteServiceAl(id)
    .then(response => {
      dispatch(actions.ServiceAlDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ServiceAl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createServiceAl = ServiceAlForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createServiceAl(ServiceAlForCreation)
    .then(response => {
      const { ServiceAl } = response.data;
      dispatch(actions.ServiceAlCreated({ ServiceAl }));
    })
    .catch(error => {
      error.clientMessage = "Can't create ServiceAl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateServiceAl = ServiceAl => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateServiceAl(ServiceAl)
    .then(() => {
      dispatch(actions.ServiceAlUpdated({ ServiceAl }));
    })
    .catch(error => {
      error.clientMessage = "Can't update ServiceAl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateServiceAlsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForServiceAls(ids, status)
    .then(() => {
      dispatch(actions.ServiceAlsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update ServiceAls status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteServiceAls = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteServiceAls(ids)
    .then(() => {
      dispatch(actions.ServiceAlsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ServiceAls";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
