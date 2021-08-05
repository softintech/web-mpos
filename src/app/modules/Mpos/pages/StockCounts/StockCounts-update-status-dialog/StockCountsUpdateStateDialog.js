import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  StockCountStatusCssClasses,
  StockCountStatusTitles,
} from "../StockCountsUIHelpers";
import * as actions from "../../../_redux/StockCounts/StockCountsActions";
import { useStockCountsUIContext } from "../StockCountsUIContext";

const selectedStockCounts = (entities, ids) => {
  const _StockCounts = [];
  ids.forEach((id) => {
    const StockCount = entities.find((el) => el.id === id);
    if (StockCount) {
      _StockCounts.push(StockCount);
    }
  });
  return _StockCounts;
};

export function StockCountsUpdateStateDialog({ show, onHide }) {
  // StockCounts UI Context
  const StockCountsUIContext = useStockCountsUIContext();
  const StockCountsUIProps = useMemo(() => {
    return {
      ids: StockCountsUIContext.ids,
      setIds: StockCountsUIContext.setIds,
      queryParams: StockCountsUIContext.queryParams,
    };
  }, [StockCountsUIContext]);

  // StockCounts Redux state
  const { StockCounts, isLoading } = useSelector(
    (state) => ({
      StockCounts: selectedStockCounts(
        state.StockCounts.entities,
        StockCountsUIProps.ids
      ),
      isLoading: state.StockCounts.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!StockCountsUIProps.ids || StockCountsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StockCountsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update StockCounts status by selected ids
    dispatch(actions.updateStockCountsStatus(StockCountsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchStockCounts(StockCountsUIProps.queryParams)).then(
          () => {
            // clear selections list
            StockCountsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected StockCounts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>StockCount</th>
            </tr>
          </thead>
          <tbody>
            {StockCounts.map((StockCount) => (
              <tr key={`id${StockCount.id}`}>
                <td>{StockCount.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      StockCountStatusCssClasses[StockCount.status]
                    } label-inline`}
                  >
                    {" "}
                    {StockCountStatusTitles[StockCount.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {StockCount.lastName}, {StockCount.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
