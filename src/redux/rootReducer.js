import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {ShopsCreshopsSlice} from "../app/modules/Mpos/_redux/ShopsCreshops/ShopsCreshopsSlice";
import {StockCountsSlice} from "../app/modules/Mpos/_redux/StockCounts/StockCountsSlice";
import {PuyPursSlice} from "../app/modules/Mpos/_redux/PuyPurs/PuyPursSlice";
import {PuySupsSlice} from "../app/modules/Mpos/_redux/PuySups/PuySupsSlice";
import {PuyMatsSlice} from "../app/modules/Mpos/_redux/PuyMats/PuyMatsSlice";
import {ResultsSlice} from "../app/modules/Mpos/_redux/Results/ResultsSlice";
import {SalePossSlice} from "../app/modules/Mpos/_redux/SalePoss/SalePossSlice";
import {SaleProductsSlice} from "../app/modules/Mpos/_redux/SaleProducts/SaleProductsSlice";
import {ServiceAlsSlice} from "../app/modules/Mpos/_redux/ServiceAls/ServiceAlsSlice";
import {ServiceContractsSlice} from "../app/modules/Mpos/_redux/ServiceContracts/ServiceContractsSlice";
import {ShopsCreEmpsSlice} from "../app/modules/Mpos/_redux/ShopsCreEmps/ShopsCreEmpsSlice";
import {StockMatsSlice} from "../app/modules/Mpos/_redux/StockMats/StockMatsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  ShopsCreshops: ShopsCreshopsSlice.reducer,
  StockCounts: StockCountsSlice.reducer,
  PuyPurs: PuyPursSlice.reducer,
  PuySups: PuySupsSlice.reducer,
  PuyMats: PuyMatsSlice.reducer,
  Results: ResultsSlice.reducer,
  SalePoss: SalePossSlice.reducer,
  ServiceAls: ServiceAlsSlice.reducer,
  SaleProducts: SaleProductsSlice.reducer,
  ServiceContracts: ServiceContractsSlice.reducer,
  ShopsCreEmps: ShopsCreEmpsSlice.reducer,
  StockMats: StockMatsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
