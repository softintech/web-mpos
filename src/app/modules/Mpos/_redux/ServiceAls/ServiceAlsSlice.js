import {createSlice} from "@reduxjs/toolkit";

const initialServiceAlsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  ServiceAlForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const ServiceAlsSlice = createSlice({
  name: "ServiceAls",
  initialState: initialServiceAlsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getServiceAlById
    ServiceAlFetched: (state, action) => {
      state.actionsLoading = false;
      state.ServiceAlForEdit = action.payload.ServiceAlForEdit;
      state.error = null;
    },
    // findServiceAls
    ServiceAlsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createServiceAl
    ServiceAlCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.ServiceAl);
    },
    // updateServiceAl
    ServiceAlUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.ServiceAl.id) {
          return action.payload.ServiceAl;
        }
        return entity;
      });
    },
    // deleteServiceAl
    ServiceAlDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteServiceAls
    ServiceAlsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // ServiceAlsUpdateState
    ServiceAlsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
