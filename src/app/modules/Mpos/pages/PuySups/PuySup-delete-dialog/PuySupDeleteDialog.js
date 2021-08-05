import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/PuySups/PuySupsActions";
import {usePuySupsUIContext} from "../PuySupsUIContext";

export function PuySupDeleteDialog({ id, show, onHide }) {
  // PuySups UI Context
  const PuySupsUIContext = usePuySupsUIContext();
  const PuySupsUIProps = useMemo(() => {
    return {
      setIds: PuySupsUIContext.setIds,
      queryParams: PuySupsUIContext.queryParams
    };
  }, [PuySupsUIContext]);

  // PuySups Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.PuySups.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePuySup = () => {
    // server request for deleting PuySup by id
    dispatch(actions.deletePuySup(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPuySups(PuySupsUIProps.queryParams));
      // clear selections list
      PuySupsUIProps.setIds([]);
      // closing delete modal
      onHide();
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
          PuySup Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this PuySup?</span>
        )}
        {isLoading && <span>PuySup is deleting...</span>}
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
            onClick={deletePuySup}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
