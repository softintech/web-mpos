import React, { useMemo } from "react";
import { usePuyPursUIContext } from "../PuyPursUIContext";

export function PuyPursGrouping() {
  // PuyPurs UI Context
  const PuyPursUIContext = usePuyPursUIContext();
  const PuyPursUIProps = useMemo(() => {
    return {
      ids: PuyPursUIContext.ids,
      setIds: PuyPursUIContext.setIds,
      openDeletePuyPursDialog: PuyPursUIContext.openDeletePuyPursDialog,
      openFetchPuyPursDialog: PuyPursUIContext.openFetchPuyPursDialog,
      openUpdatePuyPursStatusDialog:
        PuyPursUIContext.openUpdatePuyPursStatusDialog,
    };
  }, [PuyPursUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{PuyPursUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={PuyPursUIProps.openDeletePuyPursDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={PuyPursUIProps.openFetchPuyPursDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={PuyPursUIProps.openUpdatePuyPursStatusDialog}
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
