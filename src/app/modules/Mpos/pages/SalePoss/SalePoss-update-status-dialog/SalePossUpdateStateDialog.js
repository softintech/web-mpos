import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  SalePosStatusCssClasses,
  SalePosStatusTitles,
} from "../SalePossUIHelpers";
import * as actions from "../../../_redux/SalePoss/SalePossActions";
import { useSalePossUIContext } from "../SalePossUIContext";

const selectedSalePoss = (entities, ids) => {
  const _SalePoss = [];
  ids.forEach((id) => {
    const SalePos = entities.find((el) => el.id === id);
    if (SalePos) {
      _SalePoss.push(SalePos);
    }
  });
  return _SalePoss;
};

export function SalePossUpdateStateDialog({ show, onHide }) {
  // SalePoss UI Context
  const SalePossUIContext = useSalePossUIContext();
  const SalePossUIProps = useMemo(() => {
    return {
      ids: SalePossUIContext.ids,
      setIds: SalePossUIContext.setIds,
      queryParams: SalePossUIContext.queryParams,
    };
  }, [SalePossUIContext]);

  // SalePoss Redux state
  const { SalePoss, isLoading } = useSelector(
    (state) => ({
      SalePoss: selectedSalePoss(
        state.SalePoss.entities,
        SalePossUIProps.ids
      ),
      isLoading: state.SalePoss.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!SalePossUIProps.ids || SalePossUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SalePossUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update SalePoss status by selected ids
    dispatch(actions.updateSalePossStatus(SalePossUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchSalePoss(SalePossUIProps.queryParams)).then(
          () => {
            // clear selections list
            SalePossUIProps.setIds([]);
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
          Status has been updated for selected SalePoss
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
              <th>SalePos</th>
            </tr>
          </thead>
          <tbody>
            {SalePoss.map((SalePos) => (
              <tr key={`id${SalePos.id}`}>
                <td>{SalePos.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      SalePosStatusCssClasses[SalePos.status]
                    } label-inline`}
                  >
                    {" "}
                    {SalePosStatusTitles[SalePos.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {SalePos.lastName}, {SalePos.firstName}
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
