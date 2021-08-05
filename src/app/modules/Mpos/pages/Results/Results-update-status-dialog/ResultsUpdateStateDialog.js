import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  ResultStatusCssClasses,
  ResultStatusTitles,
} from "../ResultsUIHelpers";
import * as actions from "../../../_redux/Results/ResultsActions";
import { useResultsUIContext } from "../ResultsUIContext";

const selectedResults = (entities, ids) => {
  const _Results = [];
  ids.forEach((id) => {
    const Result = entities.find((el) => el.id === id);
    if (Result) {
      _Results.push(Result);
    }
  });
  return _Results;
};

export function ResultsUpdateStateDialog({ show, onHide }) {
  // Results UI Context
  const ResultsUIContext = useResultsUIContext();
  const ResultsUIProps = useMemo(() => {
    return {
      ids: ResultsUIContext.ids,
      setIds: ResultsUIContext.setIds,
      queryParams: ResultsUIContext.queryParams,
    };
  }, [ResultsUIContext]);

  // Results Redux state
  const { Results, isLoading } = useSelector(
    (state) => ({
      Results: selectedResults(
        state.Results.entities,
        ResultsUIProps.ids
      ),
      isLoading: state.Results.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!ResultsUIProps.ids || ResultsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ResultsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update Results status by selected ids
    dispatch(actions.updateResultsStatus(ResultsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchResults(ResultsUIProps.queryParams)).then(
          () => {
            // clear selections list
            ResultsUIProps.setIds([]);
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
          Status has been updated for selected Results
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
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {Results.map((Result) => (
              <tr key={`id${Result.id}`}>
                <td>{Result.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      ResultStatusCssClasses[Result.status]
                    } label-inline`}
                  >
                    {" "}
                    {ResultStatusTitles[Result.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {Result.lastName}, {Result.firstName}
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
