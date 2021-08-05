import {createSlice} from "@reduxjs/toolkit";

const initialPuySupsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  PuySupForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const PuySupsSlice = createSlice({
  name: "PuySups",
  initialState: initialPuySupsState,
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
    // getPuySupById
    PuySupFetched: (state, action) => {
      state.actionsLoading = false;
      state.PuySupForEdit = action.payload.PuySupForEdit;
      state.error = null;
    },
    // findPuySups
    PuySupsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPuySup
    PuySupCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.PuySup);
    },
    // updatePuySup
    PuySupUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.PuySup.id) {
          return action.payload.PuySup;
        }
        return entity;
      });
    },
    // deletePuySup
    PuySupDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deletePuySups
    PuySupsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // PuySupsUpdateState
    PuySupsStatusUpdated: (state, action) => {
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
