import React, { useMemo } from "react";
import { useShopsCreEmpsUIContext } from "../ShopsCreEmpsUIContext";

export function ShopsCreEmpsGrouping() {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      ids: ShopsCreEmpsUIContext.ids,
      setIds: ShopsCreEmpsUIContext.setIds,
      openDeleteShopsCreEmpsDialog: ShopsCreEmpsUIContext.openDeleteShopsCreEmpsDialog,
      openFetchShopsCreEmpsDialog: ShopsCreEmpsUIContext.openFetchShopsCreEmpsDialog,
      openUpdateShopsCreEmpsStatusDialog:
        ShopsCreEmpsUIContext.openUpdateShopsCreEmpsStatusDialog,
    };
  }, [ShopsCreEmpsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{ShopsCreEmpsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={ShopsCreEmpsUIProps.openDeleteShopsCreEmpsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={ShopsCreEmpsUIProps.openFetchShopsCreEmpsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={ShopsCreEmpsUIProps.openUpdateShopsCreEmpsStatusDialog}
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
