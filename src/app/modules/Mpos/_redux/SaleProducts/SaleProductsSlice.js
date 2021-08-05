import {createSlice} from "@reduxjs/toolkit";

const initialSaleProductsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  SaleProductForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const SaleProductsSlice = createSlice({
  name: "SaleProducts",
  initialState: initialSaleProductsState,
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
    // getSaleProductById
    SaleProductFetched: (state, action) => {
      state.actionsLoading = false;
      state.SaleProductForEdit = action.payload.SaleProductForEdit;
      state.error = null;
    },
    // findSaleProducts
    SaleProductsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSaleProduct
    SaleProductCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.SaleProduct);
    },
    // updateSaleProduct
    SaleProductUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.SaleProduct.id) {
          return action.payload.SaleProduct;
        }
        return entity;
      });
    },
    // deleteSaleProduct
    SaleProductDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteSaleProducts
    SaleProductsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // SaleProductsUpdateState
    SaleProductsStatusUpdated: (state, action) => {
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
