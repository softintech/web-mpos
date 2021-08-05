import {createSlice} from "@reduxjs/toolkit";

const initialStockMatsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  StockMatForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const StockMatsSlice = createSlice({
  name: "StockMats",
  initialState: initialStockMatsState,
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
    // getStockMatById
    StockMatFetched: (state, action) => {
      state.actionsLoading = false;
      state.StockMatForEdit = action.payload.StockMatForEdit;
      state.error = null;
    },
    // findStockMats
    StockMatsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createStockMat
    StockMatCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.StockMat);
    },
    // updateStockMat
    StockMatUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.StockMat.id) {
          return action.payload.StockMat;
        }
        return entity;
      });
    },
    // deleteStockMat
    StockMatDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteStockMats
    StockMatsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // StockMatsUpdateState
    StockMatsStatusUpdated: (state, action) => {
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
