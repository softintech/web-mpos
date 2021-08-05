import * as requestFromServer from "./ShopsCreshopsCrud";
import {ShopsCreshopsSlice, callTypes} from "./ShopsCreshopsSlice";

const {actions} = ShopsCreshopsSlice;

export const fetchShopsCreshops = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findShopsCreshops(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.ShopsCreshopsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ShopsCreshops";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchShopsCreshop = id => dispatch => {
  if (!id) {
    return dispatch(actions.ShopsCreshopFetched({ ShopsCreshopForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getShopsCreshopById(id)
    .then(response => {
      const ShopsCreshop = response.data;
      dispatch(actions.ShopsCreshopFetched({ ShopsCreshopForEdit: ShopsCreshop }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ShopsCreshop";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteShopsCreshop = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteShopsCreshop(id)
    .then(response => {
      dispatch(actions.ShopsCreshopDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ShopsCreshop";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createShopsCreshop = ShopsCreshopForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createShopsCreshop(ShopsCreshopForCreation)
    .then(response => {
      const { ShopsCreshop } = response.data;
      dispatch(actions.ShopsCreshopCreated({ ShopsCreshop }));
    })
    .catch(error => {
      error.clientMessage = "Can't create ShopsCreshop";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateShopsCreshop = ShopsCreshop => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateShopsCreshop(ShopsCreshop)
    .then(() => {
      dispatch(actions.ShopsCreshopUpdated({ ShopsCreshop }));
    })
    .catch(error => {
      error.clientMessage = "Can't update ShopsCreshop";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateShopsCreshopsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForShopsCreshops(ids, status)
    .then(() => {
      dispatch(actions.ShopsCreshopsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update ShopsCreshops status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteShopsCreshops = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteShopsCreshops(ids)
    .then(() => {
      dispatch(actions.ShopsCreshopsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ShopsCreshops";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
