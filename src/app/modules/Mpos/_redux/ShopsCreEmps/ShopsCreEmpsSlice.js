import {createSlice} from "@reduxjs/toolkit";

const initialShopsCreEmpsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  ShopsCreEmpForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const ShopsCreEmpsSlice = createSlice({
  name: "ShopsCreEmps",
  initialState: initialShopsCreEmpsState,
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
    // getShopsCreEmpById
    ShopsCreEmpFetched: (state, action) => {
      state.actionsLoading = false;
      state.ShopsCreEmpForEdit = action.payload.ShopsCreEmpForEdit;
      state.error = null;
    },
    // findShopsCreEmps
    ShopsCreEmpsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createShopsCreEmp
    ShopsCreEmpCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.ShopsCreEmp);
    },
    // updateShopsCreEmp
    ShopsCreEmpUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.ShopsCreEmp.id) {
          return action.payload.ShopsCreEmp;
        }
        return entity;
      });
    },
    // deleteShopsCreEmp
    ShopsCreEmpDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteShopsCreEmps
    ShopsCreEmpsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // ShopsCreEmpsUpdateState
    ShopsCreEmpsStatusUpdated: (state, action) => {
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
