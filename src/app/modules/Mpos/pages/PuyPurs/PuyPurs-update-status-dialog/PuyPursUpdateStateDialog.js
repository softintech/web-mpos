import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  PuyPurStatusCssClasses,
  PuyPurStatusTitles,
} from "../PuyPursUIHelpers";
import * as actions from "../../../_redux/PuyPurs/PuyPursActions";
import { usePuyPursUIContext } from "../PuyPursUIContext";

const selectedPuyPurs = (entities, ids) => {
  const _PuyPurs = [];
  ids.forEach((id) => {
    const PuyPur = entities.find((el) => el.id === id);
    if (PuyPur) {
      _PuyPurs.push(PuyPur);
    }
  });
  return _PuyPurs;
};

export function PuyPursUpdateStateDialog({ show, onHide }) {
  // PuyPurs UI Context
  const PuyPursUIContext = usePuyPursUIContext();
  const PuyPursUIProps = useMemo(() => {
    return {
      ids: PuyPursUIContext.ids,
      setIds: PuyPursUIContext.setIds,
      queryParams: PuyPursUIContext.queryParams,
    };
  }, [PuyPursUIContext]);

  // PuyPurs Redux state
  const { PuyPurs, isLoading } = useSelector(
    (state) => ({
      PuyPurs: selectedPuyPurs(
        state.PuyPurs.entities,
        PuyPursUIProps.ids
      ),
      isLoading: state.PuyPurs.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!PuyPursUIProps.ids || PuyPursUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PuyPursUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update PuyPurs status by selected ids
    dispatch(actions.updatePuyPursStatus(PuyPursUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchPuyPurs(PuyPursUIProps.queryParams)).then(
          () => {
            // clear selections list
            PuyPursUIProps.setIds([]);
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
          Status has been updated for selected PuyPurs
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
              <th>PuyPur</th>
            </tr>
          </thead>
          <tbody>
            {PuyPurs.map((PuyPur) => (
              <tr key={`id${PuyPur.id}`}>
                <td>{PuyPur.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      PuyPurStatusCssClasses[PuyPur.status]
                    } label-inline`}
                  >
                    {" "}
                    {PuyPurStatusTitles[PuyPur.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {PuyPur.lastName}, {PuyPur.firstName}
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
