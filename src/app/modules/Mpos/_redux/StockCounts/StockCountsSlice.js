import {createSlice} from "@reduxjs/toolkit";

const initialStockCountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  StockCountForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const StockCountsSlice = createSlice({
  name: "StockCounts",
  initialState: initialStockCountsState,
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
    // getStockCountById
    StockCountFetched: (state, action) => {
      state.actionsLoading = false;
      state.StockCountForEdit = action.payload.StockCountForEdit;
      state.error = null;
    },
    // findStockCounts
    StockCountsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createStockCount
    StockCountCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.StockCount);
    },
    // updateStockCount
    StockCountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.StockCount.id) {
          return action.payload.StockCount;
        }
        return entity;
      });
    },
    // deleteStockCount
    StockCountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteStockCounts
    StockCountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // StockCountsUpdateState
    StockCountsStatusUpdated: (state, action) => {
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
