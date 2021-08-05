import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  PuySupStatusCssClasses,
  PuySupStatusTitles,
} from "../PuySupsUIHelpers";
import * as actions from "../../../_redux/PuySups/PuySupsActions";
import { usePuySupsUIContext } from "../PuySupsUIContext";

const selectedPuySups = (entities, ids) => {
  const _PuySups = [];
  ids.forEach((id) => {
    const PuySup = entities.find((el) => el.id === id);
    if (PuySup) {
      _PuySups.push(PuySup);
    }
  });
  return _PuySups;
};

export function PuySupsUpdateStateDialog({ show, onHide }) {
  // PuySups UI Context
  const PuySupsUIContext = usePuySupsUIContext();
  const PuySupsUIProps = useMemo(() => {
    return {
      ids: PuySupsUIContext.ids,
      setIds: PuySupsUIContext.setIds,
      queryParams: PuySupsUIContext.queryParams,
    };
  }, [PuySupsUIContext]);

  // PuySups Redux state
  const { PuySups, isLoading } = useSelector(
    (state) => ({
      PuySups: selectedPuySups(
        state.PuySups.entities,
        PuySupsUIProps.ids
      ),
      isLoading: state.PuySups.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!PuySupsUIProps.ids || PuySupsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PuySupsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update PuySups status by selected ids
    dispatch(actions.updatePuySupsStatus(PuySupsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchPuySups(PuySupsUIProps.queryParams)).then(
          () => {
            // clear selections list
            PuySupsUIProps.setIds([]);
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
          Status has been updated for selected PuySups
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
              <th>PuySup</th>
            </tr>
          </thead>
          <tbody>
            {PuySups.map((PuySup) => (
              <tr key={`id${PuySup.id}`}>
                <td>{PuySup.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      PuySupStatusCssClasses[PuySup.status]
                    } label-inline`}
                  >
                    {" "}
                    {PuySupStatusTitles[PuySup.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {PuySup.lastName}, {PuySup.firstName}
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
