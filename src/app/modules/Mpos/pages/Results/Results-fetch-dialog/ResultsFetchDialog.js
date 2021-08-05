import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  ResultStatusCssClasses,
  ResultStatusTitles,
} from "../ResultsUIHelpers";
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

export function ResultsFetchDialog({ show, onHide }) {
  // Results UI Context
  const ResultsUIContext = useResultsUIContext();
  const ResultsUIProps = useMemo(() => {
    return {
      ids: ResultsUIContext.ids,
    };
  }, [ResultsUIContext]);

  // Results Redux state
  const { Results } = useSelector(
    (state) => ({
      Results: selectedResults(
        state.Results.entities,
        ResultsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if Results weren't selected we should close modal
  useEffect(() => {
    if (!ResultsUIProps.ids || ResultsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ResultsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
