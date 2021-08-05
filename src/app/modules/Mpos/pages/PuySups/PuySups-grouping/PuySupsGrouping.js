import React, { useMemo } from "react";
import { usePuySupsUIContext } from "../PuySupsUIContext";

export function PuySupsGrouping() {
  // PuySups UI Context
  const PuySupsUIContext = usePuySupsUIContext();
  const PuySupsUIProps = useMemo(() => {
    return {
      ids: PuySupsUIContext.ids,
      setIds: PuySupsUIContext.setIds,
      openDeletePuySupsDialog: PuySupsUIContext.openDeletePuySupsDialog,
      openFetchPuySupsDialog: PuySupsUIContext.openFetchPuySupsDialog,
      openUpdatePuySupsStatusDialog:
        PuySupsUIContext.openUpdatePuySupsStatusDialog,
    };
  }, [PuySupsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{PuySupsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={PuySupsUIProps.openDeletePuySupsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={PuySupsUIProps.openFetchPuySupsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={PuySupsUIProps.openUpdatePuySupsStatusDialog}
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
