import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  StockMatStatusCssClasses,
  StockMatStatusTitles,
} from "../StockMatsUIHelpers";
import * as actions from "../../../_redux/StockMats/StockMatsActions";
import { useStockMatsUIContext } from "../StockMatsUIContext";

const selectedStockMats = (entities, ids) => {
  const _StockMats = [];
  ids.forEach((id) => {
    const StockMat = entities.find((el) => el.id === id);
    if (StockMat) {
      _StockMats.push(StockMat);
    }
  });
  return _StockMats;
};

export function StockMatsUpdateStateDialog({ show, onHide }) {
  // StockMats UI Context
  const StockMatsUIContext = useStockMatsUIContext();
  const StockMatsUIProps = useMemo(() => {
    return {
      ids: StockMatsUIContext.ids,
      setIds: StockMatsUIContext.setIds,
      queryParams: StockMatsUIContext.queryParams,
    };
  }, [StockMatsUIContext]);

  // StockMats Redux state
  const { StockMats, isLoading } = useSelector(
    (state) => ({
      StockMats: selectedStockMats(
        state.StockMats.entities,
        StockMatsUIProps.ids
      ),
      isLoading: state.StockMats.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!StockMatsUIProps.ids || StockMatsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StockMatsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update StockMats status by selected ids
    dispatch(actions.updateStockMatsStatus(StockMatsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchStockMats(StockMatsUIProps.queryParams)).then(
          () => {
            // clear selections list
            StockMatsUIProps.setIds([]);
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
          Status has been updated for selected StockMats
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
              <th>StockMat</th>
            </tr>
          </thead>
          <tbody>
            {StockMats.map((StockMat) => (
              <tr key={`id${StockMat.id}`}>
                <td>{StockMat.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      StockMatStatusCssClasses[StockMat.status]
                    } label-inline`}
                  >
                    {" "}
                    {StockMatStatusTitles[StockMat.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {StockMat.lastName}, {StockMat.firstName}
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
