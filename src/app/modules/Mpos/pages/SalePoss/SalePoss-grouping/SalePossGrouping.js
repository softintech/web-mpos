import React, { useMemo } from "react";
import { useSalePossUIContext } from "../SalePossUIContext";

export function SalePossGrouping() {
  // SalePoss UI Context
  const SalePossUIContext = useSalePossUIContext();
  const SalePossUIProps = useMemo(() => {
    return {
      ids: SalePossUIContext.ids,
      setIds: SalePossUIContext.setIds,
      openDeleteSalePossDialog: SalePossUIContext.openDeleteSalePossDialog,
      openFetchSalePossDialog: SalePossUIContext.openFetchSalePossDialog,
      openUpdateSalePossStatusDialog:
        SalePossUIContext.openUpdateSalePossStatusDialog,
    };
  }, [SalePossUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{SalePossUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={SalePossUIProps.openDeleteSalePossDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={SalePossUIProps.openFetchSalePossDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={SalePossUIProps.openUpdateSalePossStatusDialog}
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
