import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  PuyMatStatusCssClasses,
  PuyMatStatusTitles,
} from "../PuyMatsUIHelpers";
import * as actions from "../../../_redux/PuyMats/PuyMatsActions";
import { usePuyMatsUIContext } from "../PuyMatsUIContext";

const selectedPuyMats = (entities, ids) => {
  const _PuyMats = [];
  ids.forEach((id) => {
    const PuyMat = entities.find((el) => el.id === id);
    if (PuyMat) {
      _PuyMats.push(PuyMat);
    }
  });
  return _PuyMats;
};

export function PuyMatsUpdateStateDialog({ show, onHide }) {
  // PuyMats UI Context
  const PuyMatsUIContext = usePuyMatsUIContext();
  const PuyMatsUIProps = useMemo(() => {
    return {
      ids: PuyMatsUIContext.ids,
      setIds: PuyMatsUIContext.setIds,
      queryParams: PuyMatsUIContext.queryParams,
    };
  }, [PuyMatsUIContext]);

  // PuyMats Redux state
  const { PuyMats, isLoading } = useSelector(
    (state) => ({
      PuyMats: selectedPuyMats(
        state.PuyMats.entities,
        PuyMatsUIProps.ids
      ),
      isLoading: state.PuyMats.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!PuyMatsUIProps.ids || PuyMatsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PuyMatsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update PuyMats status by selected ids
    dispatch(actions.updatePuyMatsStatus(PuyMatsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchPuyMats(PuyMatsUIProps.queryParams)).then(
          () => {
            // clear selections list
            PuyMatsUIProps.setIds([]);
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
          Status has been updated for selected PuyMats
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
              <th>PuyMat</th>
            </tr>
          </thead>
          <tbody>
            {PuyMats.map((PuyMat) => (
              <tr key={`id${PuyMat.id}`}>
                <td>{PuyMat.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      PuyMatStatusCssClasses[PuyMat.status]
                    } label-inline`}
                  >
                    {" "}
                    {PuyMatStatusTitles[PuyMat.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {PuyMat.lastName}, {PuyMat.firstName}
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
