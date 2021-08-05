import * as requestFromServer from "./ServiceContractsCrud";
import {ServiceContractsSlice, callTypes} from "./ServiceContractsSlice";

const {actions} = ServiceContractsSlice;

export const fetchServiceContracts = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findServiceContracts(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.ServiceContractsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ServiceContracts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchServiceContract = id => dispatch => {
  if (!id) {
    return dispatch(actions.ServiceContractFetched({ ServiceContractForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getServiceContractById(id)
    .then(response => {
      const ServiceContract = response.data;
      dispatch(actions.ServiceContractFetched({ ServiceContractForEdit: ServiceContract }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ServiceContract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteServiceContract = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteServiceContract(id)
    .then(response => {
      dispatch(actions.ServiceContractDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ServiceContract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createServiceContract = ServiceContractForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createServiceContract(ServiceContractForCreation)
    .then(response => {
      const { ServiceContract } = response.data;
      dispatch(actions.ServiceContractCreated({ ServiceContract }));
    })
    .catch(error => {
      error.clientMessage = "Can't create ServiceContract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateServiceContract = ServiceContract => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateServiceContract(ServiceContract)
    .then(() => {
      dispatch(actions.ServiceContractUpdated({ ServiceContract }));
    })
    .catch(error => {
      error.clientMessage = "Can't update ServiceContract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateServiceContractsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForServiceContracts(ids, status)
    .then(() => {
      dispatch(actions.ServiceContractsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update ServiceContracts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteServiceContracts = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteServiceContracts(ids)
    .then(() => {
      dispatch(actions.ServiceContractsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ServiceContracts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
