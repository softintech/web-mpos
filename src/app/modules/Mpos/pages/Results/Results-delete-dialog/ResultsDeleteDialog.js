import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Results/ResultsActions";
import { useResultsUIContext } from "../ResultsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ResultsDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.Results.actionsLoading }),
    shallowEqual
  );

  // if Results weren't selected we should close modal
  useEffect(() => {
    if (!ResultsUIProps.ids || ResultsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ResultsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteResults = () => {
    // server request for deleting Result by selected ids
    dispatch(actions.deleteResults(ResultsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchResults(ResultsUIProps.queryParams)).then(
        () => {
          // clear selections list
          ResultsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Results Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected Results?</span>
        )}
        {isLoading && <span>Result are deleting...</span>}
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
            onClick={deleteResults}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
