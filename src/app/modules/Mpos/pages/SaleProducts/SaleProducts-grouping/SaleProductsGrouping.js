import React, { useMemo } from "react";
import { useSaleProductsUIContext } from "../SaleProductsUIContext";

export function SaleProductsGrouping() {
  // SaleProducts UI Context
  const SaleProductsUIContext = useSaleProductsUIContext();
  const SaleProductsUIProps = useMemo(() => {
    return {
      ids: SaleProductsUIContext.ids,
      setIds: SaleProductsUIContext.setIds,
      openDeleteSaleProductsDialog: SaleProductsUIContext.openDeleteSaleProductsDialog,
      openFetchSaleProductsDialog: SaleProductsUIContext.openFetchSaleProductsDialog,
      openUpdateSaleProductsStatusDialog:
        SaleProductsUIContext.openUpdateSaleProductsStatusDialog,
    };
  }, [SaleProductsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{SaleProductsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={SaleProductsUIProps.openDeleteSaleProductsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={SaleProductsUIProps.openFetchSaleProductsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={SaleProductsUIProps.openUpdateSaleProductsStatusDialog}
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
