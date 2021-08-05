import React, { useMemo } from "react";
import { useStockMatsUIContext } from "../StockMatsUIContext";

export function StockMatsGrouping() {
  // StockMats UI Context
  const StockMatsUIContext = useStockMatsUIContext();
  const StockMatsUIProps = useMemo(() => {
    return {
      ids: StockMatsUIContext.ids,
      setIds: StockMatsUIContext.setIds,
      openDeleteStockMatsDialog: StockMatsUIContext.openDeleteStockMatsDialog,
      openFetchStockMatsDialog: StockMatsUIContext.openFetchStockMatsDialog,
      openUpdateStockMatsStatusDialog:
        StockMatsUIContext.openUpdateStockMatsStatusDialog,
    };
  }, [StockMatsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{StockMatsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={StockMatsUIProps.openDeleteStockMatsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={StockMatsUIProps.openFetchStockMatsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={StockMatsUIProps.openUpdateStockMatsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
