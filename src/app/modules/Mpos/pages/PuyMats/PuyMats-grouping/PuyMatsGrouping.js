import React, { useMemo } from "react";
import { usePuyMatsUIContext } from "../PuyMatsUIContext";

export function PuyMatsGrouping() {
  // PuyMats UI Context
  const PuyMatsUIContext = usePuyMatsUIContext();
  const PuyMatsUIProps = useMemo(() => {
    return {
      ids: PuyMatsUIContext.ids,
      setIds: PuyMatsUIContext.setIds,
      openDeletePuyMatsDialog: PuyMatsUIContext.openDeletePuyMatsDialog,
      openFetchPuyMatsDialog: PuyMatsUIContext.openFetchPuyMatsDialog,
      openUpdatePuyMatsStatusDialog:
        PuyMatsUIContext.openUpdatePuyMatsStatusDialog,
    };
  }, [PuyMatsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{PuyMatsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={PuyMatsUIProps.openDeletePuyMatsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={PuyMatsUIProps.openFetchPuyMatsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={PuyMatsUIProps.openUpdatePuyMatsStatusDialog}
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
