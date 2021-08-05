import {createSlice} from "@reduxjs/toolkit";

const initialSalePossState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  SalePosForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const SalePossSlice = createSlice({
  name: "SalePoss",
  initialState: initialSalePossState,
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
    // getSalePosById
    SalePosFetched: (state, action) => {
      state.actionsLoading = false;
      state.SalePosForEdit = action.payload.SalePosForEdit;
      state.error = null;
    },
    // findSalePoss
    SalePossFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSalePos
    SalePosCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.SalePos);
    },
    // updateSalePos
    SalePosUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.SalePos.id) {
          return action.payload.SalePos;
        }
        return entity;
      });
    },
    // deleteSalePos
    SalePosDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteSalePoss
    SalePossDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // SalePossUpdateState
    SalePossStatusUpdated: (state, action) => {
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
