import {createSlice} from "@reduxjs/toolkit";

const initialPuyPursState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  PuyPurForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const PuyPursSlice = createSlice({
  name: "PuyPurs",
  initialState: initialPuyPursState,
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
    // getPuyPurById
    PuyPurFetched: (state, action) => {
      state.actionsLoading = false;
      state.PuyPurForEdit = action.payload.PuyPurForEdit;
      state.error = null;
    },
    // findPuyPurs
    PuyPursFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPuyPur
    PuyPurCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.PuyPur);
    },
    // updatePuyPur
    PuyPurUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.PuyPur.id) {
          return action.payload.PuyPur;
        }
        return entity;
      });
    },
    // deletePuyPur
    PuyPurDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deletePuyPurs
    PuyPursDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // PuyPursUpdateState
    PuyPursStatusUpdated: (state, action) => {
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
